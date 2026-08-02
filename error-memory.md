# CodeCat Error Memory

This file tracks architectural bugs, root causes, and verified fix patterns. AI agents MUST read this file before diagnosing errors to avoid repeating past mistakes.

## Format

Each entry follows this structure:

### [Date] — [Short Description]
- **Symptom**: What happened
- **Root Cause**: Why it happened
- **Fix**: What resolved it
- **Prevention**: How to avoid it in the future

---

### 2026-08-02 — Prisma v7 Alpha Driver Adapter Compatibility Error
- **Symptom**: `adapter property can only be provided to PrismaClient constructor when driverAdapters preview feature is enabled.`
- **Root Cause**: Using Neon serverless adapter with Prisma v7 alpha caused compatibility issues; `previewFeatures = ["driverAdapters"]` is required but wasn't set, and `url` inside `datasource db` caused a collision with `prisma.config.ts`.
- **Fix**: Downgraded to Prisma v5 (stable), added `previewFeatures = ["driverAdapters"]` to `schema.prisma`, and removed `prisma.config.ts` (handled via standard `env("DATABASE_URL")`).
- **Prevention**: Stick to stable Prisma releases (v5/v6) when using `@prisma/adapter-neon` unless explicitly instructed otherwise.

### 2026-08-02 — Auth.js PrismaAdapter Validation Errors
- **Symptom**: `Argument githubId is missing` and later `Unknown argument emailVerified`.
- **Root Cause**: The Prisma schema mapped `User` with strictly required custom fields (`githubId`, `accessToken`) and omitted fields the Auth.js default adapter expects (`emailVerified`). Auth.js manages OAuth provider details in the `Account` model, not the `User` model.
- **Fix**: Removed `githubId` and `accessToken` from `User` (they belong in `Account`), and added `emailVerified DateTime?`.
- **Prevention**: Always use the standard Auth.js Prisma schema for the `User`, `Account`, and `Session` models. Do not add provider-specific required fields directly to the `User` model.

### 2026-08-02 — Next.js 15+ Params Promise 404
- **Symptom**: `GitHub API error: 404 Not Found` when fetching `https://api.github.com/repos/undefined/undefined/pulls`.
- **Root Cause**: In Next.js 15+ (App Router), page and layout `params` are `Promise`s. Trying to synchronously access `params.owner` results in `undefined`.
- **Fix**: Changed `params` type to `Promise<{owner: string, repo: string}>` and added `const { owner, repo } = await params;` before using the parameters.
- **Prevention**: Always `await` the `params` prop in Next.js 15+ App Router Server Components before accessing route parameters.
