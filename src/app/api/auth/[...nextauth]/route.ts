import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "@/app/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Guest Credentials instead!",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "GuestUser123@gmail.com",
          // disabled: true,
          defaultValue: "guest@example.com",
          // value: "",
        },
        username: {
          label: "Username",
          type: "text",
          placeholder: "johndoe",
          defaultValue: "Guest User",
          // disabled: true,
        },
        password: {
          label: "Password",
          type: "password",
          defaultValue: "dummy_id",
          // disabled: true,
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = {
        //   id: "guestuser69",
        //   name: "J Smith",
        //   email: "jsmith@example.com",
        // };

        console.log("THIS WAS CALLED");
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken;
      // session.user.id = token.id;
      // console.log("User", user);
      // console.log("Session", session);
      // console.log("token", token);
      session.user.id = token?.sub ?? user?.id;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// 1. JWT ?
// 2. session.user.id ??
