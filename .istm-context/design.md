# CodeCat Design System, Tokens, Layout Rules, and Component Registry

This document is the single source of truth for every interface, interaction, and component. Every design decision should reinforce clarity, consistency, and trust.

---

# Part 1: Core Principles and Golden Rules

## Aesthetic: CodeRabbit x GitHub
The application follows a precise, developer-first aesthetic blending GitHub's structured layout and CodeRabbit's high-tech, high-contrast dark mode.
- **Deep Slate Base**: Backgrounds use deep, cool grays (`#0D1117`) mimicking GitHub's dark mode.
- **Fiery Amber Accent**: A bright, energetic Amber/Orange accent replaces traditional blues and purples to draw attention to primary actions and AI insights.
- **Utilitarian Typography**: `Inter` provides supreme legibility for dense UI, paired with `JetBrains Mono` for all code and terminal outputs.

## Golden Rules
Every design should:
- Focus on one primary action.
- Rely on structural borders over heavy shadows.
- Reuse existing components (shadcn/ui primitives).
- Preserve user context.
- Prioritize readability and high contrast for developer tools.

---

# Part 2: Design Tokens

Never hardcode colors, spacing, typography, radius values, or shadows. Always use these design tokens, mapped directly to Tailwind v4 and shadcn/ui CSS variables.

## Colors

### Brand and Accent Colors
* **Primary Accent** (`primary`): `#F59E0B` (Amber 500) or `#F97316` (Orange 500). Used exclusively for primary buttons, active states, links, and AI highlights.
* **Primary Foreground** (`primary-foreground`): `#FFFFFF` or `#000000` (depending on contrast, usually dark text on bright amber buttons).

### Surface Colors (GitHub-inspired Dark Theme)
* **Background** (`bg-background`): `#0D1117` (GitHub Dark). The deepest background layer.
* **Foreground** (`text-foreground`): `#E6EDF3` (GitHub Text). Primary text color.
* **Card Surface** (`bg-card`): `#161B22` (GitHub Surface). Cards, panels, sidebars.
* **Card Border** (`border-border`): `#30363D` (GitHub Border). Structural separators.
* **Muted Surface** (`bg-muted`): `#21262D` (GitHub Muted). Hover states on items, secondary backgrounds.
* **Muted Text** (`text-muted-foreground`): `#8B949E` (GitHub Muted Text). Descriptions, metadata, timestamps.
* **Accent Surface** (`bg-accent`): `#21262D`. Stronger hover states.

### Semantic State Colors
* **Destructive** (`bg-destructive`): `#F85149` (GitHub Red). Critical severity, errors, destructive actions.
* **Success** (`text-success`): `#238636` (GitHub Green). Success states, passing checks.
* **Warning** (`text-warning`): `#D29922` (GitHub Yellow). Warning severity, caution states.

## Typography

### Font Family
* **Primary Font**: Inter (sans-serif). Used for all body text, headings, buttons, forms, navigation, and UI labels.
* **Fallback Font**: system-ui, sans-serif
* **Monospace Font**: JetBrains Mono. Used exclusively for code snippets, diff viewer, file paths, and terminal output.

### Type Scale
* **Display / Hero** (H1): 32px / 2rem, weight 700, line height 1.25, letter spacing -0.02em
* **Page Title** (H2): 24px / 1.5rem, weight 600, line height 1.25, letter spacing -0.01em
* **Section Title** (H3): 20px / 1.25rem, weight 600, line height 1.3
* **Card Title** (H4): 16px / 1rem, weight 600, line height 1.4
* **Body** (p): 14px / 0.875rem, weight 400, line height 1.5
* **Body Small** (small): 13px / 0.8125rem, weight 400, line height 1.5
* **Caption / Meta**: 12px / 0.75rem, weight 500, line height 1.4, `text-muted-foreground` color
* **Code**: 13px / 0.8125rem, weight 400, line height 1.6, JetBrains Mono

## Spacing Scale (8px Grid)
* XS: `4px`
* SM: `8px`
* MD: `16px`
* LG: `24px`
* XL: `32px`
* 2XL: `48px`
* 3XL: `64px`

## Shadows and Elevation
* **Flat Design**: The interface relies on structural borders (`border-border`), not shadows, to separate surfaces.
* **Floating / Modals**: `0 0 0 1px rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.5)`. Used exclusively for command palettes, dropdowns, and modals to lift them off the canvas.

## Border Radius
* **Sharp / Strict**: `6px` (or `--radius: 0.375rem`). Inputs, small tags. (GitHub uses 6px)
* **Standard Cards**: `6px` (or `--radius: 0.375rem`). Cards, buttons, panels.
* **Pills / Circles**: `9999px`. Badges, avatar circles.

---

# Part 3: Visual Styling and Layout Rules

## Design Principles
* **Visual Language**: High precision development tool. Minimal chrome. Content and code take center stage. 
* **Layout Structure**: Predictable hierarchy: sidebar navigation on the left, top header with breadcrumbs, main content area with consistent padding.
* **Empty State Rules**: Every empty state must display a custom SVG illustration (created in code), a clear heading, a supporting description, and a primary action button. No emojis.
* **Prohibited Layout Styles**: No glassmorphism. No neon glow effects. No emojis anywhere in the UI. No stock photos.

## Layout and Grid
* **Whitespace Philosophy**: Functional whitespace. Use consistent spacing tokens.

## Standard Motion Rules
* **Timing**: 150ms for micro interactions (hover, focus), 250ms for element transitions (expand, collapse).
* **Easing**: Use `cubic-bezier(0.4, 0, 0.2, 1)` for standard transitions.
* **Properties**: Only animate `transform` and `opacity`.
* **Prohibition**: GSAP and heavy scroll-jacking are strictly forbidden. Use standard CSS transitions and lightweight Framer Motion variants.

---

# Part 4: UI Component Registry (shadcn/ui mapping)

All components should be built using shadcn/ui primitives to ensure consistency with these tokens.

## Buttons (shadcn/ui `Button`)
* **`default`**: Background `primary` (Amber), text dark `#000`, rounded 6px.
* **`secondary`**: Background `secondary`, text `secondary-foreground`.
* **`destructive`**: Background `destructive`, text `destructive-foreground`.
* **`ghost`**: Transparent background, text `muted-foreground`, hover text `foreground`.

## Cards (shadcn/ui `Card`)
* **`primary-card`**: Background `card`, border 1px `border`, rounded 6px, padding `LG` (24px). Flat aesthetic, no shadow.

## Inputs (shadcn/ui `Input`)
* **`text-input`**: Background `background`, border 1px `border`, rounded 6px. Focus ring uses `primary` color.

## Code Blocks
* **`code-block`**: Background `#0D1117`, border 1px `border`, rounded 6px, padding `MD` (16px), font JetBrains Mono 13px.

## Severity Badges (shadcn/ui `Badge`)
* **`badge-critical`**: Background `destructive` at 15%, text `destructive`.
* **`badge-warning`**: Background `warning` at 15%, text `warning`.
* **`badge-info`**: Background `primary` at 15%, text `primary`.

---

# Part 5: Responsive Behavior and Breakpoints

## Breakpoints Matrix
* **Desktop XL (1440px+)**: Full sidebar, maximum content width, all columns visible.
* **Desktop (1024px to 1439px)**: Sidebar visible, content adapts to narrower width.
* **Tablet (768px to 1023px)**: Sidebar collapses to icon only or overlay.
* **Mobile (below 768px)**: Full bleed containers, touch targets strictly 44px minimum. Sidebar becomes a drawer. Single column layout.
