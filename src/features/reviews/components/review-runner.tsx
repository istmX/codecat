"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { Sparkles, Loader2, Clock } from "lucide-react";
import { startReview } from "../actions/review-actions";
import { motion } from "framer-motion";

interface Props {
  owner: string;
  repo: string;
  number: number;
}

export function ReviewRunner({ owner, repo, number }: Props) {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const autoStarted = useRef(false);

  const handleStart = () => {
    setErrorMsg(null);
    setIsRateLimited(false);
    startTransition(async () => {
      try {
        await startReview(owner, repo, number);
      } catch (error: any) {
        const msg = error.message || "An error occurred";
        if (msg.toLowerCase().includes("limit reached") || msg.toLowerCase().includes("rate limit")) {
          setIsRateLimited(true);
        } else {
          setErrorMsg(msg);
        }
        console.error(error);
      }
    });
  };

  useEffect(() => {
    if (!autoStarted.current) {
      autoStarted.current = true;
      handleStart();
    }
  }, []);

  if (isRateLimited) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-border rounded-lg bg-card mt-8">
        <div className="mb-6 rounded-full bg-amber-500/10 p-4 border border-amber-500/20">
          <Clock className="w-10 h-10 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">Rate Limit Exceeded</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          You have reached your Free Plan limit for reviews this hour. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-border rounded-lg bg-card mt-8">
      <div className="mb-6 rounded-full bg-primary/10 p-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-3">Auto-Starting Review...</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        CodeCat is preparing to run specialist AI reviewers on this pull request.
      </p>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-md bg-destructive/10 text-destructive text-sm max-w-md mx-auto text-left border border-destructive/20">
          {errorMsg}
          <button 
            onClick={handleStart}
            className="mt-2 text-xs underline block"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
