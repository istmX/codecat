---
name: istm-craft
allowed-tools: Bash, Read, Grep, Glob, Write, Edit, Agent, AskUserQuestion
description: "Run /istm-craft to design and architect a new feature. It strictly reads the global .istm-context/ blueprints and generates a detailed build spec in .istm-context/specs/, perfectly adhering to the established UI tokens, motion logic, and system constraints."
---

## What this skill does

This is the Day-to-Day Feature Architect. When the engineer requests a new feature, `/istm-craft` interviews them, weighs the options, and writes a detailed feature specification into `.istm-context/specs/`. 

Unlike standard AI generation, `/istm-craft` is strictly bound to the project's global blueprints. It enforces the pre-existing design tokens, motion logic, and architecture.

## Execution Flow

### Step 1: The Context Lock
Before asking any questions, you MUST silently read the global blueprints to understand the constraints you are working under:
- Read `.istm-context/.istm-context/architecture.md` (for the database, backend, and API constraints).
- Read `.istm-context/.istm-context/design.md` (for typography, color tokens, and the Dual Motion standard).
- Read `.istm-context/project-overview.md` (for business logic context).

### Step 2: The Feature Interview
Ask the engineer targeted questions to design the specific feature.
- INFER what you can from the global blueprints. Do not ask them what database to use if `.istm-context/architecture.md` already specifies PostgreSQL.
- ASK for business requirements, edge cases, and feature-specific data models.
- RECOMMEND the best approach, but let them decide. 

### Step 3: Spec Generation
Write the feature design into a new file: `.istm-context/specs/NNNN-feature-name.md` (e.g., `.istm-context/specs/0001-user-auth.md`).
The spec must include:
- **Summary**: What the feature does.
- **Requirements**: Acceptance criteria.
- **Data Model**: Any new tables or schemas.
- **UI & Motion**: Exactly how it implements the design tokens from `.istm-context/.istm-context/design.md`. Hallucinated hex codes or unapproved UI libraries are strictly forbidden.
- **Build Plan**: The step-by-step implementation guide.

### Step 4: Completion
Do not write application code. Once the spec is written, instruct the user to run `/develop` (or equivalent) to begin the implementation phase based on your spec.
