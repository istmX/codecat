"use client";

import { useState, useTransition } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { startReview } from "../actions/review-actions";
import { motion } from "framer-motion";

interface Props {
  owner: string;
  repo: string;
  number: number;
}

export function ReviewRunner({ owner, repo, number }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleStart = () => {
    startTransition(async () => {
      try {
        await startReview(owner, repo, number);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-border rounded-lg bg-card mt-8">
      <div className="mb-6 rounded-full bg-primary/10 p-4">
        <Sparkles className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-3">Ready to Review</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Run CodeCat's specialist AI reviewers on this pull request to get deep insights on architecture, security, and performance.
      </p>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleStart}
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Initializing CodeCat...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Run CodeCat Review
          </>
        )}
      </motion.button>
    </div>
  );
}
