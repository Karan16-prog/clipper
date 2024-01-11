import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CardWrapper from "./component/card/cardWrapper";
import NavBar from "./component/navbar/navbar";
import { authOptions } from "./api/auth/[...nextauth]/route";
import styles from "./page.module.css";
import { headers } from "next/headers";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const { message, data } = await getCardData();

  return (
    <>
      <main className={styles.main}>
        {/* {JSON.stringify(session)} */}
        <CardWrapper cardData={data ?? []} />
      </main>
    </>
  );
}

export const getCardData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/add/", {
      headers: headers(),
      cache: "no-cache",
    });

    return res.json();
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
};
