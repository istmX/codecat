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
    <div className="relative flex min-h-screen w-full items-center justify-center bg-background overflow-hidden selection:bg-primary/30 selection:text-primary-foreground">
      {/* High-tech structural background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#30363d_1px,transparent_1px),linear-gradient(to_bottom,#30363d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative w-full max-w-sm"
      >
        {/* Glowing backdrop */}
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-primary to-amber-700 opacity-20 blur-xl transition duration-500"></div>
        
        <div className="relative rounded-lg border border-border bg-card/60 backdrop-blur-xl p-10 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            >
              <CodeCatLogo className="text-primary drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" size={56} />
            </motion.div>
            
            <h1 className="mt-6 text-3xl font-black text-foreground tracking-tight uppercase">
              {APP_NAME}
            </h1>
            
            <p className="mt-2 text-sm font-medium text-muted-foreground font-mono">
              {APP_TAGLINE}
            </p>

            <div className="mt-8 w-full border-t border-border/50 pt-8">
              <SignInButton fullWidth />
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
