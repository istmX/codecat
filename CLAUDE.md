# CodeCat — AI Agent Working Instructions

This document defines how AI coding agents should understand, architect, and implement CodeCat.

Everything written here is considered project context.

Never ignore these rules.

---

# Project Overview

CodeCat is an AI powered code review platform that coordinates multiple specialist AI reviewers to analyze pull requests. It integrates with GitHub to fetch diffs and post structured review comments back to PRs. Each reviewer focuses on a specific quality dimension (architecture, security, performance, accessibility, etc.) producing deeper, more actionable feedback than a single general purpose AI reviewer.

Instead of repeatedly explaining the project to different AI tools, this document serves as the single source of truth that any AI coding assistant can read and immediately understand.

The goal is consistency. Every AI coding assistant should understand the project exactly the same way.

---

# Core Product Principles

The product should always feel:
- Professional
- Developer first
- Minimal
- Premium
- Fast
- Predictable
- Structured

Never make the application feel like a generic AI chatbot. Everything should feel like a professional development workspace, closer to Linear, GitHub, Vercel, and Raycast.

---

# Primary User Flow

User signs in with GitHub
↓
Connects repositories from their GitHub account
↓
Selects a pull request to review
↓
CodeCat fetches the diff and runs specialist AI reviewers
↓
User views structured review results with severity, explanations, and suggestions
↓
Review comments are posted back to the GitHub PR

---

# Tech Stack

- **Framework**: Next.js 16 (App Router, React Server Components)
- **UI**: React 19, TypeScript (strict), Tailwind CSS v4, shadcn/ui
- **Animation**: Framer Motion (subtle, purposeful micro interactions only)
- **Data Fetching**: TanStack Query v5 (client), Server Components (server)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React (no emojis, ever)
- **Auth**: Auth.js v5 (GitHub OAuth)
- **Database**: Neon PostgreSQL (serverless)
- **ORM**: Prisma
- **AI**: AI SDK with provider fallback: Groq then Mistral then Gemini Free
- **Hosting**: Vercel

---

# Development Principles

Always prefer:
- Maintainability
- Scalability
- Readability
- Reusability
- Type safety (strict TypeScript, Zod validation at boundaries)
- Predictable architecture

Never write code only because it works. Write code that another engineer can immediately understand.

---

# Server First Rules

- Use React Server Components for all data fetching and read only views.
- Use Server Actions for all mutations (no unnecessary API routes).
- Only add `"use client"` when a component genuinely needs browser APIs, event handlers, or hooks like useState/useEffect.
- Prefer `fetch` with Next.js caching on the server. Use TanStack Query on the client only for interactive data.

---

# Frontend Layout and Text Wrapping Safety

Before adding or changing frontend UI, verify the rendered parent width and alignment at desktop and mobile sizes.

- Do not make a flex or grid text wrapper shrink to fit accidentally. A content row that owns a full width child should explicitly use `w-full min-w-0` when appropriate.
- Do not use `overflow-wrap: anywhere` for normal prose. It can reduce intrinsic width and cause a parent to collapse, producing one word or one character lines.
- Do not use display or tall fonts for body copy. Use Inter for everything. Only use JetBrains Mono for code.
- Do not hardcode UI surface, text, border, or semantic state colors in components. Use the semantic tokens defined in `design.md`.
- Use Inter for body copy, headings, buttons, forms, and navigation. Use JetBrains Mono only for code blocks, file paths, and terminal output.

---

# Design Token Enforcement

All colors, spacing, typography, radius, and shadow values MUST come from the design tokens in `.istm-context/design.md`. Never hallucinate hex codes or invent spacing values.

Key tokens:
- Canvas background: `#0F172A`
- Surface: `#1E293B`
- Primary: `#6366F1`
- Text primary: `#F8FAFC`
- Text secondary: `#94A3B8`
- Border: `#334155`
- Font: Inter (body), JetBrains Mono (code)
- Spacing: 8px grid (4, 8, 16, 24, 32, 48, 64)
- Radius: 4px (inputs), 8px (cards, buttons), 9999px (badges)
- Motion: 150ms (micro), 250ms (transitions), 400ms (page)

---

# Empty State and Iconography Rules

- Never use emojis in the UI or empty states.
- Always use Lucide React icons for semantic iconography.
- Create custom SVG illustrations in code for key empty states (e.g., a cat silhouette for CodeCat branding).
- Empty states must include: a semantic icon or custom SVG, a clear heading, a supporting description, and a primary action button.
- Do NOT use placeholder images, stock photos, or external image files.

