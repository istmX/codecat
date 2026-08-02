"use server";

import { auth } from "@/lib/auth";
import { GitHubClient } from "@/lib/github/client";
import { prisma } from "@/lib/db/prisma";
import { PullRequestWithStatus } from "@/features/pull-requests/types";
import { revalidatePath } from "next/cache";

export async function getPullRequestWithStatus(owner: string, repo: string, number: number): Promise<PullRequestWithStatus> {
  const session = await auth();
  if (!session?.userId || !session.accessToken) {
    throw new Error("Unauthorized");
  }

  const githubClient = new GitHubClient(session.accessToken);
  const pr = await githubClient.getPullRequest(owner, repo, number);

  const dbRepo = await prisma.repository.findFirst({
    where: { owner, name: repo, userId: session.userId },
    select: { id: true },
  });

  let review = null;
  if (dbRepo) {
    review = await prisma.review.findFirst({
      where: {
        repositoryId: dbRepo.id,
        pullNumber: number,
      },
    });
  }

  return {
    id: String(pr.id),
    number: pr.number,
    title: pr.title,
    url: pr.html_url,
    author: {
      login: pr.user.login,
      avatarUrl: pr.user.avatar_url,
    },
    headRef: pr.head.ref,
    baseRef: pr.base.ref,
    createdAt: pr.created_at,
    status: review ? (review.status as any) : "UNREVIEWED",
    overallScore: review ? review.overallScore : null,
    prState: pr.merged_at ? "merged" : pr.state === "closed" ? "closed" : "open",
  };
}

export async function startReview(owner: string, repo: string, number: number) {
  const session = await auth();
  if (!session?.userId || !session.accessToken) {
    throw new Error("Unauthorized");
  }

  const dbRepo = await prisma.repository.findFirst({
    where: { owner, name: repo, userId: session.userId },
  });

  if (!dbRepo) {
    throw new Error("Repository not found in db");
  }

  // MVP Mock implementation
  // We'll simulate a review taking place by upserting a pending review, then returning
  
  await prisma.review.upsert({
    where: {
      repositoryId_pullNumber: {
        repositoryId: dbRepo.id,
        pullNumber: number,
      },
    },
    update: {
      status: "RUNNING",
    },
    create: {
      repositoryId: dbRepo.id,
      pullNumber: number,
      status: "RUNNING",
    },
  });

  revalidatePath(`/repositories/${owner}/${repo}/pulls/${number}`);

  // We should actually run the AI review here asynchronously in a background task
  // But for the sake of the UI MVP, we just set it to RUNNING. 
  // You would trigger a background queue job here.
}
