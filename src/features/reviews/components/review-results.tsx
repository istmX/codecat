"use client";

import { Loader2, CheckCircle2, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { PullRequestWithStatus } from "@/features/pull-requests/types";

interface Props {
  pr: PullRequestWithStatus;
}

export function ReviewResults({ pr }: Props) {
  if (pr.status === "RUNNING") {
    return (
      <div className="flex flex-col items-center justify-center p-24 text-center border border-border rounded-lg bg-card mt-8">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-foreground mb-3">CodeCat is Reviewing...</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Our specialist AI reviewers are currently analyzing this pull request. This usually takes about a minute.
        </p>
      </div>
    );
  }

  // Placeholder for COMPLETED state (will be hydrated with real data later)
  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-sm text-muted-foreground mb-1">Overall Quality</div>
          <div className="text-3xl font-bold text-emerald-500">9/10</div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-sm text-muted-foreground mb-1">Architecture</div>
          <div className="text-xl font-semibold flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Pass</div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-sm text-muted-foreground mb-1">Security</div>
          <div className="text-xl font-semibold flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500"/> 1 Warning</div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-sm text-muted-foreground mb-1">Performance</div>
          <div className="text-xl font-semibold flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Pass</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold mt-8">Findings</h3>
        
        {/* Placeholder Finding Card */}
        <div className="p-5 border border-border rounded-lg bg-card text-left">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-500">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Security
            </span>
            <span className="font-mono text-sm text-muted-foreground">src/features/auth/actions.ts:42</span>
          </div>
          <p className="text-foreground mb-4">
            Directly returning the raw session object might expose sensitive tokens to the client. Consider omitting access tokens before returning.
          </p>
          <div className="bg-muted p-4 rounded text-sm font-mono text-muted-foreground overflow-x-auto">
            <div className="text-red-400">- return session;</div>
            <div className="text-emerald-400">+ const {"{ accessToken, ...safeSession }"} = session;</div>
            <div className="text-emerald-400">+ return safeSession;</div>
          </div>
        </div>
      </div>
    </div>
  );
}
