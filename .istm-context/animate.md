# CodeCat Animation Blueprint

**Status**: Active
**Date**: 2026-08-02
**Library**: Framer Motion (already installed and in use)

## Motion Vibe
**Elastic and Playful**: The application should feel alive, responsive, and slightly bouncy. Elements don't just appear; they snap into place with satisfying spring physics. 

## Easing Variables & Physics Configs
All interactive components and mounting animations MUST use these explicit physics configurations. Never use generic `ease-in-out` or linear tweens for structural animations.

- **Primary Spring (The Bouncy Default)**
  - Use for: Modals, dropdowns, cards entering the viewport, hero text.
  - Config: `{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }`
- **Subtle Spring (Less dramatic)**
  - Use for: Hover states, micro-interactions, badge reveals.
  - Config: `{ type: "spring", stiffness: 400, damping: 25, mass: 1 }`
- **Float/Drift (Smooth continuous motion)**
  - Use for: Background elements, ambient glows.
  - Config: `{ ease: "easeInOut" }` (Only permitted for infinite looping ambient animations)

## Choreographies

### 1. Page Load (Hero Section)
- **Trigger**: Mount
- **Sequence**:
  1. Logo drops in from top with Primary Spring and slight rotation (`rotate: [-20, 0]`).
  2. H1 Text scales up from `0.8` to `1` with Primary Spring.
  3. Subtitle and CTA buttons stagger in from bottom (`y: 40`) with Primary Spring, delayed by `0.2s` increments.

### 2. Scroll-Triggered Reveals (Features, How it Works, Pricing)
- **Strategy**: Animations play ONCE normally when the element enters the viewport. No complex scrubbing or scroll-jacking.
- **Trigger**: `whileInView` with `viewport={{ once: true, margin: "-100px" }}`
- **Animation**: 
  - Elements start at `y: 60, opacity: 0, scale: 0.95`.
  - Animate to `y: 0, opacity: 1, scale: 1` using the Primary Spring config.
  - Use `staggerChildren: 0.15` for groups of elements (like pricing cards or feature steps).

### 3. Interactive Navbar (The "Smart Header")
- **Behavior**: Hidden navbar that slides down when scrolling up.
- **Logic**:
  - Track `scrollY` using `useScroll` from Framer Motion.
  - Determine scroll direction using `useMotionValueEvent`.
  - State: If scrolling down and past 100px, `y = -100%` (hidden). If scrolling up, `y = 0` (visible).
  - **Animation**: `{ type: "spring", stiffness: 350, damping: 25 }` (snappy but slight bounce on reveal).

## Absolute Motion Enforcement Rules
1. **Hardware Acceleration**: Only animate `transform` (translate, scale, rotate) and `opacity`. NEVER animate `width`, `height`, `top`, `left`, `margin`, or `padding` to prevent layout thrashing.
2. **Cleanup**: Any component that sets up custom scroll listeners or intervals must explicitly tear them down on unmount.
3. **No Scroll-Jacking**: Avoid locking the user's scroll position or hijacking the native scrollbar.

## Next Steps for Implementation
To implement these animations and the new interactive navbar, a developer should run `/develop` to update the application code according to this blueprint.
