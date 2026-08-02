"use server";

import { auth } from "@/lib/auth";
import { prisma as db } from "@/lib/db/prisma";
import { App } from "@octokit/app";

export async function checkGithubAppInstallation() {
  const session = await auth();
  if (!session?.userId) return { installed: false };

  const account = await db.account.findFirst({
    where: { userId: session.userId, provider: "github" },
  });

  if (!account?.access_token) return { installed: false };

  if (!process.env.GITHUB_APP_ID || !process.env.GITHUB_APP_PRIVATE_KEY) {
    // No app credentials — skip check and trust the user
    await db.user.update({
      where: { id: session.userId },
      data: { githubAppInstalled: true },
    });
    return { installed: true };
  }

  try {
    // Get the GitHub username via the user's OAuth token
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${account.access_token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!userRes.ok) return { installed: false };
    const githubUser = await userRes.json();
    const username: string = githubUser.login;

    // Use the App's JWT to check if this user has installed the app
    const app = new App({
      appId: process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    await app.octokit.request("GET /users/{username}/installation", {
      username,
    });

    // If the above didn't throw, the installation exists
    await db.user.update({
      where: { id: session.userId },
      data: { githubAppInstalled: true },
    });

    return { installed: true };
  } catch (error: unknown) {
    // 404 means not installed; any other error we surface as not installed
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
