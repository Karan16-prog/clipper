import { cardData } from "@/app/mock/mockCard";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
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
    return NextResponse.json(
      {
        message: "OK",
        cardData,
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
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  // const { id } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });
  if (user) {
    const dataA = {
      isValidLink: true,
      isArticle: true,
      img: "",
      title: "Test 6969",
      link: "https://youtube.com",
      domain: "youtube",
      //   user: user,
      userId: user?.id,
    };
    const articleData = await prisma.article.create({
      data: dataA,
    });
    return NextResponse.json(
      { message: "OK", data: articleData },
      { status: 200 }
    );
  }
  return NextResponse.json({ message: "Error", user }, { status: 500 });
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
