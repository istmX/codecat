export type RepositoryWithStatus = {
  id: string; // The database ID (if connected) or github ID as string
  githubId: number;
  name: string;
  owner: string;
  fullName: string;
  description: string | null;
  stargazersCount: number;
  openPullRequests: number;
  isPrivate: boolean;
  language: string | null;
  updatedAt: string;
  isConnected: boolean;
};
