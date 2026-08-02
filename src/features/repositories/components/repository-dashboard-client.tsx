"use client";

import { usePullRequests } from "@/features/pull-requests/lib/hooks";
import { PullRequestWithStatus } from "@/features/pull-requests/types";
import { PullRequestCard } from "@/features/pull-requests/components/pull-request-card";
import { Loader2 } from "lucide-react";
import { CodeCatFeatureBanner } from "./codecat-feature-banner";

interface Props {
  owner: string;
  repo: string;
  initialData: PullRequestWithStatus[];
}

export function RepositoryDashboardClient({ owner, repo, initialData }: Props) {
  const { data: pullRequests, isLoading } = usePullRequests(owner, repo, initialData);

  if (isLoading && !pullRequests) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const reviewedPrs = pullRequests?.filter(pr => pr.status !== "UNREVIEWED") || [];
  const unreviewedPrs = pullRequests?.filter(pr => pr.status === "UNREVIEWED") || [];

  return (
    <div className="flex flex-col gap-12">
      {reviewedPrs.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
            Reviewed by CodeCat
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
              {reviewedPrs.length}
            </span>
          </h2>
          <div className="flex flex-col gap-3">
            {reviewedPrs.map((pr) => (
              <PullRequestCard key={pr.id} pr={pr} owner={owner} repo={repo} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          {reviewedPrs.length > 0 ? "Not Reviewed" : "Pull Requests"}
          <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full font-medium">
            {unreviewedPrs.length}
          </span>
        </h2>
        
        <CodeCatFeatureBanner />

        <div className="flex flex-col gap-3">
          {unreviewedPrs.length > 0 ? (
            unreviewedPrs.map((pr) => (
              <PullRequestCard key={pr.id} pr={pr} owner={owner} repo={repo} />
            ))
          ) : (
            <div className="text-center p-8 border border-border rounded-lg bg-card text-muted-foreground">
              No unreviewed pull requests found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
