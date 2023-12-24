import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CardWrapper from "./component/card/cardWrapper";
import NavBar from "./component/navbar/navbar";
import { cardData } from "./mock/mockCard";
export default async function Home() {
  const session = await getServerSession();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <>
      <NavBar />

      <main>
        <CardWrapper cardData={cardData} />
      </main>
    </>
  );
}
