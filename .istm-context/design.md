# CodeCat Design System, Tokens, Layout Rules, and Component Registry

This document is the single source of truth for every interface, interaction, and component. Every design decision should reinforce clarity, consistency, and trust.

---

# Part 1: Core Principles and Golden Rules

## Simplicity
Design should reveal only what the user needs in the current moment. Hide unnecessary complexity, reduce cognitive load, and guide users one decision at a time without sacrificing power.

## Fluidity
Every interaction should feel connected. Elements should transform naturally instead of appearing or disappearing abruptly, helping users always understand where they came from and where they are going.

## Consistency
Users should never have to relearn the interface. Similar actions, layouts, and components should always behave in predictable ways.

## Accessibility
Accessibility is a design requirement, not a feature. Every interface should be usable by as many people as possible regardless of ability or device.

---

## Golden Rules
Every design should:
- Focus on one primary action.
- Reveal complexity progressively.
- Reuse existing components.
- Preserve user context.
- Explain changes through motion.
- Prioritize readability.

---

# Part 2: Design Tokens

Never hardcode colors, spacing, typography, radius values, or shadows. Always use these design tokens:

## Design Personality

The application should feel:
- Precise, like a well tuned development tool
- Calm, with purposeful use of color and whitespace
- Professional, never playful or whimsical
- Fast, with immediate feedback and minimal loading states
- Trustworthy, like a senior engineer reviewing your code

The UI should feel like a refined developer workspace (Linear, GitHub, Vercel, Raycast) rather than a generic software dashboard.

## Colors

### Brand and Accent Colors
* **Primary Accent** (`primary`): `#6366F1` (Indigo 500). Used for primary buttons, active states, links, and focus rings.
* **Secondary Accent** (`secondary`): `#A855F7` (Purple 500). Used sparingly for category badges, review score highlights, and secondary emphasis.
* **Accent** (`accent`): `#EC4899` (Pink 500). Reserved for critical severity badges and destructive confirmations.

### Surface Colors (Dark Theme)
* **Background Canvas** (`bg-canvas`): `#0F172A` (Slate 900). The deepest background layer.
* **Foreground Text** (`text-primary`): `#F8FAFC` (Slate 50). Primary text color.
* **Surface Elevated** (`bg-surface`): `#1E293B` (Slate 800). Cards, panels, sidebars.
* **Surface Raised** (`bg-surface-raised`): `#283548`. Hover states on cards, active sidebar items.
* **Text Secondary** (`text-secondary`): `#94A3B8` (Slate 400). Descriptions, metadata, timestamps.
* **Text Tertiary** (`text-tertiary`): `#64748B` (Slate 500). Placeholder text, disabled labels.
* **Border Line** (`border-default`): `#334155` (Slate 700). Card borders, dividers, input borders.
* **Border Subtle** (`border-subtle`): `#1E293B` (Slate 800). Very light separators.

### Semantic State Colors
* **Danger / Critical** (`semantic-danger`): `#EF4444` (Red 500). Critical severity, errors, destructive actions.
* **Success** (`semantic-success`): `#22C55E` (Green 500). Success states, passing checks.
* **Warning** (`semantic-warning`): `#F59E0B` (Amber 500). Warning severity, caution states.
* **Info** (`semantic-info`): `#3B82F6` (Blue 500). Info severity, informational badges.

### Severity Badge Colors (Review Specific)
* **Critical**: `#EF4444` background at 15% opacity, `#EF4444` text
* **Warning**: `#F59E0B` background at 15% opacity, `#F59E0B` text
* **Suggestion**: `#6366F1` background at 15% opacity, `#6366F1` text
* **Info**: `#3B82F6` background at 15% opacity, `#3B82F6` text

## Typography

### Font Family
* **Primary Font**: Inter (Google Fonts). Used for all body text, headings, buttons, forms, navigation, and UI labels.
* **Fallback Font**: system-ui, sans-serif
* **Monospace Font**: JetBrains Mono (Google Fonts). Used for code snippets, diff viewer, file paths, and terminal output.

### Type Scale
* **Display / Hero** (H1): 36px / 2.25rem, weight 700, line height 1.2, letter spacing -0.025em
* **Page Title** (H2): 24px / 1.5rem, weight 600, line height 1.3, letter spacing -0.02em
* **Section Title** (H3): 20px / 1.25rem, weight 600, line height 1.4
* **Card Title** (H4): 16px / 1rem, weight 600, line height 1.5
* **Body** (p): 14px / 0.875rem, weight 400, line height 1.6
* **Body Small** (small): 13px / 0.8125rem, weight 400, line height 1.5
* **Caption / Meta**: 12px / 0.75rem, weight 500, line height 1.4, `text-secondary` color
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
* **Level 1 (Card)**: `0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)`. Subtle depth for cards on canvas.
* **Level 2 (Floating)**: `0 4px 12px rgba(0, 0, 0, 0.4)`. Dropdowns, popovers, floating panels.
* **Level 3 (Modal)**: `0 12px 40px rgba(0, 0, 0, 0.5)`. Modals, command palettes, dialogs.

## Border Radius
* **Sharp / Strict**: `4px`. Inputs, small tags.
* **Standard Cards**: `8px`. Cards, buttons, panels.
* **Pills / Circles**: `9999px`. Badges, avatar circles, pill buttons.