---

# Planning Before Coding

Never immediately start implementing. Before writing code:

1. Understand the feature.
2. Understand dependencies.
3. Break the feature into small tasks.
4. Explain the implementation plan.
5. Ask questions if information is missing.
6. Only then begin implementation.

Never guess requirements. If anything is unclear, ask.

---

# Feature Development Process

Every feature should follow this workflow:

Understand
↓
Plan
↓
Break into tasks
↓
Implement task by task
↓
Verify
↓
Refactor
↓
Update progress.md

Never implement multiple unrelated features together.

---

# Mandatory Legacy Code Purge

Whenever an AI agent modifies, refactors, or replaces a feature, prompt, or function, it MUST scan the full codebase and permanently remove all dead or legacy code, unused variables, outdated prompt templates, and old fallback logic associated with that feature across all files.

---

# Folder Structure

Use Feature Based Architecture. Never place business logic inside pages.

```
src/
  app/                     # Next.js App Router pages (thin routing layers)
  components/
    ui/                    # shadcn/ui primitives
    layout/                # shell, sidebar, header
    shared/                # reusable app components (badges, score displays, etc.)
  features/
    auth/                  # authentication feature module
      components/
      actions/
      lib/
      types/
    repositories/          # repository connection and browsing
      components/
      actions/
      lib/
      types/
    pull-requests/         # PR listing and selection
      components/
      actions/
      lib/
      types/
    reviews/               # AI review execution and display
      components/
      actions/
      lib/
      types/
    diff-viewer/           # syntax highlighted diff rendering
      components/
      lib/
      types/
  lib/
    ai/                    # AI SDK providers, specialist reviewers, engine
    github/                # GitHub API client (REST + GraphQL)
    db/                    # Prisma client singleton
    utils/                 # cn(), constants, helpers
  types/                   # shared global types
  prisma/                  # schema and migrations
```

Every feature owns its own API, hooks, components, and types. Only truly reusable components belong inside `components/shared/`.

---

# Pages

Pages should remain extremely small. Pages only render feature components. No business logic inside pages. No API calls inside pages. No state management inside pages. Pages are routing layers only.

---

# Component Rules

Keep components focused. One responsibility. If a component grows too much, split it. Avoid giant files. Prefer composition over complexity.

---

# File Length

No source file should exceed approximately 250 lines whenever reasonably possible. If a file becomes too large, split it and extract logic.

---

# State Management

- Server Components for server data (primary approach).
- TanStack Query for client side data that needs caching and refetching.
- React state (useState, useReducer) for local UI state.
- No global state manager (no Zustand, Redux, Jotai). Not needed for this project.

Keep state local whenever possible. Lift state only when required.

---

# AI Provider Fallback

The AI Review Engine uses the AI SDK with this fallback chain:
1. **Groq** (primary, fast inference)
2. **Mistral** (fallback 1)
3. **Gemini Free** (fallback 2)

If a provider fails, exceeds its rate limit, or times out, automatically retry with the next provider. Record which provider was used on the Review record. This must be transparent to the user.

---

# Constants and Styling Rules

Never hardcode values. Create constants for routes, labels, limits, validation, and animations.
Never hardcode colors, spacing, typography, border radius, or shadows. Always use values defined in the project's design system (`.istm-context/design.md`).

---

# Progress and Error Memory Tracking

Two critical memory tracking files exist in the project:

1. `progress.md`: Tracks completed tasks, feature statuses, and pending deliverables.
2. `error-memory.md`: Tracks system architecture bugs, root causes, gateway timeouts, and verified fix patterns.

**Mandate for AI Agents**:
- Before making code changes or diagnosing an error, AI agents MUST inspect `error-memory.md` to avoid repeating past architectural bugs.
- After fixing any meaningful bug or error, update both `progress.md` and `error-memory.md` immediately with the symptom, root cause, and verified resolution.

---

# When Stuck

Never invent requirements. Never guess. Stop. Ask questions. Wait for clarification. Then continue.

---

# Definition of Done

A task is complete only when:
- Feature works correctly
- Code follows project architecture
- No hardcoded values
- Components are reusable
- Folder structure is respected
- Pages remain thin
- TypeScript strict mode passes with no errors
- progress.md is updated