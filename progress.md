# CodeCat Progress Tracker

## 2026-08-02

### Completed

- Ran /istm-architecture Discovery Gate
- Hydrated all 4 Pillar blueprint files:
  - `.istm-context/agents.md` (AI agent working instructions)
  - `.istm-context/architecture.md` (system design, schema, workflows)
  - `.istm-context/design.md` (design tokens, component registry, layout rules)
  - `.istm-context/project-overview.md` (vision, user journeys, screen inventory)
- Executed Self-Destruct Rule: wrote agents.md to all 6 root harness files
- Created progress.md and error-memory.md tracking files
- Installed project dependencies (shadcn/ui, Prisma, Auth.js, AI SDK, TanStack Query, etc.)
- Initialized Prisma schema and configured Neon PostgreSQL driver
- Set up Auth.js with GitHub OAuth provider configuration (Database persistence fixed)
- Applied comprehensive CodeRabbit x GitHub UI aesthetic via Tailwind v4 and shadcn
- Built Awwwards-style Landing Page and ultra-premium Sign-in Page
- Fixed Next.js Routing conflict (`(dashboard)` renaming)
- Redesigned CodeCat SVG Mascot: ditched the cyber-cat for a fat, dark purple body with retro 3D hacker glasses.
- Built InteractiveMascot with Framer Motion and integrated into Dashboard (draggable, fully bounded to viewport, animated walking legs, interactive hover quotes).
- Added "CodeCat Central" mini-toolbar modal triggered by clicking the roaming mascot.
- Implemented deep Mascot branding (Easter eggs: 'cat' keyboard zoomies, 10-click fish achievement, dynamic quotes).
- Finalized Auth: wired up robust Next.js Server Action Sign Out via form action in UserMenu.
- Designed and built Repository UI Flow: created mock data layer, updated Dashboard with recent repositories, built dedicated `/repositories` list page, and implemented specific `/repositories/[owner]/[repo]` detail page with interactive 'Add CodeCat' CTA button.
- Implemented Repositories Backend Logic: Integrated GitHub REST API to fetch user repos using OAuth `access_token`. Built Next.js Server Actions to connect/disconnect repositories and store them in Prisma Neon PostgreSQL. Replaced all mock data with real database and API connections.
- Fixed GitHub OAuth scope request by forcing `prompt: "consent"` to ensure the `repo` scope is properly requested, handling existing tokens correctly.
- Resolved "Invalid Server Actions request" CSRF error in GitHub Codespaces by configuring `allowedOrigins` in `next.config.ts`.
- Extracted Repositories filter UI to a Client Component (`RepositoryListClient`), fixing Next.js 14+ Server/Client Component boundary typing issues.
- Implemented Pull Request Dashboard (Spec 0002): Fetching live PRs from GitHub API and cross-referencing with local CodeCat DB review status.
- Used `/istm-craft` to architect and write feature spec for `.istm-context/specs/0001-repository-caching.md`.
- Used `/develop` to successfully implement the spec, persisting repository state using TanStack Query.
- Verified dogfood-testing of the open-source `@istmx/skills` Agentic Orchestration Framework (v1.1.0) and confirmed it successfully constrains the LLM to write structured, modular code.
- Unified the Repository Detail Page and Pull Requests Dashboard by implementing spec 0003, auto-syncing repositories and showing CodeCat AI features on the dashboard.
- Integrated GitHub App Authentication and API credentials (`GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`) to post comments as the official CodeCat bot.
- Built GitHub Webhook API route to automatically trigger PR reviews on `pull_request` (`opened`, `synchronize`) events.
- Refactored the Webhook Queue system to pre-check Rate Limits and immediately post warning comments on GitHub if the user is out of credits.
- Fixed unhandled Next.js Server Action errors by returning clean error objects and rendering beautiful, inline Error UI States (e.g. Rate Limit warnings) without breaking the client.
- Implemented Spec 0008: User Profile, Onboarding, and Cat Pay
  - Added `githubAppInstalled` boolean to Prisma `User` model and ran `db push`
  - Built `/setup` onboarding page: forces first-time users to install the GitHub App before accessing the dashboard. Uses the App JWT (`GET /users/{username}/installation`) for reliable verification instead of the user OAuth token
  - Built `/profile` page: shows user avatar, name, email, current plan badge, GitHub App status, and sign-out option
  - Built **Cat Pay**: mock premium checkout UI (card/dummy inputs) that fires a Server Action to upgrade `planTier` to `PRO` in the database, unlocking 100 reviews/day
  - Updated Cat Menu (interactive mascot modal) with a new Navigation section: Dashboard, Repositories, Profile & Billing, and Sign Out with Lucide icons
  - Reverted FREE rate limit from 1 (test value) back to 5
  - Fixed auth guards: added `/profile` and `/setup` to the middleware protected routes list
  - Fixed session ID bug: new pages were reading `session.user.id` (undefined) instead of the custom JWT field `session.userId`
  - Fixed GitHub App install URL to `https://github.com/apps/codecat-ai-reviewer/installations/new`
  - Fixed post-login redirect: after GitHub App verification, user is sent to `/dashboard` not `/`
  - Fixed lucide-react icon compatibility: replaced `Github` and `Plug` (not in v1.28) with valid alternatives
  - Replaced setup page emoji with Lucide icon (project rule: no emojis)
  - Wrote feature spec to `.istm-context/specs/0008-user-profile-and-payments/index.md`
  - Wrote verify steps to `.istm-context/specs/0008-user-profile-and-payments/verify.md`

### Pending

- Deploy to Vercel (required for production webhook delivery from GitHub)
- Implement rate limit counting based on discrete review events (not just `Review` DB rows)
- Add `AbortSignal` timeout and RUNNING review cleanup to the AI engine
- `src/features/billing/` module is new — consider moving `upgradeToPro` and related actions there as billing grows

### Notes

- MVP scope: Auth, connect repos, select PR, run AI review, view results, post to GitHub
- Dashboard and history features are Phase 2
- Single tenant per user (no org level tenancy for MVP)
- No real time streaming for reviews (run all reviewers, show complete result)
- Implemented spec 0005: Merged PRs dashboard section
- Implemented spec 0004: PR Review Runner and Results UI
- Implemented Spec 0006: AI Review Engine (Groq -> Mistral -> Gemini)
- Implemented Spec 0007: Billing and rate limiting (Free Plan limits, files filtering)
- Implemented Spec 0008: User profile, GitHub App onboarding, Cat Pay mock billing
- `session.userId` is the correct field for the DB user ID (set via `token.sub` in the JWT callback in `auth-config.ts`). Never use `session.user.id`.
- Webhooks only work reliably on Vercel. Codespaces ports time out under GitHub's delivery timeout.
