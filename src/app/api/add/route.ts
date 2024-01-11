import { cardData } from "@/app/mock/mockCard";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import axios from "axios";
import * as cheerio from "cheerio";

// const cheerio = require("cheerio");

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  // console.log("Karan1605", session);
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
    // console.log("KARAN16", session?.user?.id);
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

interface ArticleInfo {
  isArticle: boolean;
  domain?: string;
  title?: string;
  author?: string;
  description?: string;
  image?: string;
  logo?: string;
  url: string;

  // [key: string]: string | boolean | undefined;
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

// 1. Prisma client - done
// 2. null data in db - tbd
// 3. check if it is a link or not - pending
// 4. what is updatedAt - done
// 5. is it article? -
// 6. Fetch any image or display random
// 7.

// 1. How to run the API in postman - Server c anookies - This is for future Karan
// 2. How to make a web crawler that crawls the given url
// 3. When fetching articles :-

// 4 .Use Cheerio?

// What to need after scraping?
// 1. isArticle
// 2. If NOt article, just get domain name + link + image (logo)
// 3. Determine if it is an aritcle :-
// 4. if article
// 1. get title
// 2. get image in article
// 3. Phase 2 :- Open article within domain
//               Highlight feature
// 4. Phase 3 :- Recommend articles (algorithm)
// 5. Phase 4 :-

// clqkzvh7j0000xwwxtlgm6cn4

// meta content article => isArticle
// need to learn semantic html
//

// IF Article
// 1. Article title
// 2. Article Image
// 3. Article URL - already have it
// 4. Article Author
// 5.

// IF NOT Article
// 1. Website logo if possible
// 2. Website domain - already have it
