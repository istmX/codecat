"use client";

import { useRef, useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useInView, animate } from "framer-motion";

function Counter({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  
  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [inView, count, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function PricingSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }}
      className="relative mt-32 w-full max-w-5xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-inter)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 font-[family-name:var(--font-inter)] text-lg text-muted-foreground">
          Start for free, upgrade when your team scales.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12 perspective-1000">
        {/* Free Tier */}
        <motion.div 
          whileHover={{ scale: 1.02, rotateY: -2, z: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 25, mass: 1 }}
          className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-xl"
        >
          <h3 className="font-[family-name:var(--font-inter)] text-xl font-semibold text-foreground">Free</h3>
          <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-muted-foreground">Perfect for individuals and small open-source projects.</p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-inter)] text-4xl font-black text-foreground">$<Counter value={0} /></span>
            <span className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground">/ month</span>
          </div>
          <ul className="mt-8 flex flex-col gap-4">
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="size-5 text-primary" />
              <span>5 AI reviews per day</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="size-5 text-primary" />
              <span>Standard AI Intelligence</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="size-5 text-primary" />
              <span>Basic GitHub integration</span>
            </li>
          </ul>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-8">
            <Link href="/sign-in" className="block w-full">
              <Button className="w-full font-bold">Get Started</Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Pro Tier */}
        <motion.div 
          whileHover={{ scale: 1.02, rotateY: 2, z: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 25, mass: 1 }}
          className="relative rounded-2xl border border-primary/50 bg-card p-8 shadow-2xl transition-shadow hover:shadow-primary/20"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Most Popular
          </div>
          <h3 className="font-[family-name:var(--font-inter)] text-xl font-semibold text-foreground">Pro</h3>
          <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-muted-foreground">For professional teams who need maximum performance.</p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-inter)] text-4xl font-black text-foreground">$<Counter value={20} /></span>
            <span className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground">/ month</span>
          </div>
          <ul className="mt-8 flex flex-col gap-4">
            <li className="flex items-center gap-3 text-sm text-foreground">
              <Check className="size-5 text-primary" />
              <span className="font-semibold">100 AI reviews per day</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-foreground">
              <Check className="size-5 text-primary" />
              <span className="font-semibold">Premium Reasoning Engines</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-foreground">
              <Check className="size-5 text-primary" />
              <span className="font-semibold">Priority review queue</span>
            </li>
          </ul>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-8">
            <Link href="/sign-in" className="block w-full">
              <Button className="w-full font-bold">Get Started</Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
