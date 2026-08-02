"use client";

import { useQuery } from "@tanstack/react-query";
import { getPullRequestsWithStatus } from "../actions/pull-actions";
import { PullRequestWithStatus } from "../types";

export function usePullRequests(owner: string, repo: string, initialData?: PullRequestWithStatus[]) {
  return useQuery({
    queryKey: ["pull-requests", owner, repo],
    queryFn: () => getPullRequestsWithStatus(owner, repo),
    initialData,
  });
}
