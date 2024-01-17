import type { Metadata } from "next";
import { Roboto, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "./component/navbar/navbar";
import AuthProvider from "./AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clipper",
  description: "Save articles & links and access them from anywhere!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <AuthProvider session={session}>
      <html lang="en">
        <body className={roboto.className}>
          <NavBar />
          <div style={{ height: "70px" }}></div>
          <Toaster position="bottom-center" />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
