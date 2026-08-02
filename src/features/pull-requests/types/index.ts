import { Finding } from "@prisma/client";

export interface PullRequestWithStatus {
  id: string;
  number: number;
  title: string;
  url: string;
  author: {
    login: string;
    avatarUrl: string;
  };
  headRef: string;
  baseRef: string;
  createdAt: string;
  status: "UNREVIEWED" | "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
  overallScore?: number | null;
  prState: "open" | "merged" | "closed";
  findings?: Finding[];
}
