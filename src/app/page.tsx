import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CardWrapper from "./component/card/cardWrapper";
import NavBar from "./component/navbar/navbar";
import { authOptions } from "./api/auth/[...nextauth]/route";
import styles from "./page.module.css";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: "old" | "new" };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const { message, data } = await getCardData();
  // if(searchParams?.sort === "old"){
  //   data.sort((a, b) => {
  //           let date1 = new Date(a.createdAt);
  //           let date2 = new Date(b.createdAt);
  //           return date1.getTime() - date2.getTime();
  //         }),
  // }
  console.log(searchParams);

  return (
    <>
      <main className={styles.main}>
        {/* {JSON.stringify(session)} */}
        <CardWrapper sort={searchParams?.sort ?? "new"} cardData={data ?? []} />
      </main>
    </>
  );
}

export const getCardData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/add/", {
      headers: headers(),
      cache: "no-cache",
      next: { revalidate: 10 },
    });
    revalidatePath("/");
    return res.json();
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
};
