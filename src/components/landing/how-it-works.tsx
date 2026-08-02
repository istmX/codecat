"use client";

import { motion } from "framer-motion";
import { GitPullRequest, Zap, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  return (
    <div className="relative mt-32 w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-inter)] text-sm font-semibold uppercase tracking-wider text-primary">
          How it works
        </h2>
        <p className="mt-2 font-[family-name:var(--font-inter)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Zero friction. Maximum insight.
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
        {/* Left Column (Sticky Steps) */}
        <div className="sticky top-32 flex flex-col gap-12 lg:gap-24">
          <div className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
              <GitPullRequest className="size-6 text-primary" />
            </div>
            <h3 className="font-[family-name:var(--font-inter)] text-2xl font-bold text-foreground">1. Open a Pull Request</h3>
            <p className="font-[family-name:var(--font-inter)] text-base text-muted-foreground leading-relaxed">
              CodeCat automatically detects new PRs and code pushes. There are no webhooks to configure or CI/CD pipelines to modify. Just install the GitHub app and write code.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
              <Zap className="size-6 text-primary" />
            </div>
            <h3 className="font-[family-name:var(--font-inter)] text-2xl font-bold text-foreground">2. AI Agents Analyze</h3>
            <p className="font-[family-name:var(--font-inter)] text-base text-muted-foreground leading-relaxed">
              CodeCat orchestrates a matrix of specialist AI models. The Security agent checks for vulnerabilities, while the Performance agent looks for bottlenecks. They run in parallel, finishing in seconds.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
              <CheckCircle2 className="size-6 text-primary" />
            </div>
            <h3 className="font-[family-name:var(--font-inter)] text-2xl font-bold text-foreground">3. Actionable Feedback</h3>
            <p className="font-[family-name:var(--font-inter)] text-base text-muted-foreground leading-relaxed">
              Feedback is posted directly to your GitHub PR as structured, native comments. CodeCat explains the "why" and provides the exact code to fix it.
            </p>
          </div>
        </div>

        {/* Right Column (Visuals) */}
        <div className="flex flex-col gap-12 lg:gap-24">
          {/* Visual 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex aspect-square w-full items-center justify-center rounded-xl border border-border bg-card p-8 shadow-2xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:16px_16px]"></div>
            <div className="w-full rounded-lg border border-border bg-background shadow-lg overflow-hidden flex flex-col relative z-10">
              <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-destructive"></div>
                <div className="h-3 w-3 rounded-full bg-warning"></div>
                <div className="h-3 w-3 rounded-full bg-success"></div>
                <span className="ml-2 font-[family-name:var(--font-jetbrains-mono)] text-xs text-muted-foreground">github.com</span>
              </div>
              <div className="p-4 font-[family-name:var(--font-jetbrains-mono)] text-sm leading-loose">
                <div className="flex text-muted-foreground"><span className="w-8 select-none opacity-50">1</span><span className="text-foreground">function getUser(id) {"{"}</span></div>
                <div className="flex text-destructive bg-destructive/10"><span className="w-8 select-none opacity-50 text-destructive">2</span><span className="text-destructive">-  const query = `SELECT * FROM users WHERE id = ${"$"}{"{id}"}`;</span></div>
                <div className="flex text-success bg-success/10"><span className="w-8 select-none opacity-50 text-success">2</span><span className="text-success">+  const query = "SELECT * FROM users WHERE id = $1";</span></div>
                <div className="flex text-muted-foreground"><span className="w-8 select-none opacity-50">3</span><span className="text-foreground">   return db.execute(query, [{"id"}]);</span></div>
                <div className="flex text-muted-foreground"><span className="w-8 select-none opacity-50">4</span><span className="text-foreground">{"}"}</span></div>
              </div>
            </div>
          </motion.div>

          {/* Visual 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex aspect-square w-full items-center justify-center rounded-xl border border-border bg-card p-8 shadow-2xl relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:16px_16px]"></div>
             <div className="flex flex-col gap-3 w-full relative z-10">
                <div className="rounded-md border border-border bg-background p-4 shadow-md transform -rotate-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="size-4 text-primary" />
                    <span className="font-[family-name:var(--font-inter)] text-xs font-semibold">Performance Agent</span>
                  </div>
                  <div className="h-2 w-3/4 rounded bg-muted"></div>
                  <div className="h-2 w-1/2 rounded bg-muted mt-2"></div>
                </div>
                <div className="rounded-md border border-border bg-background p-4 shadow-md transform translate-x-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="size-4 text-primary" />
                    <span className="font-[family-name:var(--font-inter)] text-xs font-semibold">Security Agent</span>
                  </div>
                  <div className="h-2 w-full rounded bg-muted"></div>
                  <div className="h-2 w-2/3 rounded bg-muted mt-2"></div>
                </div>
                <div className="rounded-md border border-border bg-background p-4 shadow-md transform rotate-1">
                  <div className="flex items-center gap-2 mb-2">
                    <LayoutTemplate className="size-4 text-primary" />
                    <span className="font-[family-name:var(--font-inter)] text-xs font-semibold">Architecture Agent</span>
                  </div>
                  <div className="h-2 w-5/6 rounded bg-muted"></div>
                  <div className="h-2 w-4/5 rounded bg-muted mt-2"></div>
                </div>
             </div>
          </motion.div>

          {/* Visual 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex aspect-square w-full items-center justify-center rounded-xl border border-border bg-card p-8 shadow-2xl relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:16px_16px]"></div>
             <div className="w-full rounded-md border border-border bg-background p-5 shadow-lg relative z-10">
                <div className="flex items-center gap-3 border-b border-border pb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                     <span className="text-primary font-bold text-xs">CC</span>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-sm font-semibold">CodeCat Bot <span className="text-muted-foreground font-normal text-xs ml-1">just now</span></p>
                  </div>
                </div>
                <div className="pt-3">
                  <p className="font-[family-name:var(--font-inter)] text-sm text-foreground leading-relaxed">
                    <strong>Critical Security Issue:</strong> This raw query is vulnerable to SQL injection. Use parameterized queries instead.
                  </p>
                  <div className="mt-3 rounded border border-border bg-card p-3 font-[family-name:var(--font-jetbrains-mono)] text-xs text-muted-foreground">
                    const query = "SELECT * FROM users WHERE id = $1";
                  </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { ShieldCheck, LayoutTemplate } from "lucide-react";
