import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { CodeCatLogo } from "@/components/shared/codecat-logo";
import { FolderGit2 } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/utils/constants";
import * as motion from "framer-motion/client";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.userId) {
    return null; // Handled by layout redirect
  }

  const repoCount = await prisma.repository.count({
    where: { userId: session.userId }
  });

  if (repoCount === 0) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
          className="flex max-w-md flex-col items-center"
        >
          <CodeCatLogo size={64} className="text-primary opacity-80" />
          
          <h2 className="mt-6 text-2xl font-semibold text-foreground tracking-tight">
            Welcome to CodeCat
          </h2>
          
          <p className="mt-2 text-muted-foreground">
            Connect your first repository to start running specialized AI code reviews on your pull requests.
          </p>
          
          <Link
            href={ROUTES.REPOSITORIES}
            className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <FolderGit2 size={18} />
            Connect Your First Repository
          </Link>
          
          <Link
            href={ROUTES.REPOSITORIES}
            className="mt-6 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            or explore the dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground">
        Recent Activity
      </h2>
      {/* Real dashboard goes here later */}
    </div>
  );
}
