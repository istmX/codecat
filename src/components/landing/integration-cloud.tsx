"use client";

import { motion } from "framer-motion";

export function IntegrationCloud() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 0.7, y: 0 }}
      whileHover={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }}
      className="mt-16 w-full max-w-4xl transition-opacity mx-auto"
    >
      <p className="text-center font-[family-name:var(--font-jetbrains-mono)] text-sm text-muted-foreground uppercase tracking-widest">
        Works seamlessly with
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-12 sm:gap-24">
        {/* GitHub */}
        <div className="group flex items-center gap-3 grayscale transition-all duration-300 hover:grayscale-0">
          <svg viewBox="0 0 24 24" className="size-8 fill-current text-foreground" aria-hidden="true">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          <span className="font-[family-name:var(--font-inter)] text-xl font-bold tracking-tight text-foreground">GitHub</span>
        </div>
        
        {/* GitLab (Fake/Disabled for now) */}
        <div className="group flex items-center gap-3 opacity-40 grayscale transition-all duration-300 hover:grayscale-0">
          <svg viewBox="0 0 24 24" className="size-8 fill-current text-[#FCA326]" aria-hidden="true">
            <path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.135-.423-.73-.423-.867 0L16.418 9.45H7.582L4.919 1.263c-.137-.423-.732-.423-.867 0L1.388 9.452.045 13.587c-.173.535.032 1.127.498 1.465l11.457 8.356 11.456-8.356c.466-.338.672-.93.499-1.465z" />
          </svg>
          <span className="font-[family-name:var(--font-inter)] text-xl font-bold tracking-tight text-foreground">GitLab</span>
          <span className="ml-1 rounded bg-muted px-1.5 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-muted-foreground">Soon</span>
        </div>

        {/* Bitbucket (Fake/Disabled for now) */}
        <div className="group flex items-center gap-3 opacity-40 grayscale transition-all duration-300 hover:grayscale-0">
          <svg viewBox="0 0 24 24" className="size-8 fill-current text-[#2684FF]" aria-hidden="true">
            <path d="M.778 1.424A1.666 1.666 0 012.441 0h19.117a1.667 1.667 0 011.663 1.424l-3.327 21.054a1.667 1.667 0 01-1.636 1.408H5.742a1.667 1.667 0 01-1.636-1.408L.778 1.424zm14.39 12.384l1.107-7.05H7.726l.732 7.05h6.71z" />
          </svg>
          <span className="font-[family-name:var(--font-inter)] text-xl font-bold tracking-tight text-foreground">Bitbucket</span>
          <span className="ml-1 rounded bg-muted px-1.5 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-muted-foreground">Soon</span>
        </div>
      </div>
    </motion.div>
  );
}
