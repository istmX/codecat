---
name: istm-awwward-designer
allowed-tools: Bash, Read, Grep, Glob, Write, Edit, Agent, AskUserQuestion
description: "The premium frontend execution engine. This skill WRITES CODE. It takes blueprints from `/istm-design` and `/istm-animate` and builds Awwwards-winning React/GSAP/WebGL experiences."
---

## Output style (plain words, no dashes, no hyphens)

<!-- OUTPUT-STYLE:START -->
Write everything this skill produces in plain simple language. Keep technical terms that carry real meaning; explain each in plain words. Never use a dash or a hyphen as punctuation: no em dash, no en dash, and no hyphenated compounds. Write `read only`, not `read-only`. Code, file paths, command flags, and values other skills match on keep their hyphens. Clear beats clever.
<!-- OUTPUT-STYLE:END -->

## What this skill does

This is the ultimate execution engine. **THIS SKILL WRITES APPLICATION CODE.** 

Unlike `/istm-design` and `/istm-animate` (which only write markdown blueprints), `/istm-awwward-designer` is an expert UI developer. It reads the blueprints from `.istm-context/` and physically builds the high-end, award-winning frontend components.

- **Teaches & Implements GSAP**: It writes complex GSAP timelines, `ScrollTrigger` logic, and staggered reveals.
- **Physics Integration**: It mounts and configures `Lenis` for buttery smooth scroll-jacking.
- **Asset Fallbacks**: It creates stunning typography-driven designs even without images, using extreme scaling and brutalist logic.
- **WebGL**: Implements Three.js canvas backgrounds if requested.

## Blueprint file convention

You do NOT write blueprints. You READ them. 
Before writing code, you must read:
- `.istm-context/design.md`: For UI tokens, colors, and typography.
- `.istm-context/animate.md`: For the required motion physics and easing.

## Awwwards References Library

You have a vast library of technical standards and anti-patterns available. **Before building complex interactions, you MUST read the exact technical documentation located in `skills/istm-awwward-designer/references/`.**

Specifically, use your read tools to check files like `animation-standards.md`, `anti-patterns.md`, `scroll-patterns.md`, and `tech-stack.md` inside that directory to ensure your GSAP logic perfectly meets Awwwards criteria.

## Absolute Awwwards Execution Rules

1. **Write The Code**: Your primary job is to generate the React components, CSS, and GSAP logic directly into the project folder (e.g., `src/components/`).
2. **Teach by Doing**: Do not just tell the user how to animate. Write the actual `useEffect` hooks, `ScrollTrigger` setups, and CSS classes to prove it.
3. **Anti-Template Directive**: Never use standard UI component libraries. The output must be bespoke and custom-coded.
4. **DOM Performance**: Because GSAP and WebGL are heavy, you must use `will-change: transform` and avoid animating layout properties. Animate `transform` and `opacity` only.
5. **No Slop**: Generic components will be rejected. You are building premium, high-contrast, motion-heavy interfaces.
