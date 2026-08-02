"use client";

import { Cat } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function PullRequestEmptyState({ repoName, owner }: { repoName: string; owner: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-border rounded-lg bg-card">
      <div className="bg-muted p-6 rounded-full mb-4">
        <Cat className="w-16 h-16 text-muted-foreground opacity-50" />
      </div>
      <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        There are no open pull requests in {repoName}. When someone opens a PR, CodeCat will be ready to review it.
      </p>
      <Link 
        href={`https://github.com/${owner}/${repoName}/pulls`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        )}
      >
        View on GitHub
      </Link>
    </div>
  );
}
