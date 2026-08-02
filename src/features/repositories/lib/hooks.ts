"use client";

import { useQuery } from "@tanstack/react-query";
import { getRepositories } from "../actions/repository-actions";
import { RepositoryWithStatus } from "../types";

export function useRepositories(initialData?: { repositories: RepositoryWithStatus[], hasRepoAccess: boolean }) {
  return useQuery({
    queryKey: ["repositories"],
    queryFn: () => getRepositories(),
    initialData,
  });
}
