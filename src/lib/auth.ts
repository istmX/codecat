import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "@/features/auth/lib/auth-config";
import { prisma } from "@/lib/db/prisma";

// Full auth config with Prisma adapter — Node.js runtime only.
// Do NOT import this file in middleware.ts (use auth-config.ts instead).
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
});
