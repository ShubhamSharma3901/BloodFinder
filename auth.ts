import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import EmailProvider from "next-auth/providers/email";
import { profile } from "console";
import { sendVerificationRequest } from "./lib/utils";
import { Resend } from "resend";
import MagicLinkEmail from "@/emails/MagicLinkEmail";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      id: "resend",
      type: "email",
      sendVerificationRequest: async (params) => {
        const { identifier, url } = params;
        const { host } = new URL(url);

        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: [identifier],
          subject: `Log into ${host}`,
          text: `Sign into ${host}`,
          react: MagicLinkEmail({ url, host }),
        });
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
