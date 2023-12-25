import { cardData } from "@/app/mock/mockCard";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: Request, res: Response) {
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
  // const body = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      id: "clqkzvh7j0000xwwxtlgm6cn4",
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

// 1. Prisma client
// 2. null data in db
// 3. check if it is a link or not
// 4. what is updatedAt
// 5. is it article?
// 6. Fetch any image or display random
// 7.
