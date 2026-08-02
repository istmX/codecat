import { getPullRequestsWithStatus } from "@/features/pull-requests/actions/pull-actions";
import { PullRequestListClient } from "@/features/pull-requests/components/pull-request-list-client";
import { ROUTES } from "@/lib/utils/constants";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function PullRequestsPage({ params }: { params: Promise<{ owner: string; repo: string }> }) {
  const { owner, repo } = await params;
  const initialData = await getPullRequestsWithStatus(owner, repo);

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-muted-foreground mb-2 text-sm">
          <Link href={ROUTES.DASHBOARD} className="hover:text-foreground transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/repositories" className="hover:text-foreground transition-colors">Repositories</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{repo}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href={`/repositories/${owner}/${repo}`}
            className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Pull Requests</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Select a pull request to run an AI code review.
            </p>
          </div>
        </div>
      </header>

      <PullRequestListClient owner={owner} repo={repo} initialData={initialData} />
    </main>
  );
}
