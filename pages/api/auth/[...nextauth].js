import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
const GOOGLE_CLIENT_ID =
  "267409462275-tn7f85pnoslo3js9kr2qctpj22jsi0ru.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GITHUB_ID = "58784e8a3af070db055f";
const GITHUB_SECRET = "b03c23d7cba9e3056b055e763db05854256e82b2";
import connectMongo from "@/database/connetMongo";
import Users from "@/model/Schema";
export default NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
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
});
