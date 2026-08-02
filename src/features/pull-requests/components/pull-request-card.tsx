"use client";

import { PullRequestWithStatus } from "../types";
import { GitPullRequest, GitMerge, Clock } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import Image from "next/image";

export function PullRequestCard({ pr, owner, repo }: { pr: PullRequestWithStatus, owner: string, repo: string }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500 ring-1 ring-inset ring-emerald-500/20">Reviewed</span>;
      case "PENDING":
      case "RUNNING":
        return <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-500 ring-1 ring-inset ring-amber-500/20">Review Pending</span>;
      default:
        return <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">Unreviewed</span>;
    }
  };

  const date = new Date(pr.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <Link 
      href={`/repositories/${owner}/${repo}/pulls/${pr.number}`}
      className={cn(
        "block p-4 border border-border rounded-lg bg-card transition-all hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background group",
        pr.prState === "merged" && "opacity-80 hover:opacity-100 bg-muted/20"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className={cn(
            "mt-1 flex-shrink-0 transition-colors",
            pr.prState === "merged" ? "text-purple-500" : "text-muted-foreground group-hover:text-foreground"
          )}>
            {pr.prState === "merged" ? <GitMerge size={18} /> : <GitPullRequest size={18} />}
          </div>
          <div className="min-w-0">
            <h3 className={cn("text-base font-semibold truncate max-w-full", pr.prState === "merged" ? "text-muted-foreground" : "text-foreground")}>
              {pr.title} <span className="text-muted-foreground/70 font-normal ml-1">#{pr.number}</span>
            </h3>
            
            <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Image src={pr.author.avatarUrl} alt={pr.author.login} width={16} height={16} className="rounded-full" />
                <span>{pr.author.login}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2 font-mono text-[11px] text-muted-foreground">
              <span className="px-1.5 py-0.5 rounded bg-muted/50 border border-border/50 truncate max-w-[150px]">{pr.baseRef}</span>
              <GitMerge size={12} />
              <span className="px-1.5 py-0.5 rounded bg-muted/50 border border-border/50 truncate max-w-[150px]">{pr.headRef}</span>
            </div>
            
            {pr.summary && (
              <div className="mt-3 text-sm text-muted-foreground p-2 bg-muted/30 rounded border border-border/50">
                <span className="font-semibold text-foreground/80 text-xs uppercase tracking-wider block mb-1">AI Summary</span>
                {pr.summary}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          {getStatusBadge(pr.status)}
          {pr.overallScore != null && (
            <div className="text-xs font-medium mt-1">
              Score: <span className={pr.overallScore >= 8 ? "text-emerald-500" : pr.overallScore >= 5 ? "text-amber-500" : "text-destructive"}>{pr.overallScore}/10</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
