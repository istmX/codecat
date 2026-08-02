"use client";

import { FolderGit2 } from "lucide-react";
import { signIn } from "next-auth/react";

interface Props {
  hasRepoAccess: boolean;
}

export function SyncButton({ hasRepoAccess }: Props) {
  const handleSync = () => {
    if (!hasRepoAccess) {
      signIn("github", { callbackUrl: "/repositories" }, { scope: "read:user repo", prompt: "consent" });
    } else {
      // Just reload to refetch server components
      window.location.reload();
    }
  };

  return (
    <button 
      onClick={handleSync}
      className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <FolderGit2 size={16} />
      Sync from GitHub
    </button>
  );
}