---

# Part 3: Visual Styling and Layout Rules

These rules define how every screen should be designed. If a UI decision conflicts with this section, these rules win:

## Design Principles
* **Visual Language**: The interface should feel like a high precision development tool. Minimal chrome. Content takes center stage. Visual design should support content instead of competing with it.
* **Layout Structure**: Screens must follow a predictable hierarchy: sidebar navigation on the left (collapsible), top header with breadcrumbs and user controls, main content area with consistent padding.
* **Typography Hierarchy**: Use weight and strict token usage to carry hierarchy on body copy. Tighten line heights on display sizes and keep it generous on body copy.
* **Empty State Rules**: Every empty state must display a custom SVG illustration (created in code), a clear heading, a supporting description, and a primary action button. No emojis. No generic placeholders. Use Lucide icons as supporting elements.
* **Prohibited Layout Styles**: No glassmorphism. No neon glow effects. No gradient backgrounds on surfaces. No rounded blobs or organic shapes. No emojis anywhere in the UI. No stock photos or placeholder images.

## Layout and Grid
* **Whitespace Philosophy**: Generous whitespace signals quality. Never crowd elements. Let content breathe. Use consistent spacing tokens. Padding inside cards uses `LG` (24px). Gaps between sections use `2XL` (48px). Page margins use `XL` (32px) on desktop.

## Motion Rules
* **Timing**: Use 150ms for micro interactions (hover, focus), 250ms for element transitions (expand, collapse), 400ms for page level transitions.
* **Easing**: Use `cubic-bezier(0.4, 0, 0.2, 1)` for standard transitions. Use `cubic-bezier(0, 0, 0.2, 1)` for entries. Use `cubic-bezier(0.4, 0, 1, 1)` for exits.
* **Properties**: Only animate `transform` and `opacity`. Never animate `width`, `height`, `margin`, or `padding` directly.
* **Library**: Use Framer Motion for React component animations. Keep animations subtle and purposeful. No decorative animations that do not communicate state changes.

---

# Part 4: UI Component Registry

Always use these component structures. Duplicate component declarations are not allowed:

## Buttons
* **`button-primary`**: Background `primary` (#6366F1), white text, rounded 8px, height 36px, padding 0 16px, font weight 500, font size 14px.
* **`button-secondary`**: Background transparent, border `border-default`, text `text-primary`, same dimensions as primary.
* **`button-danger`**: Used exclusively for destructive actions. Background `semantic-danger` at 15% opacity, text `semantic-danger`.
* **`button-ghost`**: No background, no border, text `text-secondary`, hover text `text-primary`. Used in toolbars and navigation.

## Cards
* **`primary-card`**: Background `bg-surface`, border 1px `border-default`, rounded 8px, padding `LG` (24px). No shadow by default (flat aesthetic). Hover state adds a subtle border color shift.

## Inputs
* **`text-input`**: Background `bg-surface`, border 1px `border-default`, rounded 4px, height 36px, padding 0 12px, font size 14px. Focus ring uses `primary` at 50% opacity. Placeholder text uses `text-tertiary`.

## Code Blocks
* **`code-block`**: Background `#0D1117` (GitHub dark code background), border 1px `border-default`, rounded 8px, padding `MD` (16px), font JetBrains Mono 13px, line height 1.6. Syntax highlighting via a syntax highlighter library.

## Severity Badges
* **`badge-critical`**: Background `semantic-danger` at 15%, text `semantic-danger`, rounded pill, padding 2px 8px, font size 12px, weight 500.
* **`badge-warning`**: Same structure, `semantic-warning` colors.
* **`badge-suggestion`**: Same structure, `primary` colors.
* **`badge-info`**: Same structure, `semantic-info` colors.

## Layout Containers
* **`screen-container`**: Root layout wrapper. Max width 1280px, centered, padding `XL` (32px) horizontal on desktop, `MD` (16px) on mobile.
* **`sidebar`**: Fixed left panel, width 240px, background `bg-surface`, border right 1px `border-default`. Collapsible on mobile.
* **`page-header`**: Sticky top bar, height 56px, background `bg-canvas`, border bottom 1px `border-default`. Contains breadcrumbs and user menu.

---

# Part 5: Responsive Behavior and Breakpoints

## Breakpoints Matrix
* **Desktop XL (1440px+)**: Full sidebar, maximum content width, all columns visible.
* **Desktop (1024px to 1439px)**: Sidebar visible, content adapts to narrower width.
* **Tablet (768px to 1023px)**: Sidebar collapses to icon only or overlay. Navigation transitions to overlay menus.
* **Mobile (below 768px)**: Full bleed containers, touch targets strictly 44px minimum. Sidebar becomes a drawer. Single column layout.

## Do's and Don'ts
* **DO**: Use the 8px spacing grid for all measurements.
* **DO**: Test every component at all breakpoints before shipping.
* **DON'T**: Use `overflow-wrap: anywhere` for body text. It causes layout collapse.
* **DON'T**: Use display or decorative fonts for body copy. Only Inter for all UI text.
* **DON'T**: Hardcode any color, spacing, or radius value. Always reference design tokens.
