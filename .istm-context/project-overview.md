# CodeCat Project Overview

## Product Name

CodeCat

---

# Vision

CodeCat is an AI powered code review platform that uses specialized AI reviewers (not a single general purpose model) to analyze pull requests across multiple quality dimensions: architecture, security, performance, accessibility, maintainability, and more.

Instead of one AI reviewer that tries to do everything, CodeCat coordinates a team of specialist reviewers, each focused on a specific quality dimension. The result is deeper, more actionable code reviews that developers trust and actually use.

CodeCat integrates directly with GitHub. It reads pull request diffs, runs the specialist reviewers, and posts structured review comments back to the PR, similar to how CodeRabbit works but with the added depth of specialized analysis.

---

# Problem Statement

AI code review today is shallow and generic. Developers get surface level feedback that misses critical issues.

Examples:
- Generic AI reviewers produce vague comments like "consider refactoring" without specific guidance
- Security vulnerabilities in pull requests go undetected because the reviewer lacks deep security knowledge
- Performance regressions slip through because the AI cannot reason about runtime characteristics
- Accessibility violations are missed entirely because most reviewers do not check for them

Developers need review feedback they can trust. That means deep, specialized analysis, not broad shallow scanning.

---

# Solution

CodeCat coordinates multiple specialist AI reviewers to produce thorough, structured code reviews.

A review result contains:
- An executive summary with overall quality score
- Categorized findings grouped by review dimension (architecture, security, performance, etc.)
- Severity classification for each issue (critical, warning, suggestion, info)
- File and line references pointing to exact code locations
- Suggested improvements with optional corrected code snippets

The output is posted back to GitHub as structured PR comments so developers never leave their workflow.

---

# Target Audience

Primary Users:
- Individual developers who want deeper AI review on their PRs
- Small engineering teams looking for automated code quality checks
- Open source maintainers reviewing community contributions
- Tech leads who want consistent review standards across a team

Secondary Users:
- Engineering managers tracking code quality trends
- DevOps engineers integrating review into CI/CD pipelines
- Security engineers looking for automated vulnerability scanning

---

# Core User Journey

User signs in with GitHub
       ↓
Connects one or more repositories from their GitHub account
       ↓
Selects a pull request (or compare view) to review
       ↓
CodeCat fetches the diff and runs all specialist AI reviewers
       ↓
User views the structured review results with severity, explanations, and suggestions
       ↓
CodeCat posts review comments back to the GitHub PR

---

# Secondary User Journey

User opens the dashboard
       ↓
Browses previously reviewed PRs and repositories
       ↓
Searches or filters reviews by repository, date, or severity
       ↓
Re-runs a review on an updated PR to see if issues were resolved

---

# Primary Screens

1. Landing / Sign In
2. Repository Explorer
3. Pull Request Dashboard
4. Review Runner
5. Review Results
6. Diff Viewer
7. Review History
8. Settings

---

# Landing / Sign In Screen Details

Purpose:
The entry point. Clean, minimal. One clear call to action: sign in with GitHub.

Contains:
- CodeCat logo and tagline (custom SVG cat icon)
- Brief value proposition (one sentence)
- "Sign in with GitHub" button
- No unnecessary marketing copy. Developers appreciate brevity.

---

# Repository Explorer Screen Details

Purpose:
Let the user connect and browse their GitHub repositories.

Examples:
- List of connected repositories with name, description, language, and last activity
- Search and filter by repository name or language
- Connect new repositories from their GitHub account

Each repository card should feel like a GitHub repository entry: compact, scannable, informative.

---

# Pull Request Dashboard Screen Details

Purpose:
Show open pull requests for a selected repository. Let the user pick one to review.

Contains:
- Repository name and metadata header
- List of open PRs with title, author, branch info, and status
- Quick action to start a review on any PR
- Filter by PR status (open, closed, merged)

This is the most critical interaction view.

---

# Review Results Screen Details

Purpose:
Display the structured AI review output for a specific PR.

The layout should feel like a professional code review report.
Not a generic database table.

Contains:
- Executive summary with overall quality score
- Category breakdown (architecture, security, performance, etc.) with issue counts
- Individual findings with severity badge, file reference, explanation, and suggestion
- Expandable code snippets showing the suggested improvement
- Action to post results back to GitHub

---

# Diff Viewer Screen Details

Contains:
- Syntax highlighted side by side or unified diff view
- Inline review comments overlaid on the relevant lines
- File tree navigation for multi file diffs
- Severity indicators on changed lines
- Collapse and expand controls for large diffs

---

# Empty State Philosophy

Empty states are opportunities.
They should feel:
- friendly
- motivating
- warm

Every empty state uses a custom SVG illustration (created in code), clean typography, a semantic Lucide icon, and a clear primary call to action button. No emojis. No placeholder images. No generic "nothing here" messages.

---

# Future Features

Not MVP:
- Webhook based automatic reviews on PR open
- Team management and shared repositories
- Review quality trends and analytics over time
- Custom review rule configuration per repository
- Integration with GitLab and Bitbucket

These features are intentionally excluded from the initial build.

---

# Success Metric

The app succeeds when users can answer:
"Did CodeCat find real issues that I would have missed in my own review?"
without guessing.

---

# Progress Tracker Log

## 2026-08-02

### Completed

- Read the project instructions and context documents before implementation.
- Hydrated all 4 Pillar blueprint files with project specific context.
- (AI will dynamically log tasks here)

### Verification

- (AI will dynamically log verifications here)

### Notes

- MVP scope: Auth, connect repos, select PR, run AI review, view results, post to GitHub.
- Dashboard and history features are Phase 2.
