import { CodeCatLogo } from "@/components/shared/codecat-logo";
import { SignInButton } from "@/features/auth/components/sign-in-button";
import { APP_NAME, APP_TAGLINE } from "@/lib/utils/constants";
import { Shield, Zap, GitPullRequest } from "lucide-react";
import * as motion from "framer-motion/client";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as const } 
    },
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <motion.div 
        className="flex max-w-lg flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <CodeCatLogo className="text-primary" size={64} />
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="mt-4 text-4xl font-bold tracking-tight text-foreground"
        >
          {APP_NAME}
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="mt-2 text-lg text-muted-foreground"
        >
          {APP_TAGLINE}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-8 w-full max-w-xs">
          <SignInButton fullWidth />
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-3"
        >
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-primary">
              <Zap size={20} />
            </div>
            <h3 className="mt-3 font-medium text-foreground">Specialist AI</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Dedicated agents for architecture, performance, and more.
            </p>
          </div>
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-primary">
              <GitPullRequest size={20} />
            </div>
            <h3 className="mt-3 font-medium text-foreground">GitHub Native</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Seamlessly reads PRs and posts structured review comments.
            </p>
          </div>
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-primary">
              <Shield size={20} />
            </div>
            <h3 className="mt-3 font-medium text-foreground">Secure</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your code remains yours. Strict data handling and permissions.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}