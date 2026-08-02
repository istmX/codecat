"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, LayoutTemplate } from "lucide-react";

export function MeetAgents() {
  return (
    <section className="relative w-full max-w-7xl px-6 py-24 sm:py-32 lg:px-8 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="font-[family-name:var(--font-inter)] text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Meet the <span className="text-primary">Matrix</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-inter)] text-lg text-muted-foreground leading-relaxed">
          CodeCat doesn't rely on a single general model. We orchestrate a team of specialist AI agents that run in parallel.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          {
            title: "Security Agent",
            icon: ShieldCheck,
            color: "text-success",
            border: "border-success/30",
            glow: "group-hover:shadow-[0_0_30px_rgba(35,134,54,0.2)]",
            desc: "Hunts for injection flaws, XSS, CSRF, auth bypasses, and exposed secrets."
          },
          {
            title: "Performance Agent",
            icon: Zap,
            color: "text-warning",
            border: "border-warning/30",
            glow: "group-hover:shadow-[0_0_30px_rgba(210,153,34,0.2)]",
            desc: "Identifies N+1 queries, unnecessary renders, and memory bottlenecks."
          },
          {
            title: "Architecture Agent",
            icon: LayoutTemplate,
            color: "text-primary",
            border: "border-primary/30",
            glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
            desc: "Enforces clean code, separation of concerns, and system boundaries."
          }
        ].map((agent, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`group relative flex flex-col items-center text-center rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-border hover:-translate-y-1 ${agent.glow}`}
          >
            <div className={`mb-6 flex size-16 items-center justify-center rounded-full border ${agent.border} bg-background`}>
              <agent.icon className={`size-8 ${agent.color}`} />
            </div>
            <h3 className="mb-3 font-[family-name:var(--font-inter)] text-xl font-bold text-foreground">{agent.title}</h3>
            <p className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground leading-relaxed">
              {agent.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
