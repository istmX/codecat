"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Testimonial = {
  id: string;
  name: string;
  handle: string;
  quote: string;
  avatarId: string;
};

const TESTIMONIALS_LEFT: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    handle: "@sarahcodes",
    quote: "CodeCat caught a SQL injection I missed in review. It's like having a senior security engineer on every PR.",
    avatarId: "1494790108377-be9c29b29330",
  },
  {
    id: "3",
    name: "Priya Sharma",
    handle: "@psharma_dev",
    quote: "Every PR now has structured AI feedback before a human even looks at it. Review velocity tripled.",
    avatarId: "1438761681033-6461ffad8d80",
  },
  {
    id: "5",
    name: "Elena Vasquez",
    handle: "@evasquez",
    quote: "Performance reviewer caught an N+1 query on day one. Paid for itself immediately.",
    avatarId: "1534528741775-53994a69daeb",
  },
  {
    id: "7",
    name: "Nadia Kowalski",
    handle: "@nadiak",
    quote: "Onboarding new engineers is faster now. CodeCat explains why something is bad, not just that it is.",
    avatarId: "1573496359142-b8d87734a5a2",
  },
  {
    id: "9",
    name: "Sophie Martin",
    handle: "@smartin_dev",
    quote: "I stopped dreading code review. CodeCat handles the tedious pattern checks and I focus on logic.",
    avatarId: "1580489944761-15a19d654956",
  },
];

const TESTIMONIALS_RIGHT: Testimonial[] = [
  {
    id: "2",
    name: "Marcus Webb",
    handle: "@marcuswebb",
    quote: "The architecture reviewer flagged a circular dependency we'd been ignoring for months. Game changer.",
    avatarId: "1507003211169-0a1dd7228f2d",
  },
  {
    id: "4",
    name: "James Liu",
    handle: "@jamesliu",
    quote: "It found 3 accessibility violations in a component I thought was clean. The explanations are actionable.",
    avatarId: "1472099645785-5658abf4ff4e",
  },
  {
    id: "6",
    name: "Alex Thompson",
    handle: "@athompson",
    quote: "The parallel reviewers find issues that a single AI completely misses. The depth is unreal.",
    avatarId: "1500648767791-00dcc994a43e",
  },
  {
    id: "8",
    name: "Ravi Patel",
    handle: "@ravipatel",
    quote: "It posts comments directly to the PR in the exact format our team uses. Zero context switching.",
    avatarId: "1560250097-0b93528c311a",
  },
];


const SCROLL_LEFT = [...TESTIMONIALS_LEFT, ...TESTIMONIALS_LEFT];
const SCROLL_RIGHT = [...TESTIMONIALS_RIGHT, ...TESTIMONIALS_RIGHT];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="mb-3 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <Image
          src={`https://images.unsplash.com/photo-${testimonial.avatarId}?w=64&h=64&fit=crop&crop=face`}
          alt={testimonial.name}
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-[family-name:var(--font-inter)] text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-muted-foreground">
            {testimonial.handle}
          </p>
        </div>
      </div>
      <p className="mt-2 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-muted-foreground">
        {testimonial.quote}
      </p>
    </div>
  );
}

export function SignInTestimonials() {
  return (
    <div className="mt-10 flex w-full max-w-2xl flex-col items-center px-4">
      <h2 className="font-[family-name:var(--font-inter)] text-xl font-semibold text-foreground text-center">
        CodeCat Does It Better
      </h2>
      <p className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground text-center">
        Trusted by developers who care about code quality
      </p>
      
      <div className="relative mt-6 flex h-96 w-full max-w-2xl gap-3 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <div className="flex-1 overflow-hidden">
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex flex-col"
          >
            {SCROLL_LEFT.map((t, idx) => (
              <TestimonialCard key={`left-${t.id}-${idx}`} testimonial={t} />
            ))}
          </motion.div>
        </div>
        <div className="flex-1 overflow-hidden">
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              duration: 32,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex flex-col"
          >
            {SCROLL_RIGHT.map((t, idx) => (
              <TestimonialCard key={`right-${t.id}-${idx}`} testimonial={t} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
