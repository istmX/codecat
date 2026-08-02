# Spec: Landing Page Expansion (High-Conviction Conversion)

## Summary
Expand the landing page to maximize user conviction and conversion rates. We are adding four new strategic sections to tell a complete, compelling story about why manual code review fails and how CodeCat's matrix of AI agents solves it. We are also updating the pricing section to abstract away underlying AI provider names.

## Requirements
- **Re-word Pricing**: Update `PricingSection` to remove "Mistral/Gemini" and "Groq".
  - Free tier: "Standard AI Intelligence"
  - Pro tier: "Premium Reasoning Engines"
- **New Section: The Cost of Bad Code**
  - Problem statement highlighting why manual review fails (fatigue, shallow scans).
  - High-contrast visual design, potentially with a red/amber hue to indicate danger/cost.
- **New Section: Meet the Agents**
  - Detailed showcase of the Security, Performance, and Architecture agents.
  - Interactive or visually distinct cards for each agent outlining their specific focus areas.
- **New Section: ROI & Metrics**
  - Big bold numbers highlighting the value (e.g., "Save 10 hours a week", "10x faster PR cycles").
- **New Section: FAQ**
  - Accordion style FAQ addressing common objections (Security, Privacy, Integration, etc.).

## UI & Motion
- All new sections must adhere to `.istm-context/design.md`.
- Typography: Inter for headings/body, JetBrains Mono for code or technical badges.
- Backgrounds: Use `bg-background` and `bg-card` for layering.
- Motion: Use `whileInView` for scroll-triggered reveal animations. Keep transitions subtle (150-250ms).
- FAQ should use `shadcn/ui` Accordion primitive (or built using Framer Motion if primitive is not available).

## Build Plan
1. **Update PricingSection**:
   - Replace model names in `src/components/landing/pricing-section.tsx`.
2. **Create New Components**:
   - `src/components/landing/problem-statement.tsx` (Cost of Bad Code)
   - `src/components/landing/meet-agents.tsx` (Showcase)
   - `src/components/landing/roi-metrics.tsx` (Stats)
   - `src/components/landing/faq-section.tsx` (FAQ)
3. **Integrate into Page**:
   - Add the new components into `src/app/page.tsx` in a logical narrative order:
     - Hero
     - Integration Cloud
     - **Problem Statement**
     - How It Works
     - **Meet the Agents**
     - **ROI & Metrics**
     - Testimonials
     - Pricing
     - **FAQ**
     - Footer

Run `/develop landing page expansion` to execute this spec.
