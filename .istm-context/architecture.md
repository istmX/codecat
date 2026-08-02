# Architecture

## Architecture Goals

The architecture should be:
- maintainable
- understandable
- scalable according to project constraints
- type safe from database to UI boundary
- optimized for server first rendering with selective client interactivity

Avoid unnecessary complexity.

---

# System Overview

```
User (Browser)
    │
    ▼
Next.js App Router (Server Components + Server Actions)
    │
    ├── Auth.js ──► GitHub OAuth
    │
    ├── Prisma ORM ──► Neon PostgreSQL
    │
    ├── GitHub REST/GraphQL API ──► Repos, PRs, Diffs, Comments
    │
    └── AI Review Engine
          ├── Groq (primary)
          ├── Mistral (fallback 1)
          └── Gemini Free (fallback 2)
```

Data Flow:
1. User authenticates via GitHub OAuth (Auth.js).
2. App fetches repositories via GitHub API using the user's access token.
3. User selects a PR. App fetches the diff via GitHub API.
4. Server Action sends the diff to the AI Review Engine.
5. The engine runs specialist reviewers sequentially (architecture, security, performance, etc.).
6. Each reviewer uses the AI SDK with automatic provider fallback (Groq then Mistral then Gemini).
7. Results are aggregated into a structured review object and stored in Neon PostgreSQL via Prisma.
8. Results are rendered in the UI.
9. Optionally, results are posted back to GitHub as PR review comments.

---

# Tech Stack

## Frontend
- Framework: Next.js 16 (App Router, React Server Components)
- UI Library: React 19
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS v4
- Component Library: shadcn/ui
- Animation: Framer Motion
- Data Fetching (client): TanStack Query v5
- Forms: React Hook Form + Zod validation
- Icons: Lucide React

## Backend / API
- Framework: Next.js 16 Server Actions and Route Handlers
- Database: Neon PostgreSQL (serverless)
- ORM: Prisma
- Authentication: Auth.js v5 (GitHub OAuth provider)
- AI: AI SDK (Vercel) with Groq, Mistral, and Gemini providers

## Infrastructure
- Hosting: Vercel
- Deployment: Git push to main triggers automatic deploy via Vercel

---

# Folder Structure

```
src/
  app/
    (auth)/
      sign-in/
        page.tsx
    (dashboard)/
      layout.tsx
      page.tsx
      repositories/
        page.tsx
        [owner]/
          [repo]/
            page.tsx
            pulls/
              page.tsx
              [number]/
                page.tsx
                review/
                  page.tsx
    api/
      auth/
        [...nextauth]/
          route.ts
    layout.tsx
    page.tsx
    globals.css
  components/
    ui/                    # shadcn/ui primitives
    layout/                # shell, sidebar, header
    shared/                # reusable app components
  features/
    auth/
      components/
      actions/
      lib/
      types/
    repositories/
      components/
      actions/
      lib/
      types/
    pull-requests/
      components/
      actions/
      lib/
      types/
    reviews/
      components/
      actions/
      lib/
      types/
    diff-viewer/
      components/
      lib/
      types/
  lib/
    ai/
      providers.ts         # AI SDK provider config with fallback
      reviewers/            # specialist reviewer prompts
      engine.ts             # orchestrator that runs all reviewers
    github/
      client.ts             # GitHub API client (REST + GraphQL)
      types.ts
    db/
      prisma.ts             # Prisma client singleton
    utils/
      cn.ts                 # className merge utility
      constants.ts
  types/
    index.ts               # shared global types
  prisma/
    schema.prisma
    migrations/
```

Each feature module owns its own components, server actions, library code, and types. Only truly reusable components belong in `components/shared/`.

---

# State Management Rules

Use React Server Components for data that can be fetched on the server. Use TanStack Query for client side data that needs caching, refetching, or optimistic updates. Use React state (useState, useReducer) for local component state.

Do NOT use a global state manager (Zustand, Redux, Jotai). This project does not need one. Server Components plus TanStack Query cover all data fetching and caching needs. Local state covers UI interactions.

Keep state local whenever possible. Lift state only when a parent needs it.

---

# Data Fetching and Caching

Use Next.js Server Components with `fetch` and the built in caching layer for server side data. Use TanStack Query on the client for interactive data that needs polling, refetching, or cache invalidation (e.g., review status updates).

Use Server Actions for mutations (starting a review, connecting a repo, posting comments to GitHub).

Do not misuse UI state managers for server state patterns.

---

# Authentication

Provider: Auth.js v5

Methods:
- GitHub OAuth (primary and only provider)

Required scopes:
- `read:user` (user profile)
- `repo` (read and write access to repositories, PRs, and comments)

Authentication state is managed entirely by Auth.js. The session is accessed via `auth()` on the server and `useSession()` on the client. Authentication state must remain isolated from general application state.

The GitHub access token from the OAuth flow is stored in the Auth.js session and used for all GitHub API calls.

---

