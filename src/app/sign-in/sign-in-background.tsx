"use client";

import { motion } from "framer-motion";

export function SignInBackground() {
  return (
    <>
      {/* High-tech structural grid background */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#30363d_1px,transparent_1px),linear-gradient(to_bottom,#30363d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      {/* Breathing radial glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center"
      >
        <div className="h-[600px] w-[600px] rounded-full bg-primary/20 blur-[100px]"></div>
      </motion.div>
    </>
  );
}
