"use server";

import { auth } from "@/lib/auth";
import { GitHubClient } from "@/lib/github/client";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

import { RepositoryWithStatus } from "../types";

export async function getRepositories(): Promise<{ repositories: RepositoryWithStatus[], hasRepoAccess: boolean }> {
  const session = await auth();
  if (!session?.userId || !session.accessToken) {
    throw new Error("Unauthorized");
  }

  const hasRepoAccess = session.scope?.includes("repo") ?? false;

  let githubRepos: any[] = [];
  if (hasRepoAccess) {
    const githubClient = new GitHubClient(session.accessToken);
    githubRepos = await githubClient.getUserRepositories();
  }

  // Fetch connected repos from DB
  const connectedRepos = await prisma.repository.findMany({
    where: { userId: session.userId },
    select: { githubId: true, id: true },
  });

  const connectedMap = new Map<number, string>();
  connectedRepos.forEach((repo) => {
    connectedMap.set(repo.githubId, repo.id);
  });

  const repositories = githubRepos.map((repo) => ({
    id: connectedMap.get(repo.id) || String(repo.id),
    githubId: repo.id,
    name: repo.name,
    owner: repo.owner.login,
    fullName: repo.full_name,
    description: repo.description,
    stargazersCount: repo.stargazers_count,
    openPullRequests: 0, // Mocked for now, requires extra API calls
    isPrivate: repo.private,
    language: repo.language,
    updatedAt: repo.updated_at,
    isConnected: connectedMap.has(repo.id),
  }));

  return {
    repositories,
    hasRepoAccess
  };
}

export async function autoSyncRepository(owner: string, repo: string): Promise<RepositoryWithStatus> {
  const session = await auth();
  if (!session?.userId || !session.accessToken) {
    throw new Error("Unauthorized");
  }

  const githubClient = new GitHubClient(session.accessToken);
  const githubRepo = await githubClient.getRepository(owner, repo);

  const dbRepo = await prisma.repository.upsert({
    where: {
      githubId: githubRepo.id,
    },
    update: {
      name: githubRepo.name,
      fullName: githubRepo.full_name,
      owner: githubRepo.owner.login,
      description: githubRepo.description,
      isPrivate: githubRepo.private,
      url: githubRepo.html_url,
      language: githubRepo.language,
    },
    create: {
      githubId: githubRepo.id,
      name: githubRepo.name,
      fullName: githubRepo.full_name,
      owner: githubRepo.owner.login,
      description: githubRepo.description,
      isPrivate: githubRepo.private,
      url: githubRepo.html_url,
      language: githubRepo.language,
      userId: session.userId,
    }
  });

  return {
    id: dbRepo.id,
    githubId: githubRepo.id,
    name: githubRepo.name,
    owner: githubRepo.owner.login,
    fullName: githubRepo.full_name,
    description: githubRepo.description,
    stargazersCount: githubRepo.stargazers_count,
    openPullRequests: 0,
    isPrivate: githubRepo.private,
    language: githubRepo.language,
    updatedAt: githubRepo.updated_at,
    isConnected: true,
  };
}
