# 0005: Merged PRs Section

**Status**: Accepted

## Summary
The current Unified Repository Dashboard displays only open pull requests. To allow developers to track the history of CodeCat's reviews and past PRs, we need to fetch merged PRs from GitHub and display them in a dedicated "Merged PRs" section below the open PRs on the repository detail page.

## Requirements
- **Data Fetching**:
  - Update `GitHubClient` to fetch PRs with `state=all` or specifically fetch recent closed/merged PRs.
  - Extend the `GithubPullRequest` type to include `merged_at: string | null` to identify merged PRs vs just closed ones.
  - Extend `PullRequestWithStatus` to include `prState: "open" | "merged" | "closed"`.
- **UI & Layout**:
  - In `RepositoryDashboardClient`, add a third category/section below "Reviewed by CodeCat" and "Not Reviewed" called **"Merged PRs"**.
  - Show a historical list of merged PRs (limited to the last 10-20 to keep the page fast).
  - Merged PRs should use the same `PullRequestCard` component, but perhaps visually distinct (e.g., lower opacity or a purple "Merged" icon badge).

## Data Model
No Prisma changes required. This is purely expanding the GitHub API data we request and render.

- `GithubPullRequest` (in `client.ts`):
  Add `merged_at: string | null;`
- `PullRequestWithStatus` (in `types/index.ts`):
  Add `prState: "open" | "merged" | "closed";`

## UI & Motion
- **Merged PRs Header**: `h2` with a `GitMerge` icon (purple `#8957e5` to match standard GitHub merged color).
- **Cards**: Use the existing `PullRequestCard`. If `prState === "merged"`, the card should ideally have a slightly muted border or background to indicate it is historical.
- Keep the Framer Motion layout consistent (no new heavy animations required).

## Build Plan
1. **API Client Update**:
   - Update `src/lib/github/client.ts` `getRepositoryPullRequests` to accept a state parameter `state?: "open" | "closed" | "all"`, default `"all"`. Add `merged_at` to the interface.
2. **Action Update**:
   - Update `src/features/pull-requests/actions/pull-actions.ts` to map `merged_at` to `prState`. Filter out closed-but-not-merged PRs if desired, or just map them to "closed".
3. **Types Update**:
   - Update `src/features/pull-requests/types/index.ts` to include `prState`.
4. **UI Update**:
   - Update `src/features/repositories/components/repository-dashboard-client.tsx` to filter `pullRequests` into three groups: `reviewedPrs`, `unreviewedPrs`, and `mergedPrs`.
   - Update `src/features/pull-requests/components/pull-request-card.tsx` to show a `GitMerge` icon instead of `GitPullRequest` if `prState === 'merged'`.
