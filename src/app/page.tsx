import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CardWrapper from "./component/card/cardWrapper";
import NavBar from "./component/navbar/navbar";
import styles from "./page.module.css";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/AuthOptions";
import { prisma } from "@/app/lib/prisma";
import { ArticleCard } from "./component/card/card";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: "old" | "new" };
}) {
  const session = await getServerSession(authOptions);
  let data: ArticleCard[] = [];
  if (!session) {
    redirect("/api/auth/signin");
  } else {
    data = (await prisma.article.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      where: {
        userId: session?.user?.id,
      },
    })) as ArticleCard[];
  }
  // const { message, data } = await getCardData();

  return (
    <>
      <main className={styles.main}>
        {/* {JSON.stringify(session)} */}
        <CardWrapper sort={searchParams?.sort ?? "new"} cardData={data ?? []} />
      </main>
    </>
  );
}
