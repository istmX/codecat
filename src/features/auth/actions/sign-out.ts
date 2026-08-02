"use server";

import { signOut as authSignOut } from "@/lib/auth";
import { ROUTES } from "@/lib/utils/constants";

export async function signOut() {
  await authSignOut({ redirectTo: ROUTES.SIGN_IN });
}
