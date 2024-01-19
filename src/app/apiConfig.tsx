const dev = process.env.NODE_ENV !== "production";
const baseURL = dev
  ? "http://localhost:3000/api/"
  : "https://clipper-nine.vercel.app/api/";

export const ADD_ARTICLE_ENDPOINT = baseURL + "add";
export const GET_ARTICLE_ENDPOINT = baseURL + "add";
