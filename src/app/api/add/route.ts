import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import axios from "axios";
import * as cheerio from "cheerio";
import { authOptions } from "@/AuthOptions";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const data = await prisma.article.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      where: {
        userId: session?.user?.id,
      },
    });

    return NextResponse.json(
      {
        message: "OK",
        data,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error",
        err,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        //  id: session?.user?.id,
        id: session?.user?.id,
      },
    });
    if (user) {
      // console.log(user);
      const { url } = await req.json();

      const existingArticle = await prisma.article.findFirst({
        where: {
          url: url,
          userId: session?.user?.id,
        },
      });

      if (existingArticle) {
        return NextResponse.json(
          {
            message: "URL already exists in the database",
          },
          {
            status: 400,
          }
        );
      }

      const htmlContent = await fetchWebContent(url);

      if (!htmlContent) {
        return NextResponse.json(
          {
            message: "Error fetching web content",
          },
          {
            status: 502,
          }
        );
      }
      let responseObj = extractArticleInfo(htmlContent, url);

      if (!responseObj) {
        return NextResponse.json(
          {
            message: "Invalid URL or error processing content",
          },
          {
            status: 400,
          }
        );
      }

      try {
        let create = await prisma.article.create({
          data: { ...responseObj, userId: user?.id },
        });

        return NextResponse.json(
          { message: "OK", data: responseObj },
          { status: 200 }
        );
      } catch (createErr) {
        console.log(createErr);
        return NextResponse.json(
          { message: "Error creating article" },
          { status: 500 }
        );
      }
    }
  } catch (err) {
    console.error("Unhandled error:", err);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        data: JSON.stringify(err),
      },
      {
        status: 500,
      }
    );
  }

  // const { id } = await req.json();

  return NextResponse.json({ message: "Error" }, { status: 500 });
}

const extractArticleInfo = (htmlContent: string, url: string) => {
  const $ = cheerio.load(htmlContent);
  const urlObject = new URL(url);

  let articleInfo: ArticleInfo = {
    isArticle: false,
    url: url,
    domain: urlObject.hostname,
  };

  for (const tag of metaTags) {
    const meta = $(
      `meta[property='${tag.property}'], meta[name='${tag.name}']`
    );
    if (meta.length > 0) {
      articleInfo[tag?.field] = meta.attr("content") || undefined;
    }
  }

  const articleTags = ["article", "og:type"];
  for (const tag of articleTags) {
    if ($(`meta[property='${tag}'], meta[name='${tag}']`).length > 0) {
      articleInfo.isArticle = true;
      break;
    }
  }

  // if (!articleInfo.isArticle) {
  const favicon =
    $('link[rel="icon"]').attr("href") ||
    $('link[rel="shortcut icon"]').attr("href");
  if (favicon) {
    articleInfo.logo = favicon.startsWith("http")
      ? favicon
      : `${urlObject.origin}/${favicon}`;
  }
  // }

  const title = $("title").text().trim();
  articleInfo.title = articleInfo?.title || title;

  return articleInfo;
};

const fetchWebContent = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (err) {
    console.error("Error fetching web content:", err);
    return null;
  }
};

const metaTags: metaProtocol[] = [
  { name: "og:title", property: "og:title", field: "title" },
  { name: "article:author", property: "article:author", field: "author" },
  {
    name: "og:description",
    property: "og:description",
    field: "description",
  },
  { name: "og:image", property: "og:image", field: "image" },
];

interface metaProtocol {
  name: string;
  property: string;
  field: "title" | "author" | "description" | "image";
}

interface ArticleInfo {
  isArticle: boolean;
  domain?: string;
  title?: string;
  author?: string;
  description?: string;
  image?: string;
  logo?: string;
  url: string;
}
