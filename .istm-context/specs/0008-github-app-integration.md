# 0008: GitHub App Integration & Webhooks

**Status**: Draft

## Summary
Currently, CodeCat requires manual triggering of reviews via the dashboard. To fully integrate into the developer workflow, CodeCat will transition into (or act alongside) a GitHub App. This allows it to automatically activate on connected repositories, listen for PR webhook events, and post reviews directly to GitHub as a recognized "Reviewer".

## Requirements
- **Automatic Activation**:
  - When a user connects a repository, optionally configure a GitHub Webhook (or rely on GitHub App installation events) to automatically listen for `pull_request` (`opened`, `synchronize`) events.
- **Webhook Receiver**:
  - Implement an API route (`/api/webhooks/github`) to receive incoming PR events and automatically queue a background AI Review.
- **GitHub Reviewer Display**:
  - Instead of just showing results on the CodeCat dashboard, CodeCat must push the findings back to the GitHub PR.
  - Create a "GitHub Check Run" or post a structured PR Review Comment (using the GitHub REST API) so that CodeCat shows up visually in the GitHub UI as a reviewer.

## Data Model
- **Repository Model**: Add `webhookInstalled` (Boolean) to track if auto-reviews are active.

## Build Plan
1. **GitHub App / Webhook Setup**: Create instructions/scripts for setting up the GitHub Webhook secret and API route.
2. **Webhook API Route**: Build `src/app/api/webhooks/github/route.ts` to parse GitHub payload, verify HMAC signatures, and trigger `startReview`.
3. **GitHub API Integration**: Expand `GitHubClient` in `src/lib/github/client.ts` with methods to `createCheckRun` and `createReviewComment`.
4. **Engine Update**: Update the AI Review Engine (from Spec 0006) to push its final structured output to GitHub via the new client methods upon completion.
