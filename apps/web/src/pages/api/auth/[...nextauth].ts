import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { client as mongoClient } from "lib/mongodb";
import { verifyPassword } from "utils/auth";
import axios from "axios";

export default NextAuth({
  adapter: MongoDBAdapter(mongoClient),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "cred",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@doe.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "johndoe.com",
        },
      },
      async authorize(credentials) {
        const client = await mongoClient; 
        const usersCollection = await client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials?.email ?? "limey@io.com",
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials?.password || "",
          user?.password || ""
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signup",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  session: { jwt: true }
});