# Database Schema (Prisma)

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  image         String?
  githubId      String    @unique
  accessToken   String
  accounts      Account[]
  sessions      Session[]
  repositories  Repository[]
  reviews       Review[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Repository {
  id          String   @id @default(cuid())
  githubId    Int      @unique
  name        String
  fullName    String
  owner       String
  description String?
  language    String?
  isPrivate   Boolean  @default(false)
  url         String
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  reviews     Review[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Review {
  id             String         @id @default(cuid())
  pullNumber     Int
  pullTitle      String
  pullUrl        String
  branch         String
  baseBranch     String
  overallScore   Float?
  summary        String?
  status         ReviewStatus   @default(PENDING)
  providerUsed   String?
  userId         String
  user           User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  repositoryId   String
  repository     Repository     @relation(fields: [repositoryId], references: [id], onDelete: Cascade)
  findings       Finding[]
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt
}

model Finding {
  id             String          @id @default(cuid())
  category       ReviewCategory
  severity       Severity
  title          String
  description    String
  filePath       String?
  lineStart      Int?
  lineEnd        Int?
  suggestion     String?
  codeSnippet    String?
  reviewId       String
  review         Review          @relation(fields: [reviewId], references: [id], onDelete: Cascade)
  createdAt      DateTime        @default(now())
}

enum ReviewStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
}

enum ReviewCategory {
  ARCHITECTURE
  CODE_QUALITY
  PERFORMANCE
  SECURITY
  ACCESSIBILITY
  MAINTAINABILITY
  BEST_PRACTICES
  TESTING
  DOCUMENTATION
}

enum Severity {
  CRITICAL
  WARNING
  SUGGESTION
  INFO
}
```

---

# Core Workflows

## Workflow 1: Run AI Review on a Pull Request

1. User navigates to a repository and selects a PR.
2. Server Action `startReview` is called.
3. The action creates a `Review` record with status `PENDING`.
4. It fetches the PR diff from GitHub API.
5. It passes the diff to the AI Review Engine.
6. The engine iterates through each specialist reviewer (architecture, security, etc.).
7. Each reviewer calls the AI SDK with automatic provider fallback (Groq, then Mistral, then Gemini).
8. Each reviewer returns structured findings (category, severity, file, line, description, suggestion).
9. All findings are stored as `Finding` records linked to the `Review`.
10. The review status is updated to `COMPLETED` with an overall score and summary.
11. The page revalidates and shows the results.

## Workflow 2: Post Review to GitHub

1. User clicks "Post to GitHub" on a completed review.
2. Server Action `postReviewToGitHub` is called.
3. The action reads all findings for the review.
4. It creates a GitHub PR review using the GitHub API with inline comments mapped to file paths and line numbers.
5. The review is posted as a single PR review (not individual comments) for clean presentation.

---

# AI Review Engine

## Provider Fallback

The AI SDK is configured with three providers in priority order:
1. **Groq** (fast inference, free tier)
2. **Mistral** (reliable, free tier)
3. **Gemini** (Google, free tier)

If a provider call fails (rate limit, timeout, error), the engine automatically retries with the next provider. This is transparent to the user. The provider used is recorded on the `Review` record.

## Specialist Reviewers

Each reviewer has a focused system prompt and evaluates the diff through its specific lens:

| Reviewer | Focus |
|----------|-------|
| Architecture | Module boundaries, coupling, separation of concerns, patterns |
| Code Quality | Readability, naming, complexity, duplication, clean code |
| Performance | Time complexity, memory, unnecessary renders, N+1 queries |
| Security | Injection, auth bypass, secrets exposure, XSS, CSRF |
| Accessibility | ARIA attributes, keyboard navigation, screen reader support |
| Maintainability | Technical debt, test coverage impact, documentation needs |
| Best Practices | Framework conventions, idiomatic code, modern patterns |
| Testing | Test coverage gaps, edge cases, mock quality |
| Documentation | Missing docs, outdated comments, API documentation |

Each reviewer receives the full diff context and returns a JSON array of findings following the `Finding` schema.

---

# Performance Rules

Use:
- React Server Components for all data fetching (zero client JS for read only views)
- Dynamic imports with `next/dynamic` for heavy client components (diff viewer, syntax highlighter)
- Image optimization via `next/image` when applicable
- Prisma query optimization (select only needed fields, use pagination)

Avoid:
- unnecessary re-renders (memoize expensive computations, use React.memo where appropriate)
- unoptimized assets
- fetching data on the client when it can be fetched on the server
- N+1 database queries (use Prisma includes and joins)
- large JavaScript bundles in the initial load

---

# Future Expansion and Scalability

- Webhook listeners: GitHub webhooks to trigger automatic reviews on PR open/update
- Queue system: Move AI review execution to a background job queue (Inngest, Trigger.dev) for better reliability
- Multi provider tenancy: Allow users to bring their own API keys for AI providers
- GitLab and Bitbucket integration: Abstract the VCS layer behind an adapter interface
- Team workspaces: Shared repository access across team members with role based permissions
- Analytics: Review quality trends, common issue categories, resolution rates over time
