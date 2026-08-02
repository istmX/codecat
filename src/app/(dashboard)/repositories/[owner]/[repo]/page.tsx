import { autoSyncRepository } from "@/features/repositories/actions/repository-actions";
import { RepositoryDashboardClient } from "@/features/repositories/components/repository-dashboard-client";
import { getPullRequestsWithStatus } from "@/features/pull-requests/actions/pull-actions";
import { InteractiveMascot } from "@/components/shared/interactive-mascot";
import { ROUTES } from "@/lib/utils/constants";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Lock, 
  Unlock, 
  Star, 
  GitPullRequest, 
  Settings, 
  Activity,
  FolderGit2,
  Calendar,
  AlertCircle,
  ArrowLeft
} from "lucide-react";

interface Props {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
}

export default async function RepositoryDetailPage({ params }: Props) {
  const { owner, repo } = await params;
  
  let repository;
  let initialPrData = [];
  try {
    repository = await autoSyncRepository(owner, repo);
    initialPrData = await getPullRequestsWithStatus(owner, repo);
  } catch (error) {
    console.error("Failed to fetch repository or pull requests:", error);
    notFound();
  }

  const languageColor = getLanguageColor(repository.language);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <InteractiveMascot />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Breadcrumb & Header Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link 
            href={ROUTES.REPOSITORIES} 
            className="flex items-center justify-center size-8 rounded-md hover:bg-muted/50 hover:text-foreground transition-colors mr-2 border border-border"
            aria-label="Back to repositories"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link href={ROUTES.DASHBOARD} className="hover:text-foreground transition-colors hidden sm:block">Dashboard</Link>
          <span className="hidden sm:block">/</span>
          <Link href={ROUTES.REPOSITORIES} className="hover:text-foreground transition-colors hidden sm:block">Repositories</Link>
          <span className="hidden sm:block">/</span>
          <span className="text-foreground font-medium" aria-current="page">{repository.name}</span>
        </nav>

        {/* Hero Identity Section */}
        <header className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-border">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-muted border border-border">
                {repository.isPrivate ? (
                  <Lock className="w-6 h-6 text-muted-foreground" aria-label="Private repository" />
                ) : (
                  <Unlock className="w-6 h-6 text-muted-foreground" aria-label="Public repository" />
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <span className="font-normal text-muted-foreground">{repository.owner} /</span>
                  {repository.name}
                </h1>
              </div>
            </div>
            
            {repository.description && (
              <p className="text-base text-muted-foreground max-w-3xl">
                {repository.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
              {repository.language && (
                <div className="flex items-center gap-1.5">
                  <span 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: languageColor }}
                    aria-hidden="true"
                  />
                  <span>{repository.language}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1.5" title="Stars">
                <Star className="w-4 h-4" />
                <span>{repository.stargazersCount}</span>
              </div>
              
              <div className="flex items-center gap-1.5" title="Open Pull Requests">
                <GitPullRequest className="w-4 h-4" />
                <span>{repository.openPullRequests}</span>
              </div>

              <div className="flex items-center gap-1.5" title="Last Updated">
                <Calendar className="w-4 h-4" />
                <span>Updated {new Date(repository.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center gap-3 pt-2 md:pt-0">
            {/* The Connect Repo button is now removed in favor of auto-sync. */}
          </div>
        </header>

        {/* Unified Repository Dashboard (Pull Requests) */}
        <div className="w-full mb-8">
          <RepositoryDashboardClient owner={owner} repo={repo} initialData={initialPrData} />
        </div>

        {/* Settings / Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 hidden">
            {/* Removed the old Review Activity call-to-action */}
          </div>

          <aside className="flex flex-col gap-6">
            <section className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-4 text-foreground font-semibold">
                <Settings className="w-4 h-4" />
                <h3>Repository Settings</h3>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-sm">
                  <span className="text-muted-foreground block mb-1">GitHub Connection</span>
                  <a href={`https://github.com/${repository.fullName}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
                    <FolderGit2 className="w-4 h-4" />
                    View on GitHub
                  </a>
                </div>
                <hr className="border-border my-2" />
                <div className="text-sm">
                  <span className="text-muted-foreground block mb-1">Review Preferences</span>
                  {repository.isConnected ? (
                    <p className="text-foreground">Using default reviewer team</p>
                  ) : (
                    <p className="text-muted-foreground italic">Connect repository to configure</p>
                  )}
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
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
