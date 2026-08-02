"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { startReview } from "../actions/review-actions";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

interface Props {
  owner: string;
  repo: string;
  number: number;
}

export function ReviewRunner({ owner, repo, number }: Props) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const autoStarted = useRef(false);

  const handleStart = () => {
    const toastId = toast.loading("CodeCat is reviewing this PR in the background...");
    
    startTransition(async () => {
      try {
        const res = await startReview(owner, repo, number);
        
        if (res && res.error) {
          setErrorMsg(res.error);
          toast.error("Review Blocked", {
            description: res.error,
            id: toastId,
          });
          return;
        }

        // Dismiss the loading toast since we hand off to the polling screen
        toast.dismiss(toastId);
      } catch (error: any) {
        const msg = error.message || "An error occurred";
        setErrorMsg(msg);
        toast.error("Review Failed", {
          description: msg,
          id: toastId,
        });
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

  if (errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-8 border border-border/50 rounded-2xl bg-card text-center space-y-4 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertCircle className="w-7 h-7 text-red-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">Review Blocked</h3>
          <p className="text-muted-foreground max-w-md">{errorMsg}</p>
        </div>
      </div>
    );
  }

  // Return nothing while starting, let it run in the background
  return null;
}
