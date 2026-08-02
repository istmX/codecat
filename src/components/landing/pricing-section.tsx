import { Check } from "lucide-react";
import { SignInButton } from "@/features/auth/components/sign-in-button";

export function PricingSection() {
  return (
    <div className="relative mt-32 w-full max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-inter)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 font-[family-name:var(--font-inter)] text-lg text-muted-foreground">
          Start for free, upgrade when your team scales.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
        {/* Free Tier */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h3 className="font-[family-name:var(--font-inter)] text-xl font-semibold text-foreground">Free</h3>
          <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-muted-foreground">Perfect for individuals and small open-source projects.</p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-inter)] text-4xl font-black text-foreground">$0</span>
            <span className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground">/ month</span>
          </div>
          <ul className="mt-8 flex flex-col gap-4">
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="size-5 text-primary" />
              <span>5 AI reviews per day</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="size-5 text-primary" />
              <span>Standard AI models (Mistral/Gemini)</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="size-5 text-primary" />
              <span>Basic GitHub integration</span>
            </li>
          </ul>
          <div className="mt-8">
            <SignInButton fullWidth />
          </div>
        </div>

        {/* Pro Tier */}
        <div className="relative rounded-2xl border border-primary/50 bg-card p-8 shadow-2xl">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Most Popular
          </div>
          <h3 className="font-[family-name:var(--font-inter)] text-xl font-semibold text-foreground">Pro</h3>
          <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-muted-foreground">For professional teams who need maximum performance.</p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-inter)] text-4xl font-black text-foreground">$20</span>
            <span className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground">/ month</span>
          </div>
          <ul className="mt-8 flex flex-col gap-4">
            <li className="flex items-center gap-3 text-sm text-foreground">
              <Check className="size-5 text-primary" />
              <span className="font-semibold">100 AI reviews per day</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-foreground">
              <Check className="size-5 text-primary" />
              <span className="font-semibold">Premium AI models (Groq)</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-foreground">
              <Check className="size-5 text-primary" />
              <span className="font-semibold">Priority review queue</span>
            </li>
          </ul>
          <div className="mt-8">
            <SignInButton fullWidth />
          </div>
        </div>
      </div>
    </div>
  );
}
