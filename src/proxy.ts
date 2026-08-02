import NextAuth from "next-auth";
import { authConfig } from "@/features/auth/lib/auth-config";

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  // Match all routes except static files, Next.js internals, and auth API
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};
