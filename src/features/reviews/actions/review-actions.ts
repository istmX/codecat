"use server";

import { auth } from "@/lib/auth";
import { GitHubClient } from "@/lib/github/client";
import { prisma } from "@/lib/db/prisma";
import { PullRequestWithStatus } from "@/features/pull-requests/types";
import { revalidatePath } from "next/cache";
import { runReviewEngine } from "@/lib/ai/engine";

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
      include: {
        findings: true,
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
    status: review ? (review.status as PullRequestWithStatus["status"]) : "UNREVIEWED",
    overallScore: review ? review.overallScore : null,
    prState: pr.merged_at ? "merged" : pr.state === "closed" ? "closed" : "open",
    findings: review ? review.findings : [],
    filesProcessed: review ? review.filesProcessed : undefined,
  };
}

export async function startReview(owner: string, repo: string, number: number) {
  const session = await auth();
  if (!session?.userId || !session.accessToken) {
    throw new Error("Unauthorized");
  }

  const { checkRateLimit } = await import("@/lib/rate-limit");
  const rateLimitResult = await checkRateLimit(session.userId);
  if (!rateLimitResult.allowed) {
    throw new Error(`Review limit reached. Try again in ${rateLimitResult.waitTimeMinutes} mins.`);
  }

  const dbRepo = await prisma.repository.findFirst({
    where: { owner, name: repo, userId: session.userId },
  });

  if (!dbRepo) {
    throw new Error("Repository not found in db");
  }

  // Fetch the PR again to get the missing fields for creation
  const githubClient = new GitHubClient(session.accessToken);
  const pr = await githubClient.getPullRequest(owner, repo, number);
  const files = await githubClient.getPullRequestFiles(owner, repo, number);

  // Filter and limit files
  const filteredFiles = files.filter(f => f.status !== "removed" && !f.filename.endsWith(".md"));
  const maxFiles = 15; // Free plan limit
  const filesToReview = filteredFiles.slice(0, maxFiles);
  
  // Reconstruct a diff for the AI
  const diffString = filesToReview
    .filter(f => f.patch)
    .map(f => `--- a/${f.filename}\n+++ b/${f.filename}\n${f.patch}`)
    .join("\n\n");

  const review = await prisma.review.upsert({
    where: {
      repositoryId_pullNumber: {
        repositoryId: dbRepo.id,
        pullNumber: number,
      },
    },
    update: {
      status: "RUNNING",
      filesProcessed: filesToReview.length,
    },
    create: {
      repositoryId: dbRepo.id,
      userId: session.userId,
      pullNumber: number,
      pullTitle: pr.title,
      pullUrl: pr.html_url,
      branch: pr.head.ref,
      baseBranch: pr.base.ref,
      status: "RUNNING",
      filesProcessed: filesToReview.length,
    },
  });

  revalidatePath(`/repositories/${owner}/${repo}/pulls/${number}`);

  // Kick off the AI review engine in the background
  runReviewEngine(review.id, diffString).catch(console.error);
}
