"use client";

import { Loader2, CheckCircle2, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { PullRequestWithStatus } from "@/features/pull-requests/types";

interface Props {
  pr: PullRequestWithStatus;
}

export function ReviewResults({ pr }: Props) {
  if (pr.status === "RUNNING" || pr.status === "PENDING") {
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

  if (pr.status === "FAILED") {
    return (
      <div className="flex flex-col items-center justify-center p-24 text-center border border-destructive/30 rounded-lg bg-destructive/10 mt-8">
        <AlertCircle className="w-12 h-12 text-destructive mb-6" />
        <h2 className="text-2xl font-bold text-destructive mb-3">Review Failed</h2>
        <p className="text-destructive max-w-md mx-auto">
          An error occurred while running the AI review engine. Please try again.
        </p>
      </div>
    );
  }

  if (pr.status !== "COMPLETED") {
    return null; // Should not reach here, but protects against rendering results
  }

  const generateMasterPrompt = () => {
    if (!pr.findings || pr.findings.length === 0) return "";
    let prompt = "I am reviewing my pull request. Please help me fix the following issues found by the code reviewer:\n\n";
    pr.findings.forEach((f, i) => {
      prompt += `${i + 1}. [${f.category}] ${f.title}\n`;
      if (f.filePath) prompt += `File: ${f.filePath}${f.lineStart ? `:${f.lineStart}` : ''}\n`;
      prompt += `Description: ${f.description}\n\n`;
    });
    return prompt;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Prompt copied to clipboard!"); // Simple feedback for now
  };

  // Placeholder for COMPLETED state (will be hydrated with real data later)
  return (
    <div className="mt-8 space-y-6">
      {pr.findings && pr.findings.length > 0 && (
        <div className="p-5 rounded-lg border border-primary/20 bg-primary/5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-primary">Master Prompt</h3>
            <button 
              onClick={() => handleCopy(generateMasterPrompt())}
              className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Copy Master Prompt
            </button>
          </div>
          <p className="text-sm text-foreground/80 mb-2">
            Paste this prompt into your favorite AI coding assistant (like Claude, ChatGPT, or Cursor) to fix all these issues at once.
          </p>
        </div>
      )}
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-medium">Free Plan Usage</span>
        </div>
        <div className="text-sm">
          <span className="font-semibold text-foreground">{pr.filesProcessed ?? 0}</span>
          <span className="text-muted-foreground"> / 15 files reviewed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-sm text-muted-foreground mb-1">Overall Quality</div>
          <div className={`text-3xl font-bold ${(pr.overallScore ?? -1) >= 8 ? 'text-emerald-500' : (pr.overallScore ?? -1) >= 5 ? 'text-amber-500' : 'text-red-500'}`}>
            {pr.overallScore != null ? `${pr.overallScore.toFixed(1)}/10` : '-/10'}
          </div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-sm text-muted-foreground mb-1">Architecture</div>
          <div className="text-xl font-semibold flex items-center gap-2">
            {pr.findings?.filter(f => f.category === 'ARCHITECTURE').length === 0 ? (
              <><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Pass</>
            ) : (
              <><AlertTriangle className="w-5 h-5 text-amber-500"/> {pr.findings?.filter(f => f.category === 'ARCHITECTURE').length} Issues</>
            )}
          </div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-sm text-muted-foreground mb-1">Security</div>
          <div className="text-xl font-semibold flex items-center gap-2">
            {pr.findings?.filter(f => f.category === 'SECURITY').length === 0 ? (
              <><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Pass</>
            ) : (
              <><AlertTriangle className="w-5 h-5 text-red-500"/> {pr.findings?.filter(f => f.category === 'SECURITY').length} Issues</>
            )}
          </div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="text-sm text-muted-foreground mb-1">Performance</div>
          <div className="text-xl font-semibold flex items-center gap-2">
            {pr.findings?.filter(f => f.category === 'PERFORMANCE').length === 0 ? (
              <><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Pass</>
            ) : (
              <><AlertTriangle className="w-5 h-5 text-amber-500"/> {pr.findings?.filter(f => f.category === 'PERFORMANCE').length} Issues</>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold mt-8">Findings</h3>
        
        {pr.findings?.length === 0 ? (
          <div className="p-12 text-center border border-border rounded-lg bg-card">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
            <h4 className="text-xl font-medium mb-2">No issues found!</h4>
            <p className="text-muted-foreground">The AI specialists did not find any architecture, security, or performance issues in this diff.</p>
          </div>
        ) : (
          pr.findings?.map((finding) => (
            <div key={finding.id} className="p-5 border border-border rounded-lg bg-card text-left">
              <div className="flex items-center gap-3 mb-3">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  finding.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-500' :
                  finding.severity === 'WARNING' ? 'bg-amber-500/10 text-amber-500' :
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {finding.category}
                </span>
                {finding.filePath && (
                  <span className="font-mono text-sm text-muted-foreground">
                    {finding.filePath}{finding.lineStart ? `:${finding.lineStart}` : ''}
                  </span>
                )}
              </div>
              <h4 className="text-base font-medium mb-1">{finding.title}</h4>
              <p className="text-foreground mb-4 text-sm">{finding.description}</p>
              
              {finding.codeSnippet && (
                <div className="bg-muted p-4 rounded text-sm font-mono text-muted-foreground overflow-x-auto mb-4">
                  <pre>{finding.codeSnippet}</pre>
                </div>
              )}

              <details className="group border border-border rounded-md mt-2">
                <summary className="px-4 py-2 text-sm font-medium cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors list-none flex justify-between items-center">
                  <span>View AI Fix Prompt</span>
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 border-t border-border bg-muted/10 text-sm">
                  <div className="flex justify-end mb-2">
                    <button 
                      onClick={() => handleCopy(`Please fix this issue in file ${finding.filePath || 'the codebase'}:\n\nTitle: ${finding.title}\nDescription: ${finding.description}\n\n${finding.codeSnippet ? `Context:\n${finding.codeSnippet}\n` : ''}`)}
                      className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
                    >
                      Copy Prompt
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-muted-foreground font-mono text-xs p-3 bg-card border border-border rounded">
                    Please fix this issue in file {finding.filePath || 'the codebase'}:{"\n\n"}
                    Title: {finding.title}{"\n"}
                    Description: {finding.description}{"\n"}
                    {finding.codeSnippet && `\nContext:\n${finding.codeSnippet}`}
                  </pre>
                </div>
              </details>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
