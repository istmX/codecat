"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { startReview } from "../actions/review-actions";
import { toast } from "sonner";

interface Props {
  owner: string;
  repo: string;
  number: number;
}

export function ReviewRunner({ owner, repo, number }: Props) {
  const [isPending, startTransition] = useTransition();
  const autoStarted = useRef(false);

  const handleStart = () => {
    const toastId = toast.loading("CodeCat is reviewing this PR in the background...");
    
    startTransition(async () => {
      try {
        await startReview(owner, repo, number);
        // Dismiss the loading toast since we hand off to the polling screen
        toast.dismiss(toastId);
      } catch (error: any) {
        const msg = error.message || "An error occurred";
        if (msg.toLowerCase().includes("limit reached") || msg.toLowerCase().includes("rate limit")) {
          toast.error("Rate Limit Exceeded", {
            description: msg,
            id: toastId,
          });
        } else {
          toast.error("Review Failed", {
            description: msg,
            id: toastId,
          });
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

  // Return nothing, let it run in the background while the parent page shows nothing (or relies on Polling)
  // But wait, if this returns null, the PRReviewPage will show an empty page until status changes.
  return null;
}
