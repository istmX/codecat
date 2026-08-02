import { generateObject, generateText } from "ai";
import { models } from "./providers";
import { specialistPrompts, findingsListSchema } from "./specialists";
import { prisma } from "@/lib/db/prisma";

export async function runReviewEngine(reviewId: string, diff: string) {
  const modelKeys = ["groq", "mistral", "gemini"] as const;
  
  const runSpecialist = async (specialistType: keyof typeof specialistPrompts, attempt: number = 0) => {
    if (attempt >= modelKeys.length) {
      console.error(`All models failed for specialist ${specialistType}`);
      return [];
    }

    const modelKey = modelKeys[attempt];
    const model = models[modelKey];

    try {
      const { object } = await generateObject({
        model,
        schema: findingsListSchema,
        system: specialistPrompts[specialistType],
        prompt: `Here is the pull request diff to review:\n\n${diff}`,
      });

      return object.findings;
    } catch (error) {
      console.warn(`Model ${modelKey} failed for ${specialistType}. Retrying with fallback...`, error);
      return runSpecialist(specialistType, attempt + 1);
    }
  };

  try {
    const [architectureFindings, securityFindings, performanceFindings] = await Promise.all([
      runSpecialist("architecture"),
      runSpecialist("security"),
      runSpecialist("performance"),
    ]);

    const allFindings = [...architectureFindings, ...securityFindings, ...performanceFindings];

    // Calculate a naive overall score based on severities
    let deduction = 0;
    allFindings.forEach((f) => {
      if (f.severity === "CRITICAL") deduction += 2.0;
      else if (f.severity === "WARNING") deduction += 1.0;
      else if (f.severity === "SUGGESTION") deduction += 0.5;
    });
    
    const overallScore = Math.max(0, 10 - deduction);

    // Generate AI Summary
    let summaryText = `Completed review with ${allFindings.length} findings.`;
    if (allFindings.length > 0) {
      try {
        const { text } = await generateText({
          model: models.groq,
          system: "You are an AI code reviewer. Provide a very brief 2-sentence summary of the main issues found in the PR. Focus only on the most critical themes.",
          prompt: `Here are the findings:\n${allFindings.map(f => `- [${f.category}] ${f.title}`).join('\n')}`,
        });
        summaryText = text;
      } catch (error) {
        console.error("Failed to generate AI summary, using default", error);
      }
    } else {
      summaryText = "Excellent work! No significant architecture, security, or performance issues were found.";
    }

    // Save findings to DB
    const updatedReview = await prisma.$transaction(async (tx) => {
      // Clean up old findings if any
      await tx.finding.deleteMany({ where: { reviewId } });
      
      if (allFindings.length > 0) {
        await tx.finding.createMany({
          data: allFindings.map(f => ({
            ...f,
            reviewId,
          })),
        });
      }

      return tx.review.update({
        where: { id: reviewId },
        data: {
          status: "COMPLETED",
          overallScore,
          summary: summaryText,
        },
        include: {
          repository: true,
          user: {
            include: {
              accounts: {
                where: { provider: "github" }
              }
            }
          }
        }
      });
    });

    // Post to GitHub PR
    try {
      const account = updatedReview.user.accounts[0];
      if (account?.access_token) {
        const { GitHubClient } = await import("@/lib/github/client");
        const client = new GitHubClient(account.access_token);
        
        const overallScoreFmt = overallScore != null ? overallScore.toFixed(1) : '-';
        let body = `### 🐱 CodeCat Review Results\n**Overall Quality:** ${overallScoreFmt} / 10\n\n${summaryText}\n\n`;

        if (allFindings.length > 0) {
          body += `#### Top Findings:\n`;
          allFindings.slice(0, 5).forEach(f => {
            const emoji = f.severity === "CRITICAL" ? "🚨" : f.severity === "WARNING" ? "⚠️" : "💡";
            body += `- ${emoji} **[${f.category}]** ${f.title}\n`;
          });
          if (allFindings.length > 5) {
            body += `\n*...and ${allFindings.length - 5} more findings. View full details on the CodeCat dashboard.*`;
          }
        } else {
          body += `🎉 CodeCat found no significant issues!`;
        }

        body += `\n\n[View Full Report on CodeCat](https://codecat.vercel.app/repositories/${updatedReview.repository.owner}/${updatedReview.repository.name}/pulls/${updatedReview.pullNumber})`;

        await client.createIssueComment(
          updatedReview.repository.owner,
          updatedReview.repository.name,
          updatedReview.pullNumber,
          body
        );
      }
    } catch (ghError) {
      console.error("Failed to post comment to GitHub", ghError);
    }
    
  } catch (error) {
    console.error("Review Engine failed:", error);
    await prisma.review.update({
      where: { id: reviewId },
      data: { status: "FAILED" },
    });
  }
}
