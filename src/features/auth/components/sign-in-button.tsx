"use client";

import { GithubLogo } from "@/components/shared/github-logo";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils/cn";

interface SignInButtonProps {
  className?: string;
  fullWidth?: boolean;
}

export function SignInButton({ className, fullWidth = false }: SignInButtonProps) {
  return (
    <button
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      className={cn(
        "flex items-center justify-center gap-2",
        "bg-[#6366F1] hover:bg-[#4F46E5] text-white",
        "font-medium text-sm",
        "h-9 px-4 rounded-lg",
        "transition-all duration-150 ease-standard",
        "hover:scale-[1.01] active:scale-[0.99]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]",
        fullWidth && "w-full",
        className
      )}
    >
      <GithubLogo size={16} aria-hidden="true" />
      Sign in with GitHub
    </button>
  );
}
