import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const GOOGLE_CLIENT_ID =
  "267409462275-tn7f85pnoslo3js9kr2qctpj22jsi0ru.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
export default NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
});
