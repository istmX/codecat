# 0006: AI Review Engine

**Status**: Draft

## Summary
The core of CodeCat is its specialist AI Review Engine. When a user clicks "Run CodeCat Review", we need to orchestrate multiple specialized AI prompts (Architecture, Security, Performance) against the PR's diff, aggregate the findings, and save them to the database. We will use the Vercel AI SDK with a provider fallback chain (Groq -> Mistral -> Gemini) to ensure reliability and speed.

## Requirements
- **Diff Fetching**: Fetch the raw `.diff` or `.patch` of the PR from GitHub.
- **Provider Fallback**:
  1. **Groq** (Fastest inference, primary)
  2. **Mistral** (Fallback 1)
  3. **Gemini** (Fallback 2, free tier)
- **Specialist Reviewers**:
  - Instead of one massive prompt, we run 3 concurrent prompts on the diff:
    1. *Security Expert*: Focuses strictly on vulnerabilities, hardcoded secrets, injection risks.
    2. *Performance Expert*: Focuses on big O complexity, unnecessary renders, N+1 queries.
    3. *Architecture Expert*: Focuses on DRY, SOLID principles, type safety, modularity.
- **Structured Output**: Use the AI SDK's `generateObject` with Zod schemas to ensure we get structured `Finding` objects back, not raw markdown strings.
- **Database Persistence**: Save the aggregated `Findings` to the Prisma database, calculate an `overallScore`, and update the `Review` status from `RUNNING` to `COMPLETED`.

## Data Model
- We will use the existing `Review` and `Finding` Prisma models.

## UI & Motion
- No major UI changes needed here; this is a backend orchestration engine. However, the existing `ReviewResults` component will need to be hydrated with real data once this is complete.

## Build Plan
1. **Providers Setup**: Create `src/lib/ai/providers.ts` to configure Groq, Mistral, and Gemini clients.
2. **Reviewer Prompts**: Create `src/lib/ai/specialists.ts` containing the system prompts and Zod schemas for the 3 specialists.
3. **Review Engine Core**: Create `src/lib/ai/engine.ts` which exports a `runReviewEngine` function. It should handle fetching the diff, running `Promise.allSettled` for the specialists, and applying the fallback logic if a provider rate limits.
4. **Action Integration**: Update `startReview` in `src/features/reviews/actions/review-actions.ts` to kick off the engine asynchronously, update the DB, and revalidate the path.
5. **Results UI Hydration**: Update `src/features/reviews/components/review-results.tsx` to display the actual `Findings` from the database instead of placeholder data.
