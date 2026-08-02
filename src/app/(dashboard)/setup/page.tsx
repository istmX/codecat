import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { SetupClient } from "./setup-client";

export default async function SetupPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { githubAppInstalled: true },
  });

  if (user?.githubAppInstalled) {
    redirect("/");
  }

  return (
    <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-background p-6">
      <div className="flex w-full max-w-md flex-col items-center text-center space-y-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary/50 border border-border shadow-lg">
          <span className="text-4xl">🔌</span>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Connect CodeCat
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            CodeCat needs permission to post code reviews directly to your Pull Requests. 
            Install the GitHub App to give CodeCat access.
          </p>
        </div>

        <SetupClient />
      </div>
    </div>
  );
}
