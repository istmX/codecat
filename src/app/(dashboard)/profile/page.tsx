import { auth } from "@/lib/auth";
import { prisma as db } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { InteractiveMascot } from "@/components/shared/interactive-mascot";
import { CatPay } from "@/features/billing/components/cat-pay";
import { LogOut, User as UserIcon, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Profile | CodeCat",
  description: "Manage your profile and billing.",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user?.githubAppInstalled) {
    redirect("/setup");
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <InteractiveMascot />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile & Billing</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and plan.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Identity Card */}
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              {user.image ? (
                <Image src={user.image} alt={user.name || "User"} width={64} height={64} className="rounded-full" />
              ) : (
                <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {user.planTier} PLAN
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">GitHub App</span>
                <span className="font-medium text-emerald-500 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Installed
                </span>
              </div>
            </div>
          </div>

          {/* Billing / Upgrade Card */}
          {user.planTier === "FREE" ? (
            <CatPay />
          ) : (
            <div className="flex flex-col gap-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 backdrop-blur-sm shadow-md">
              <h3 className="text-lg font-bold text-emerald-500">PRO Plan Active</h3>
              <p className="text-sm text-muted-foreground">You have access to 100 PR reviews per day. Thank you for using CodeCat!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
