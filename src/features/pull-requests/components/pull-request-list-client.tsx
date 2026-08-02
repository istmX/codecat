"use client";

import { usePullRequests } from "../lib/hooks";
import { PullRequestWithStatus } from "../types";
import { PullRequestCard } from "./pull-request-card";
import { PullRequestEmptyState } from "./pull-request-empty-state";
import { Loader2 } from "lucide-react";

interface Props {
  owner: string;
  repo: string;
  initialData: PullRequestWithStatus[];
}

export function PullRequestListClient({ owner, repo, initialData }: Props) {
  const { data: pullRequests, isLoading } = usePullRequests(owner, repo, initialData);

  if (isLoading && !pullRequests) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!pullRequests || pullRequests.length === 0) {
    return <PullRequestEmptyState repoName={repo} owner={owner} />;
  }

  return (
    <div className="flex flex-col gap-3">
      {pullRequests.map((pr) => (
        <PullRequestCard key={pr.id} pr={pr} owner={owner} repo={repo} />
      ))}
    </div>
  );
}
