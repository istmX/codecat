# 0007: Billing, Plans, and Rate Limiting

**Status**: Draft

## Summary
To ensure sustainability, CodeCat will introduce a "Free Plan" with specific usage limits. This feature will track the number of tokens/files processed per review, enforce rate limits (e.g., reviews per hour), and provide clear UI feedback when a limit is reached ("Review limit reached, try again in XX mins").

## Requirements
- **Plan Tiers**:
  - *Free Plan*: Limit of 15 files per PR, limit of 5 reviews per hour per user.
- **Rate Limiting**:
  - Track review timestamps per user in the database.
  - If a user triggers a review and exceeds 5 reviews in the last hour, abort and return a specific error indicating the cooldown time remaining.
- **File Limit & Filtering**:
  - When fetching a PR diff, only process modified files.
  - Automatically skip `.md` (markdown) files.
  - Truncate or reject if it exceeds the maximum allowed 15 files for the user's plan.
  - No strict token limit; rely entirely on the 15 file cap.
- **UI & Motion**:
  - **Rate Limit UI**: A specific state in the `ReviewRunner` component displaying a countdown timer or a clear message: "Review limit reached. Try again in 14 mins and 20 secs."
  - **Usage UI**: Display how many files were processed on the `ReviewResults` page (e.g., "7 / 15 files reviewed").

## Data Model
- **User Model**: Add `planTier` (default: "FREE").
- **Review Model**: Add `filesProcessed` (Int).

## Build Plan
1. Update Prisma schema to track `planTier` on `User` and `filesProcessed` on `Review`.
2. Implement a rate-limiting utility in `src/lib/rate-limit.ts` to calculate time until the next allowed review.
3. Update `startReview` action to enforce limits before Upserting a review, throwing a specific Error if rate limited.
4. Update `ReviewRunner` UI to catch rate limit errors and display the countdown.
