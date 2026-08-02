import { getPullRequestWithStatus } from "@/features/reviews/actions/review-actions";
import { ReviewRunner } from "@/features/reviews/components/review-runner";
import { ReviewResults } from "@/features/reviews/components/review-results";
import { GitPullRequest, GitMerge, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    owner: string;
    repo: string;
    number: string;
  }>;
}

export default async function PRReviewPage({ params }: PageProps) {
  const { owner, repo, number } = await params;
  
  if (!/^\d+$/.test(number)) {
    notFound();
  }
  const prNumber = parseInt(number, 10);
  if (prNumber <= 0 || !Number.isSafeInteger(prNumber)) {
    notFound();
  }

  const pr = await getPullRequestWithStatus(owner, repo, prNumber);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Link 
        href={`/repositories/${owner}/${repo}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <header className="mb-8 pb-6 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {pr.title} <span className="text-muted-foreground font-normal">#{pr.number}</span>
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Image src={pr.author.avatarUrl} alt={pr.author.login} width={20} height={20} className="rounded-full" />
                <span>{pr.author.login}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-2 font-mono text-[12px]">
                <span className="px-1.5 py-0.5 rounded bg-muted/50 border border-border/50">{pr.baseRef}</span>
                <span className="text-muted-foreground">←</span>
                <span className="px-1.5 py-0.5 rounded bg-muted/50 border border-border/50">{pr.headRef}</span>
              </div>
            </div>
          </div>
          <div>
            {pr.prState === "merged" ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-500">
                <GitMerge className="w-4 h-4" />
                Merged
              </span>
            ) : pr.prState === "closed" ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-500">
                <GitPullRequest className="w-4 h-4" />
                Closed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-500">
                <GitPullRequest className="w-4 h-4" />
                Open
              </span>
            )}
          </div>
        </div>
      </header>

      {pr.status === "UNREVIEWED" ? (
        <ReviewRunner owner={owner} repo={repo} number={prNumber} />
      ) : (
        <ReviewResults pr={pr} />
      )}
    </div>
  );
}
