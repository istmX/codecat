import { Metadata } from "next";
import { CodeCatLogo } from "@/components/shared/codecat-logo";
import { SignInButton } from "@/features/auth/components/sign-in-button";
import { APP_NAME, APP_TAGLINE } from "@/lib/utils/constants";
import * as motion from "framer-motion/client";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to CodeCat with your GitHub account to get started.",
};

export default function SignInPage() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] as const }}
        className="w-full max-w-sm rounded-lg border border-border bg-card p-12 shadow-sm"
      >
        <div className="flex flex-col items-center text-center">
          <CodeCatLogo className="text-primary" size={48} />
          
          <h1 className="mt-2 text-2xl font-semibold text-foreground tracking-tight">
            {APP_NAME}
          </h1>
          
          <p className="mt-1 text-sm text-muted-foreground">
            {APP_TAGLINE}
          </p>

          <div className="mt-6 w-full">
            <SignInButton fullWidth />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
