import { CodeCatLogo } from "@/components/shared/codecat-logo";
import { SignInButton } from "@/features/auth/components/sign-in-button";
import { APP_NAME, APP_TAGLINE } from "@/lib/utils/constants";
import { Shield, Zap, GitPullRequest, ArrowRight } from "lucide-react";
import * as motion from "framer-motion/client";
import { Variants } from "framer-motion";

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

  const itemX: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-background selection:bg-primary/30 selection:text-primary-foreground overflow-hidden">
      {/* Structural Background Grid (GitHub Vibe) */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#30363d_1px,transparent_1px),linear-gradient(to_bottom,#30363d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 lg:px-8"
      >
        <div className="flex flex-col items-start gap-4">
          <motion.div variants={itemX} className="flex items-center gap-3 rounded-full border border-border bg-card/50 px-4 py-1.5 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground font-mono">
              System Online
            </span>
          </motion.div>

          <motion.div variants={itemY} className="flex items-center gap-4 mt-8">
            <CodeCatLogo className="text-primary size-12 sm:size-16" />
            <h1 className="text-5xl sm:text-7xl lg:text-[8rem] font-black tracking-tighter text-foreground uppercase leading-[0.85]">
              {APP_NAME}
            </h1>
          </motion.div>

          <motion.h2
            variants={itemY}
            className="mt-6 max-w-2xl text-xl sm:text-3xl font-medium tracking-tight text-muted-foreground leading-snug"
          >
            {APP_TAGLINE}. We use <span className="text-primary">specialist AI agents</span> instead of generic bots to catch what humans miss.
          </motion.h2>

          <motion.div variants={itemY} className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="w-full sm:w-64 relative group">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary to-amber-600 opacity-30 blur transition duration-500 group-hover:opacity-100"></div>
              <div className="relative">
                <SignInButton fullWidth />
              </div>
            </div>
            <a href="#features" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground p-3">
              Explore Architecture <ArrowRight className="size-4" />
            </a>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 grid grid-cols-1 border-t border-border sm:grid-cols-3"
          id="features"
        >
          {/* Feature 1 */}
          <motion.div variants={itemY} className="group relative border-b sm:border-b-0 sm:border-r border-border p-8 hover:bg-card/30 transition-colors">
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg border border-border bg-card text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
              <Zap className="size-5" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Specialist AI Matrix</h3>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              Ditching the one-model-fits-all approach. Dedicated agents run in parallel targeting architecture, security, and performance.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={itemY} className="group relative border-b sm:border-b-0 sm:border-r border-border p-8 hover:bg-card/30 transition-colors">
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg border border-border bg-card text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
              <GitPullRequest className="size-5" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">GitHub Native Workflow</h3>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              Injects perfectly formatted, actionable markdown directly into your PRs. No context switching required.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={itemY} className="group relative p-8 hover:bg-card/30 transition-colors">
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg border border-border bg-card text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
              <Shield className="size-5" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Zero-Retention Security</h3>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              Your codebase remains strictly yours. Ephemeral processing with strict provider-level opt-outs for data training.
            </p>
          </motion.div>
        </motion.div>
      </motion.main>
    </div>
  );
}