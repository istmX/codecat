# 0001: Interactive CodeCat Mascot

## Summary
The CodeCat mascot is being split into two distinct components. The standard static `CodeCatLogo` will remain as the global branding icon (used in the sidebar and sign-in page). A new `InteractiveMascot` component will be introduced specifically for the Dashboard. This interactive version will sit atop the main "Repositories" card, acting as an encouraging guide. When hovered, it will display a speech bubble with helpful, developer-centric quotes and ideas.

## Requirements
- **AC-1:** The standard `CodeCatLogo` remains available for global use and is purely visual branding.
- **AC-2:** A new `InteractiveMascot` component is created for use on the Dashboard.
- **AC-3:** The `InteractiveMascot` sits on top of or seamlessly integrates into the header area of the main "Repositories" card.
- **AC-4:** Hovering over the `InteractiveMascot` triggers a speech bubble containing a randomized, encouraging quote (e.g., "Looks like a great day to refactor some legacy code!").
- **AC-5:** The quotes array should contain at least 5-10 encouraging, developer-focused messages.
- **AC-6:** The animation must respect `.istm-context/design.md` constraints (no heavy GSAP), utilizing Framer Motion for smooth, high-quality transitions (e.g., floating, speech bubble fade-in/pop).

## Data Model
No new database tables are required. 
- A static constant array of strings `MASCOT_QUOTES` will be added to `src/lib/utils/constants.ts` or kept local to the component.

## UI & Motion
- **Aesthetic:** Inherits the geometric, sleek cyber-cat SVG design created for the main logo.
- **Speech Bubble:** 
  - Background: `bg-card` (`#161B22`) or `bg-accent`.
  - Border: 1px `border-border` (`#30363D`).
  - Text: `text-foreground` (`#E6EDF3`), 13px or 14px size (`text-sm`).
  - Accent: A subtle `primary` (`#F59E0B`) glow or border highlight on hover.
- **Motion (Framer Motion):**
  - **Idle State:** The cat should have a very subtle, slow floating effect (Y-axis translation ±2px over 3 seconds, `ease-in-out`).
  - **Hover State:** The speech bubble enters with a slight scale-up (`scale: 0.95` to `1`) and fade-in (`opacity: 0` to `1`) using the standard 250ms transition (`cubic-bezier(0.4, 0, 0.2, 1)`).
  - The cat itself might subtly react on hover (e.g., eyes glowing brighter or a slight scale up).

## Build Plan
1. **Prepare Quotes Data:**
   - Create an array of encouraging quotes (e.g., in the component file or a constants file).
2. **Build `InteractiveMascot` Component:**
   - Create `src/components/shared/interactive-mascot.tsx`.
   - Import the base `CodeCatLogo` or copy the SVG to allow for internal part animation (like the eyes).
   - Wrap the component in Framer Motion's `<motion.div>` for the idle floating animation.
3. **Implement the Speech Bubble:**
   - Use a state variable (`isHovered`) or Framer Motion's `whileHover` to trigger the speech bubble.
   - Design the speech bubble using Tailwind classes corresponding to the design system tokens (`bg-card`, `border`, `text-sm`, `rounded-md`, `p-3`, `shadow-lg`).
4. **Integrate into the Dashboard:**
   - Open `src/app/dashboard/page.tsx`.
   - Import and place the `InteractiveMascot` right above or integrated into the top of the Repositories layout section.
5. **Verify Aesthetics:**
   - Ensure the interaction feels premium, responsive, and adheres to the dark mode/amber accent theme without feeling cartoonish or overwhelming.
