"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Code2, Cpu } from "lucide-react";

export function CodeCatFeatureBanner() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl font-bold text-foreground mb-2">Ready for a deep review?</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            CodeCat coordinates a team of specialized AI reviewers to provide actionable, deep code analysis beyond a simple scan.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 gap-4 w-full md:w-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted transition-colors">
            <Cpu className="w-6 h-6 text-primary mb-2" />
            <span className="text-xs font-medium text-foreground">Architecture</span>
          </motion.div>
          <motion.div variants={item} className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted transition-colors">
            <ShieldCheck className="w-6 h-6 text-primary mb-2" />
            <span className="text-xs font-medium text-foreground">Security</span>
          </motion.div>
          <motion.div variants={item} className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted transition-colors">
            <Zap className="w-6 h-6 text-primary mb-2" />
            <span className="text-xs font-medium text-foreground">Performance</span>
          </motion.div>
          <motion.div variants={item} className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted transition-colors">
            <Code2 className="w-6 h-6 text-primary mb-2" />
            <span className="text-xs font-medium text-foreground">Best Practices</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
