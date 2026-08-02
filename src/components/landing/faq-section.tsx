"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Does CodeCat store my code?",
    answer: "No. We process your PR diffs in memory to generate the review and discard the code immediately. We do not store your source code in our database."
  },
  {
    question: "How is this different from generic AI bots?",
    answer: "Generic bots use a single prompt to look at your code, resulting in shallow feedback. CodeCat spins up parallel specialist agents (Security, Performance, Architecture) that each perform a deep dive into your diff, mimicking a senior engineering committee."
  },
  {
    question: "Which programming languages are supported?",
    answer: "CodeCat is language-agnostic. The underlying LLM models understand all major programming languages including TypeScript, Python, Rust, Go, Java, and C++."
  },
  {
    question: "Do I need to modify my CI/CD pipeline?",
    answer: "Not at all. CodeCat integrates directly as a GitHub App. Just install it, and it automatically listens for new pull requests. Zero configuration required."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative mx-auto w-full max-w-4xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-[family-name:var(--font-inter)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => {
          const isOpen = index === openIndex;
          return (
            <div key={index} className="rounded-lg border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
              >
                <span className="font-[family-name:var(--font-inter)] text-base font-semibold text-foreground">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`size-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="px-6 pb-5 pt-0">
                      <p className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
