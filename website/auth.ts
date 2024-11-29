import NextAuth, { type DefaultSession } from "next-auth";
//import authConfig from "./auth.config"

import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import Apple from "next-auth/providers/apple";
import Passkey from "next-auth/providers/passkey";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session {
    user: {
      suspended: boolean
    } & DefaultSession["user"]
  }

  interface User {
    suspended: boolean
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin"
  },
  providers: [
    GitHub,
    Resend({
      from: "Fuck Python <auth@noreply.lcholdings.net>",
    }),
    Apple,
    Passkey,
  ],
  experimental: { enableWebAuthn: true },
  callbacks: {
    signIn({ profile, user }) {
      if (profile) {
        return !user?.suspended
      } else return false
    }
  },
  //...authConfig,
});
