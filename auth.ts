import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import EmailProvider from "next-auth/providers/email";
import { Resend } from "resend";
import MagicLinkEmail from "@/emails/MagicLinkEmail";
import { renderAsync } from "@react-email/components";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

enum Roles {
  ADMIN,
  USER,
  BloodBank,
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    role: string; // Here you are telling typescript that your session will have the role property, if you want your client to have access to this property
  }
  interface User {
    role: string; // the user will now have the property
  }
}

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      id: "google",
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.image,
          role: profile.role ?? Roles[1],
        };
      },
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
    EmailProvider({
      id: "resend",
      type: "email",
      sendVerificationRequest: async (params) => {
        const { identifier, url } = params;
        const { host } = new URL(url);

        //! Below Line is Important in RESEND v2 as this will fix the webpack error during builds
        const rct = await renderAsync(MagicLinkEmail({ url, host }));

        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: [identifier],
          subject: `Log into ${host}`,
          text: `Sign into ${host}`,
          html: rct,
        });
      },
    }),
  ],

  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
      },
    }),
  },
  pages: {
    signIn: `${process.env.NEXT_PUBLIC_APP_URL}/users/sign-in`,
    verifyRequest: `${process.env.NEXT_PUBLIC_APP_URL}/users/verify-request`,
    error: `/users/error`,
  },
});
