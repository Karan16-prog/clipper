export async function addArticle(url: string) {
  "use server";

  const body = {
    url: url,
  };

  try {
    const data = await fetch("http://localhost:3000/api/add", {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.log("error");
  }
}
