import { getRepositories } from "@/features/repositories/actions/repository-actions";
import { RepositoryListClient } from "@/features/repositories/components/repository-list-client";
import { SyncButton } from "@/features/repositories/components/sync-button";
import { Search, FolderGit2 } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/utils/constants";
import { InteractiveMascot } from "@/components/shared/interactive-mascot";

export const metadata = {
  title: "Repositories | CodeCat",
  description: "Manage your connected repositories.",
};

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma as db } from "@/lib/db/prisma";

export default async function RepositoriesPage() {
  const session = await auth();
  if (session?.user?.id) {
    const dbUser = await db.user.findUnique({
      where: { id: session.user.id },
      select: { githubAppInstalled: true }
    });
    if (!dbUser?.githubAppInstalled) {
      redirect("/setup");
    }
  }
  const { repositories, hasRepoAccess } = await getRepositories();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <InteractiveMascot />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-muted-foreground mb-2">
            <Link href={ROUTES.DASHBOARD} className="hover:text-foreground transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Repositories</span>
          </div>
          <div className="flex sm:items-end justify-between flex-col sm:flex-row gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Repositories</h1>
              <p className="text-muted-foreground mt-1">
                Select a repository to configure CodeCat reviews.
              </p>
            </div>
            <SyncButton hasRepoAccess={hasRepoAccess} />
          </div>
        </header>

        <RepositoryListClient repositories={repositories} hasRepoAccess={hasRepoAccess} />
      </main>
    </div>
  );
}
