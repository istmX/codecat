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
      sign-in-testimonials.tsx        (new)
```

---

## Addendum: Testimonials Section

### Overview

Below the stats bar, add a **"CodeCat Does It Better"** heading followed by a continuous vertically-scrolling column of testimonial cards — two parallel columns that drift downward at slightly different speeds, creating a lively, organic look (like Linear's homepage).

### Heading

```
"CodeCat Does It Better"
```
- Font: `font-[--font-inter]`, `text-xl`, `font-semibold`, `text-foreground`, `text-center`
- Sub-label: `"Trusted by developers who care about code quality"`, `text-sm text-muted-foreground text-center`
- Spacing: `mt-10 mb-6`

### Testimonial Data (hardcoded, no DB)

9 fake testimonials — 3 per column across 3 groups, looped. Each has:
- `avatar`: Unsplash avatar URL using `https://images.unsplash.com/photo-{id}?w=64&h=64&fit=crop&crop=face`
- `name`: realistic developer name
- `handle`: GitHub-style handle e.g. `@username`
- `quote`: 1-2 sentence testimonial about CodeCat catching real bugs

Example testimonials:
1. Sarah Chen / @sarahcodes — "CodeCat caught a SQL injection I missed in review. It's like having a senior security engineer on every PR."
2. Marcus Webb / @marcuswebb — "The architecture reviewer flagged a circular dependency we'd been ignoring for months. Game changer."
3. Priya Sharma / @psharma_dev — "Every PR now has structured AI feedback before a human even looks at it. Review velocity tripled."
4. James Liu / @jamesliu — "It found 3 accessibility violations in a component I thought was clean. The explanations are actionable."
5. Elena Vasquez / @evasquez — "Performance reviewer caught an N+1 query on day one. Paid for itself immediately."
6. Alex Thompson / @athompson — "The parallel reviewers find issues that a single AI completely misses. The depth is unreal."
7. Nadia Kowalski / @nadiak — "Onboarding new engineers is faster now. CodeCat explains why something is bad, not just that it is."
8. Ravi Patel / @ravipatel — "It posts comments directly to the PR in the exact format our team uses. Zero context switching."
9. Sophie Martin / @smartin_dev — "I stopped dreading code review. CodeCat handles the tedious pattern checks and I focus on logic."

### Unsplash Avatar IDs (realistic faces, free to use)

Use these specific Unsplash photo IDs to guarantee real faces load:
- `1494790108377-be9c29b29330` (woman, dark hair)
- `1507003211169-0a1dd7228f2d` (man, casual)
- `1438761681033-6461ffad8d80` (woman, smiling)
- `1472099645785-5658abf4ff4e` (man, professional)
- `1534528741775-53994a69daeb` (woman, glasses)
- `1500648767791-00dcc994a43e` (man, beard)
- `1573496359142-b8d87734a5a2` (woman, professional)
- `1560250097-0b93528c311a` (man, suit)
- `1580489944761-15a19d654956` (woman, natural)

URL format: `https://images.unsplash.com/photo-{id}?w=64&h=64&fit=crop&crop=face`

### Layout

```
[Section — mt-10]
  ├── Heading: "CodeCat Does It Better"
  ├── Sub-label
  └── [Two-column testimonial grid — gap-3, max-h-96, overflow-hidden, relative]
        ├── [Left column — animate downward, duration 25s]
        │     Card, Card, Card, Card, Card (5 of 9, looped)
        └── [Right column — animate downward, duration 32s, slight offset start]
              Card, Card, Card, Card (4 of 9, looped)
```

### Testimonial Card Design

```
bg-card, border border-border, rounded-lg, p-4
├── [Avatar row — flex items-center gap-3]
│     ├── <img> — w-9 h-9 rounded-full object-cover
│     └── [Name block]
│           ├── p.name — text-sm font-semibold text-foreground (font-inter)
│           └── p.handle — text-xs text-muted-foreground (font-mono)
└── p.quote — mt-2 text-sm text-muted-foreground leading-relaxed (font-inter)
```

### Motion

- Each column uses Framer Motion `motion.div` with `animate={{ y: ["0%", "-50%"] }}` so it loops seamlessly (the list is duplicated to fill the loop)
- `transition={{ duration: 25, ease: "linear", repeat: Infinity }}` for left column
- `transition={{ duration: 32, ease: "linear", repeat: Infinity }}` for right column (slightly slower = organic feel)
- Top and bottom of the container: `[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]` to fade cards in/out smoothly

### Fonts

All text uses CSS variables from `layout.tsx`:
- Body/names/quotes: `font-[family-name:var(--font-inter)]`
- Handles: `font-[family-name:var(--font-jetbrains-mono)]`
- Never use `font-sans` or `font-mono` shorthands directly — always reference the CSS variables

