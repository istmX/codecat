import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";
import { ROUTES } from "@/lib/utils/constants";
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.SIGN_IN);
  }

  return (
    <SessionProvider session={session}>
      <AppShell user={session.user}>
        {children}
      </AppShell>
    </SessionProvider>
  );
}
