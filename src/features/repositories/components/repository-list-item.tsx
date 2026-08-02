import { cn } from "@/lib/utils/cn";
import { RepositoryWithStatus } from "../types";
import Link from "next/link";
import { Lock, Unlock, Star, GitPullRequest, CircleDot } from "lucide-react";

interface Props {
  repository: RepositoryWithStatus;
  className?: string;
}

export function RepositoryListItem({ repository, className }: Props) {
  const languageColor = getLanguageColor(repository.language);

  return (
    <Link
      href={`/repositories/${repository.owner}/${repository.name}`}
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-border transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex items-center gap-2">
          {repository.isPrivate ? (
            <Lock size={16} className="text-muted-foreground" aria-label="Private repository" />
          ) : (
            <Unlock size={16} className="text-muted-foreground" aria-label="Public repository" />
          )}
          <h3 className="text-base font-semibold text-primary truncate hover:underline underline-offset-4">
            {repository.fullName}
          </h3>
          {repository.isConnected && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
              Connected
            </span>
          )}
        </div>
        
        {repository.description && (
          <p className="text-sm text-muted-foreground truncate max-w-2xl">
            {repository.description}
          </p>
        )}
        
        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
          {repository.language && (
            <div className="flex items-center gap-1.5">
              <span 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: languageColor }}
                aria-hidden="true"
              />
              <span>{repository.language}</span>
            </div>
          )}
          
          {repository.stargazersCount > 0 && (
            <div className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Star size={14} />
              <span>{repository.stargazersCount}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1 hover:text-foreground transition-colors">
            <GitPullRequest size={14} />
            <span>{repository.openPullRequests} PRs</span>
          </div>
          
          <div>
            Updated {formatTimeAgo(repository.updatedAt)}
          </div>
        </div>
      </div>
    </Link>
  );
}

function getLanguageColor(language: string | null): string {
  switch (language?.toLowerCase()) {
    case "typescript": return "#3178c6";
    case "javascript": return "#f1e05a";
    case "python": return "#3572A5";
    case "go": return "#00ADD8";
    case "rust": return "#dea584";
    default: return "#8b949e";
  }
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
