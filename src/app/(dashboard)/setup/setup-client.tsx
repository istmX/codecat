"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkGithubAppInstallation } from "@/features/auth/actions/user-actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Plug } from "lucide-react";

export function SetupClient() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // You would replace this with your actual GitHub App Installation URL
  const GITHUB_APP_URL = "https://github.com/apps/codecat-reviewer/installations/new";

  const handleCheck = async () => {
    setIsLoading(true);
    try {
      const res = await checkGithubAppInstallation();
      if (res.installed) {
        toast.success("GitHub App verified! Welcome to CodeCat.");
        router.push("/");
        router.refresh();
      } else {
        toast.error("CodeCat is not installed yet. Please install it to continue.");
      }
    } catch (error) {
      toast.error("Failed to verify installation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <Button 
        size="lg" 
        className="w-full h-12 text-md font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={() => window.open(GITHUB_APP_URL, "_blank")}
      >
        <Plug className="mr-2 h-5 w-5" />
        Install CodeCat on GitHub
      </Button>
      
      <Button 
        size="lg" 
        variant="outline" 
        className="w-full h-12 text-md border-border text-foreground hover:bg-secondary/50"
        onClick={handleCheck}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "I've installed it. Verify now."}
      </Button>
    </div>
  );
}
