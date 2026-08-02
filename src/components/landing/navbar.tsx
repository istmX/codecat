"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { CodeCatLogo } from "@/components/shared/codecat-logo";
import { APP_NAME } from "@/lib/utils/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LandingNavbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Only hide if we have scrolled past 100px
    if (latest > 100 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md"
    >
      <div className="flex items-center gap-2">
        <CodeCatLogo className="size-6 text-primary" />
        <span className="font-[family-name:var(--font-inter)] text-lg font-black uppercase tracking-tight text-foreground">
          {APP_NAME}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <Link 
          href="#how-it-works" 
          className="hidden font-[family-name:var(--font-inter)] text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
        >
          How it Works
        </Link>
        <Link href="/sign-in">
          <Button className="cursor-pointer rounded-full font-bold px-6 bg-primary text-primary-foreground shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all">
            Get Started
          </Button>
        </Link>
      </div>
    </motion.nav>
  );
}
