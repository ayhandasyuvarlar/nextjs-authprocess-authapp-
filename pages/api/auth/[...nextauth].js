import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import connectMongo from "@/database/connetMongo";
import Users from "@/model/Schema";

export default NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "Connection Failed ...";
        });
        // check user existance
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("No user Found with Email Please Sign Up...!");
        }
        //compore
        const checkPassword = await compare(
          credentials.password,
          result.password
        );
        // incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or Password doesn't match");
        }
        return result;
      },
    }),
  ],
  secret: "XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=",
  session: {
    strategy: "jwt",
  },
});
