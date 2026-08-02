"use client";

import { useState } from "react";
import { RepositoryWithStatus } from "../types";
import { RepositoryListItem } from "./repository-list-item";
import { Search, FolderGit2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRepositories } from "../lib/hooks";

interface Props {
  repositories: RepositoryWithStatus[];
  hasRepoAccess: boolean;
}

export function RepositoryListClient({ repositories: initialRepositories, hasRepoAccess: initialHasRepoAccess }: Props) {
  const { data } = useRepositories({
    repositories: initialRepositories,
    hasRepoAccess: initialHasRepoAccess,
  });

  const repositories = data?.repositories ?? [];
  const hasRepoAccess = data?.hasRepoAccess ?? false;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("updated");

  if (!hasRepoAccess) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-border rounded-lg bg-card">
        <FolderGit2 size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground">Repository Access Required</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-md">
          CodeCat needs access to your GitHub repositories to analyze pull requests. 
          Grant access to sync your repositories.
        </p>
        <button
          onClick={() => signIn("github", { callbackUrl: "/repositories" }, { scope: "read:user repo", prompt: "consent" })}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2 text-sm font-medium transition-colors"
        >
          <FolderGit2 size={16} />
          Grant Repository Access
        </button>
      </div>
    );
  }

  const filtered = repositories.filter(repo => {
    if (search && !repo.fullName.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter === "public" && repo.isPrivate) return false;
    if (typeFilter === "private" && !repo.isPrivate) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortFilter === "name") return a.fullName.localeCompare(b.fullName);
    if (sortFilter === "stars") return b.stargazersCount - a.stargazersCount;
    // default updated
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <section className="flex flex-col rounded-lg border border-border bg-card overflow-hidden shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 p-4 border-b border-border bg-muted/20">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find a repository..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="flex h-10 w-full sm:w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none"
            aria-label="Type filter"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em 1em', paddingRight: '2rem' }}
          >
            <option value="all">Type: All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <select 
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
            className="flex h-10 w-full sm:w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none"
            aria-label="Sort filter"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em 1em', paddingRight: '2rem' }}
          >
            <option value="updated">Sort: Last updated</option>
            <option value="name">Name</option>
            <option value="stars">Stars</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-col">
        {sorted.map(repo => (
          <RepositoryListItem key={repo.id} repository={repo} />
        ))}
        
        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <FolderGit2 size={32} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground">No repositories found</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              We couldn't find any repositories matching your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
