import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

// Edge-compatible auth config — no Prisma imports here.
// Used by middleware and composed into the full auth.ts config.
export const authConfig = {
  providers: [
    GitHub({
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboard = nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/repositories") ||
        nextUrl.pathname.startsWith("/settings");

      if (isDashboard) {
        return isLoggedIn;
      }
      return true;
    },
    async jwt({ token, account }) {
      // Persist the GitHub access token in the JWT on first sign in
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      if (account?.scope) {
        token.scope = account.scope;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose accessToken on the session object for GitHub API calls
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (token.sub) {
        session.userId = token.sub;
      }
      if (token.scope) {
        session.scope = token.scope as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
