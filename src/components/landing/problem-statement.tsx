"use client";

import { motion } from "framer-motion";
import { AlertCircle, Clock, SearchX, ShieldAlert } from "lucide-react";

export function ProblemStatement() {
  return (
    <section className="relative w-full max-w-7xl px-6 py-24 sm:py-32 lg:px-8 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }}
        className="text-center"
      >
        <h2 className="font-[family-name:var(--font-inter)] text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          The Cost of <span className="text-destructive">Bad Code</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-inter)] text-lg text-muted-foreground leading-relaxed">
          Manual code reviews are slow, fatigue-prone, and often miss critical flaws. Generic AI bots just add noise.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: ShieldAlert,
            title: "Security Breaches",
            desc: "Vulnerabilities slip through when reviewers are rushing.",
            color: "text-destructive",
            bg: "bg-destructive/10"
          },
          {
            icon: Clock,
            title: "Bottlenecks",
            desc: "PRs sit for days waiting for a senior engineer's approval.",
            color: "text-warning",
            bg: "bg-warning/10"
          },
          {
            icon: SearchX,
            title: "Shallow Scans",
            desc: "Generic bots only catch syntax errors, missing deep logic flaws.",
            color: "text-muted-foreground",
            bg: "bg-card"
          },
          {
            icon: AlertCircle,
            title: "Tech Debt",
            desc: "Without consistent architectural review, codebases degrade.",
            color: "text-primary",
            bg: "bg-primary/10"
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <div className={`flex size-12 items-center justify-center rounded-lg ${item.bg}`}>
              <item.icon className={`size-6 ${item.color}`} />
            </div>
            <h3 className="font-[family-name:var(--font-inter)] text-xl font-semibold text-foreground">{item.title}</h3>
            <p className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
