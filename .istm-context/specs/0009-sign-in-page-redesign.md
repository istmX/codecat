# Spec 0009: Premium Sign-In Page Redesign

**Status**: Proposed
**Date**: 2026-08-02

## Summary

Redesign the `/sign-in` page into a premium, centered-card experience with a rich animated background, cycling reviewer badges, a compact feature list, and a stats bar. The design must feel like a world-class developer tool login — minimal but deeply polished.

## Requirements

### Acceptance Criteria

- **AC-1**: Page renders a centered sign-in card on a full-screen animated background using the project's global CSS tokens only (no hardcoded colors, no glassmorphism, no neon glow)
- **AC-2**: Background animates using a natural radial gradient that breathes/shifts slowly using Framer Motion (opacity or scale animation, 0 layout shift)
- **AC-3**: Card contains: CodeCat logo (animated spring entry), app name, tagline, 3 compact feature bullet points, the GitHub sign-in button
- **AC-4**: Cycling reviewer badges animate below the card — cycling through Security, Performance, Architecture, Accessibility, Code Quality, Maintainability, Testing, Documentation, Best Practices
- **AC-5**: A stats bar sits below the badges showing 3 stats (e.g. "9 Specialist Reviewers", "GitHub Native", "Free to Start")
- **AC-6**: No emojis anywhere. All icons are Lucide React
- **AC-7**: Fully responsive — card fits mobile at full width with padding
- **AC-8**: TypeScript strict, no new dependencies (uses existing Framer Motion, Lucide React, shadcn/ui)

## UI Design

### Layout Structure

```
[Full screen bg — animated radial gradient using bg-background + primary color at low opacity]
  └── [Centered column, max-w-sm, px-4]
        ├── [Card — bg-card, border-border, rounded-lg, p-10]
        │     ├── CodeCat Logo (spring animate in, slight bounce)
        │     ├── H1: "CodeCat" — font-black, tracking-tight, uppercase
        │     ├── p: tagline — text-muted-foreground, font-mono, text-sm
        │     ├── [Divider]
        │     ├── [Feature list — 3 items, each: icon + short label]
        │     │     ├── ShieldCheck — "Security & architecture reviewed"
        │     │     ├── Zap — "AI runs in parallel, results in seconds"
        │     │     └── GitPullRequest — "Posts structured comments to your PR"
        │     ├── [Divider]
        │     └── [SignInButton fullWidth]
        │
        ├── [Reviewer Badges Carousel — auto-cycling, horizontal scroll, below card]
        │     Cycles through: Security, Performance, Architecture, Accessibility,
        │     Code Quality, Maintainability, Testing, Documentation, Best Practices
        │     Style: small pill badges, bg-muted, text-muted-foreground, text-xs, gap-2
        │     Animation: fade in/out one at a time OR a continuous horizontal marquee
        │
        └── [Stats Bar — 3 items, horizontal, mt-6]
              "9 Specialist Reviewers" | "GitHub Native" | "Free to Start"
              Style: text-xs, text-muted-foreground, separator between items
```

### Background

- Full screen `bg-background` (#0D1117)
- Layered radial gradient using `primary` color (amber) at 5-8% opacity centered behind the card, animated with a slow breathing scale (1.0 → 1.15 → 1.0 over 8 seconds, Framer Motion `animate` with `repeat: Infinity`)
- Keep the existing subtle grid pattern (structural lines at low opacity), it adds depth without being heavy

### Motion

- Card entry: `initial={{ opacity: 0, y: 16 }}` → `animate={{ opacity: 1, y: 0 }}` with `duration: 0.5, ease: [0.16, 1, 0.3, 1]`
- Logo: spring bounce entry `type: "spring", stiffness: 200, damping: 20`
- Background glow: continuous `scale` breathe with `repeat: Infinity, repeatType: "mirror", duration: 8`
- Reviewer badges marquee: continuous translateX loop using Framer Motion `animate: { x: [0, -50%] }` with `repeat: Infinity, duration: 20, ease: "linear"`
- Feature list items: staggered `opacity: 0 → 1`, delay 0.05s per item after card appears

### Color Tokens (all from design.md — no hardcodes)

- Background: `bg-background`
- Card: `bg-card`, `border-border`
- Glow: `bg-primary/8` (Amber at 8% opacity for the radial bloom)
- Text: `text-foreground`, `text-muted-foreground`
- Badges: `bg-muted`, `text-muted-foreground`
- Icons: `text-primary` (Amber)

## Data Model

No database changes. This is a pure UI/presentation page.

## Build Plan

1. **Replace `/sign-in/page.tsx`** — rewrite the page as a Server Component (no `"use client"` on the page itself)
2. **Create `sign-in-background.tsx`** — `"use client"` component that renders the animated radial glow and grid overlay using Framer Motion
3. **Create `reviewer-badges-marquee.tsx`** — `"use client"` component with a horizontal marquee of reviewer category badges using Framer Motion continuous translateX
4. **Create `sign-in-feature-list.tsx`** — Server Component rendering the 3 feature bullet points with Lucide icons
5. **Create `sign-in-stats-bar.tsx`** — Server Component rendering the 3 stats
6. **Assemble in `page.tsx`** — import all components, keep page thin

## File Locations

```
src/
  app/
    sign-in/
      page.tsx                        (replace existing)
      sign-in-background.tsx          (new)
      reviewer-badges-marquee.tsx     (new)
      sign-in-feature-list.tsx        (new)
      sign-in-stats-bar.tsx           (new)
```
