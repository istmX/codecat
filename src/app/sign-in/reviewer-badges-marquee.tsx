"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const REVIEWERS = [
  "Security",
  "Performance",
  "Architecture",
  "Accessibility",
  "Code Quality",
  "Maintainability",
  "Testing",
  "Documentation",
  "Best Practices",
];

// Duplicate for seamless infinite scrolling
const SCROLL_ITEMS = [...REVIEWERS, ...REVIEWERS];

export function ReviewerBadgesMarquee() {
  return (
    <div className="relative mt-8 flex w-full max-w-sm overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex w-max items-center gap-2"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {SCROLL_ITEMS.map((reviewer, idx) => (
          <Badge
            key={`${reviewer}-${idx}`}
            variant="secondary"
            className="whitespace-nowrap bg-muted px-3 py-1 text-xs font-normal text-muted-foreground"
          >
            {reviewer}
          </Badge>
        ))}
      </motion.div>
    </div>
  );
}
