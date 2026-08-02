"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useInView, animate } from "framer-motion";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const display = useTransform(rounded, (r) => `${r}${suffix}`);

  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [inView, count, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function RoiMetrics() {
  return (
    <section className="relative w-full border-y border-border bg-card/50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {[
            { label: "Hours Saved per Week", value: 10, suffix: "+" },
            { label: "Faster PR Cycles", value: 10, suffix: "x" },
            { label: "Bugs Caught Before Prod", value: 99, suffix: "%" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
              className="flex flex-col items-center justify-center py-8 sm:py-0 text-center"
            >
              <div className="font-[family-name:var(--font-inter)] text-6xl font-black text-foreground drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-4 font-[family-name:var(--font-inter)] text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
