"use server";

import { auth } from "@/lib/auth";
import { GitHubClient } from "@/lib/github/client";
import { prisma } from "@/lib/db/prisma";
import { PullRequestWithStatus } from "../types";

export async function getPullRequestsWithStatus(owner: string, repo: string): Promise<PullRequestWithStatus[]> {
  const session = await auth();
  if (!session?.userId || !session.accessToken) {
    throw new Error("Unauthorized");
  }

  const dbRepo = await prisma.repository.findFirst({
    where: {
      owner,
      name: repo,
      userId: session.userId,
    },
    select: { id: true },
  });

  // 2. Fetch live PRs from GitHub
  const githubClient = new GitHubClient(session.accessToken);
  const githubPrs = await githubClient.getRepositoryPullRequests(owner, repo);

  // 3. Fetch review status from our DB if we have the repo connected
  let reviewsMap = new Map<number, any>();
  if (dbRepo) {
    const reviews = await prisma.review.findMany({
      where: {
        repositoryId: dbRepo.id,
        pullNumber: {
          in: githubPrs.map((pr) => pr.number),
        },
      },
      select: {
        pullNumber: true,
        status: true,
        overallScore: true,
        summary: true,
      },
    });

    reviews.forEach((review) => {
      reviewsMap.set(review.pullNumber, review);
    });
  }

  // 4. Merge
  return githubPrs.map((pr) => {
    const review = reviewsMap.get(pr.number);
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
      status: review ? review.status : "UNREVIEWED",
      overallScore: review ? review.overallScore : null,
      summary: review ? review.summary : null,
      prState: pr.merged_at ? "merged" : pr.state === "closed" ? "closed" : "open",
    };
  });
}
