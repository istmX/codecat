# Spec 0010: Landing Page Redesign

**Status**: Proposed
**Date**: 2026-08-02

## Summary

Enhance the current landing page (`/`) to build on the typography-heavy, minimalist aesthetic (Linear/Raycast inspired) while adding comprehensive sections for feature exploration, testimonials, pricing, and integrations.

## Requirements

### Acceptance Criteria

- **AC-1**: The Hero section retains its clean, typography-led design (CodeCat logo, ultra-bold H1, subtitle, and primary CTA) but adds the new animated radial background from Spec 0009.
- **AC-2**: Adds an "Integration Logo Cloud" directly below the hero CTA (GitHub, GitLab, Bitbucket).
- **AC-3**: Adds a "How it Works" sticky section showing an interactive/animated code diff (before and after CodeCat's review).
- **AC-4**: Relocates the scrolling Testimonials section (developed in Spec 0009) from the sign-in page to the landing page.
- **AC-5**: Adds a Pricing Section (Free vs Pro tiers) matching the project's design tokens.
- **AC-6**: Uses `framer-motion` for all scroll reveal animations. No GSAP.
- **AC-7**: All design tokens strict to `.istm-context/design.md`.

## UI Design

### Layout Structure

```
[Navigation Bar - Sticky, glassmorphic]

[Hero Section]
  └── Radial glowing background (amber)
  └── CodeCat Logo
  └── H1 (massive, black weight)
  └── Subtitle
  └── Primary CTA (Sign In with GitHub)

[Integration Logo Cloud]
  └── "Works seamlessly with"
  └── Logos (GitHub, GitLab, Bitbucket) styled in muted grayscale, hover to color

[How It Works (Sticky Scroll)]
  └── Left column (Sticky): Text explanation (e.g. "Open a PR", "AI runs in parallel", "Get actionable feedback")
  └── Right column (Scrolling): Corresponding visuals (Code window showing a diff, review comments appearing)

[Testimonials (From Spec 0009)]
  └── "CodeCat Does It Better"
  └── The two-column continuous vertical scrolling marquee

[Pricing]
  └── Free Tier ($0): 5 reviews/day, standard AI models
  └── Pro Tier ($20/mo): 100 reviews/day, priority queue, premium models

[Footer]
```

### Motion

- Hero reveal: Staggered upward slide and fade using Framer Motion.
- How it works: Use standard CSS `sticky` combined with Framer Motion `whileInView` for the right column visuals.
- Testimonials: The same continuous linear looping animation (`y: [0, -50%]`) from Spec 0009.

## Data Model

No database changes.

## Build Plan

1. **Install required shadcn components**: Ensure `badge` is installed (as it was missed in Spec 0009).
2. **Move Testimonials**: Extract `sign-in-testimonials.tsx` to `src/components/shared/testimonials-marquee.tsx` so it can be used on the landing page instead of the sign-in page. Update the sign-in page to remove it.
3. **Rewrite `src/app/page.tsx`**:
    - Import and reuse the `SignInBackground` from `src/app/sign-in/sign-in-background.tsx` (move it to `src/components/shared/animated-background.tsx`).
    - Build the `IntegrationCloud` component.
    - Build the `HowItWorks` component with CSS sticky layout.
    - Build the `PricingSection` component.
4. **Deploy & Verify**: Run `npm run build` to ensure all components compile cleanly.

## File Locations

```
src/
  app/
    page.tsx                              (rewrite)
  components/
    shared/
      animated-background.tsx             (moved from sign-in)
      testimonials-marquee.tsx            (moved from sign-in)
    landing/
      integration-cloud.tsx               (new)
      how-it-works.tsx                    (new)
      pricing-section.tsx                 (new)
```
