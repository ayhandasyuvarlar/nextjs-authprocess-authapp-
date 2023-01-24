import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
const GOOGLE_CLIENT_ID =
  "267409462275-tn7f85pnoslo3js9kr2qctpj22jsi0ru.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GITHUB_ID = "58784e8a3af070db055f";
const GITHUB_SECRET = "b03c23d7cba9e3056b055e763db05854256e82b2";
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
  ],
});
