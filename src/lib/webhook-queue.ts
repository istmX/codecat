import { internalStartReview } from "@/features/reviews/actions/review-actions";
import { GitHubClient } from "./github/client";
import { prisma } from "./db/prisma";

export const prReviewQueue = new Map<string, { timeout: NodeJS.Timeout; commentId?: number }>();

export async function queuePRReview(
  owner: string, 
  repo: string, 
  number: number, 
  accessToken: string,
  userId: string,
  isSynchronize: boolean
) {
  const prKey = `${owner}/${repo}/${number}`;
  const client = new GitHubClient(accessToken);
  const existingJob = prReviewQueue.get(prKey);

  let commentId = existingJob?.commentId;

  if (existingJob) {
    clearTimeout(existingJob.timeout);
    prReviewQueue.delete(prKey);
  }

  // Update or create comment
  const message = isSynchronize
    ? "🐱 **CodeCat:** Noticed a new commit! Pausing review for 2 minutes to wait for any additional pushes. Please do not merge yet, CodeCat is reviewing!"
    : "🐱 **CodeCat:** I'm starting to review this pull request... Please do not merge yet, CodeCat is reviewing!";

  try {
    if (commentId && isSynchronize) {
      await client.updateIssueComment(owner, repo, commentId, message);
    } else {
      const res = await client.createIssueComment(owner, repo, number, message);
      commentId = res.id;
    }
  } catch (err) {
    console.error("Failed to post PR comment", err);
  }

  // Wait 2 minutes (120,000 ms) before running the review
  const delayMs = 120000; 

  const timeout = setTimeout(async () => {
    prReviewQueue.delete(prKey);
    try {
      if (commentId) {
        await client.updateIssueComment(owner, repo, commentId, "🐱 **CodeCat:** Starting the deep review now...");
      }
      
      await internalStartReview(owner, repo, number, userId, accessToken);
    } catch (err) {
      console.error("Failed to execute queued review", err);
      if (commentId) {
        await client.updateIssueComment(owner, repo, commentId, "🐱 **CodeCat:** Review failed to start. Please check the dashboard.");
      }
    }
  }, delayMs);

  prReviewQueue.set(prKey, { timeout, commentId });
}
