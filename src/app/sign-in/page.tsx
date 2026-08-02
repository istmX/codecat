import { Metadata } from "next";
import { CodeCatLogo } from "@/components/shared/codecat-logo";
import { SignInButton } from "@/features/auth/components/sign-in-button";
import { APP_NAME, APP_TAGLINE } from "@/lib/utils/constants";
import * as motion from "framer-motion/client";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { SignInFeatureList } from "./sign-in-feature-list";
import { ReviewerBadgesMarquee } from "./reviewer-badges-marquee";
import { SignInStatsBar } from "./sign-in-stats-bar";
import { TestimonialsMarquee } from "@/components/shared/testimonials-marquee";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to CodeCat with your GitHub account to get started.",
};

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background overflow-hidden selection:bg-primary/30 selection:text-primary-foreground pb-20 pt-10">
      <AnimatedBackground />

      <div className="relative z-10 flex w-full flex-col items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-full max-w-sm"
        >
          <div className="rounded-lg border border-border bg-card p-10 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
              >
                <CodeCatLogo className="text-primary drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" size={56} />
              </motion.div>
              
              <h1 className="mt-6 font-[family-name:var(--font-inter)] text-3xl font-black text-foreground tracking-tight uppercase">
                {APP_NAME}
              </h1>
              
              <p className="mt-2 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium text-muted-foreground">
                {APP_TAGLINE}
              </p>

              <SignInFeatureList />

              <div className="mt-8 w-full border-t border-border/50 pt-8">
                <SignInButton fullWidth />
              </div>

              <p className="mt-6 font-[family-name:var(--font-inter)] text-xs text-muted-foreground">
                By signing in, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </motion.div>

        <ReviewerBadgesMarquee />
        <SignInStatsBar />
        <TestimonialsMarquee />
      </div>
    </div>
  );
}
