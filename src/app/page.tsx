import { CodeCatLogo } from "@/components/shared/codecat-logo";
import { SignInButton } from "@/features/auth/components/sign-in-button";
import { APP_NAME, APP_TAGLINE } from "@/lib/utils/constants";
import * as motion from "framer-motion/client";
import { Variants } from "framer-motion";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { IntegrationCloud } from "@/components/landing/integration-cloud";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsMarquee } from "@/components/shared/testimonials-marquee";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemY: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-background selection:bg-primary/30 selection:text-primary-foreground overflow-hidden">
      <AnimatedBackground />

      <main className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-32 pb-24 sm:pt-40 lg:px-8">
        
        {/* HERO */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={itemY}>
            <CodeCatLogo className="text-primary size-20 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
          </motion.div>
          
          <motion.h1 variants={itemY} className="mt-8 font-[family-name:var(--font-inter)] text-6xl sm:text-8xl lg:text-[9rem] font-black tracking-tighter text-foreground uppercase leading-[0.85]">
            {APP_NAME}
          </motion.h1>

          <motion.h2
            variants={itemY}
            className="mt-8 max-w-2xl font-[family-name:var(--font-inter)] text-xl sm:text-2xl font-medium tracking-tight text-muted-foreground leading-snug"
          >
            {APP_TAGLINE}. We use <span className="text-primary font-bold">specialist AI agents</span> instead of generic bots to catch what humans miss.
          </motion.h2>

          <motion.div variants={itemY} className="mt-12 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-64 relative group">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary to-amber-600 opacity-30 blur transition duration-500 group-hover:opacity-100"></div>
              <div className="relative">
                <SignInButton fullWidth />
              </div>
            </div>
            <a href="#how-it-works" className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground p-3">
              Explore Architecture <ArrowRight className="size-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* INTEGRATIONS */}
        <IntegrationCloud />

        {/* HOW IT WORKS */}
        <div id="how-it-works">
          <HowItWorks />
        </div>

        {/* TESTIMONIALS */}
        <TestimonialsMarquee />

        {/* PRICING */}
        <PricingSection />

        {/* FOOTER */}
        <footer className="mt-32 border-t border-border/50 py-12 w-full max-w-6xl text-center">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME}. Built with Next.js & Tailwind.
          </p>
        </footer>
      </main>
    </div>
  );
}