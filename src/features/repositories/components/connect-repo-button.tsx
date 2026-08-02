"use client";

import { useState } from "react";
import { Plus, Check, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

import { connectRepository, disconnectRepository } from "@/features/repositories/actions/repository-actions";

interface Props {
  githubId: number;
  initialConnected?: boolean;
}

export function ConnectRepoButton({ githubId, initialConnected = false }: Props) {
  const [isConnected, setIsConnected] = useState(initialConnected);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleConnect = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    
    try {
      if (isConnected) {
        await disconnectRepository(githubId);
        setIsConnected(false);
        // Trigger Mascot sad animation
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("codecat-sad"));
        }
      } else {
        await connectRepository(githubId);
        setIsConnected(true);
        setShowToast(true);
        
        // Trigger Mascot happy animation
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("codecat-happy"));
        }
        
        // Hide toast after 3 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to toggle repository connection:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="relative inline-flex flex-col items-end gap-2">
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        aria-live="polite"
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "h-10 px-4 py-2 group",
          isConnected 
            ? "border border-input bg-transparent text-emerald-500 border-emerald-500/30 bg-emerald-500/5 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive" 
            : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
        )}
      >
        {isConnecting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isConnected ? (
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 group-hover:hidden" />
            <X className="h-4 w-4 hidden group-hover:block" />
            <span className="group-hover:hidden">Connected</span>
            <span className="hidden group-hover:inline">Disconnect</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add CodeCat to Repo
          </span>
        )}
      </button>

      {/* Mock Toast */}
      {showToast && (
        <div 
          className="absolute top-full mt-2 w-max animate-in fade-in slide-in-from-top-2 right-0 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-500 shadow-lg"
          role="status"
        >
          <Check size={16} />
          CodeCat successfully connected to repository!
        </div>
      )}
    </div>
  );
}
