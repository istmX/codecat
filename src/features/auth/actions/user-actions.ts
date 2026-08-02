"use server";

import { auth } from "@/lib/auth";
import { prisma as db } from "@/lib/db/prisma";

export async function checkGithubAppInstallation() {
  const session = await auth();
  if (!session?.userId) return { installed: false };

  const account = await db.account.findFirst({
    where: { userId: session.userId, provider: "github" },
  });

  if (!account?.access_token) return { installed: false };

  try {
    const res = await fetch("https://api.github.com/user/installations", {
      headers: {
        Authorization: `Bearer ${account.access_token}`,
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 0 },
    });
    
    if (!res.ok) return { installed: false };
    const data = await res.json();
    const installed = data.total_count > 0;
    
    if (installed) {
      await db.user.update({
        where: { id: session.userId },
        data: { githubAppInstalled: true }
      });
    }
    
    return { installed };
  } catch (error) {
    return { installed: false };
  }
}

export async function upgradeToPro() {
  const session = await auth();
  if (!session?.userId) throw new Error("Unauthorized");
  
  await db.user.update({
    where: { id: session.userId },
    data: { planTier: "PRO" }
  });
  
  return { success: true };
}
