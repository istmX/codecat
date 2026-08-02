# 0002: Pull Request Dashboard

**Status**: Accepted

## Summary
The Pull Request Dashboard allows users to view live Pull Requests for a connected repository. It fetches the 30 most recent open PRs from the GitHub API and cross-references them with the local CodeCat database to display their AI review status ("Reviewed", "Pending", or "Unreviewed"). 

## Requirements
- Users must be able to view a list of open PRs when navigating to `/repositories/[owner]/[repo]/pulls`.
- Fetch the top 30 most recent open PRs using the user's GitHub OAuth token via `GitHubClient`.
- Query the local database for `Review` records associated with the repository and cross-reference them by `pullNumber`.
- Display a visually rich card for each PR, including the title, author avatar, branch information (base -> head), and creation date.
- Display a status badge on each PR card indicating the CodeCat Review Status (Unreviewed, Pending, Completed).
- Empty state: If no open PRs exist, display a custom SVG CodeCat illustration with the message "All caught up! No open PRs here."

## Data Model
No new Prisma models are required. We will use the existing `Review` model to cross-reference GitHub data:
- Match `GitHub PR Number` against `Review.pullNumber` where `Review.repositoryId` equals the current repo ID.

## UI & Motion
- **Layout**: Predictable hierarchy with breadcrumbs: `Dashboard > Repositories > [Repo Name] > Pull Requests`.
- **Cards**: Use the `primary-card` token (shadcn/ui `Card` with `bg-card`, 1px `border-border`, 6px radius, flat aesthetic).
- **Typography**: Inter for titles and metadata. JetBrains Mono for branch names.
- **Badges**: Use shadcn/ui `Badge` primitives to indicate review status.
  - Completed: `badge-info` (Primary / Amber).
  - Pending/Running: `badge-warning`.
  - Unreviewed: Default muted badge.
- **Empty State**: Centered layout, no emojis. A custom inline SVG cat illustration with `text-muted-foreground` description.
- **Motion**: Standard 150ms `transform` and `opacity` transition on hover for PR cards. No heavy GSAP.

## Build Plan

1. **GitHub API Client Update (`src/lib/github/client.ts`)**
   - Add a method `getRepositoryPullRequests(owner: string, repo: string, limit = 30)` to fetch open PRs.

2. **Server Action & Type Creation (`src/features/pull-requests/actions/pull-actions.ts`)**
   - Create a `getPullRequestsWithStatus(owner: string, repo: string)` Server Action.
   - Fetch PRs from GitHub.
   - Fetch `Review` records from Prisma for those PR numbers.
   - Map and merge the data into a structured `PullRequestWithStatus` type.

3. **Data Fetching Hook (`src/features/pull-requests/lib/hooks.ts`)**
   - Create a `usePullRequests(owner, repo, initialData)` hook using TanStack Query to cache and manage the list state.

4. **UI Components (`src/features/pull-requests/components/`)**
   - Create `PullRequestListClient.tsx` to handle the TanStack Query data and render the list.
   - Create `PullRequestCard.tsx` for the individual PR items (avatar, title, branches, badges).
   - Create `PullRequestEmptyState.tsx` with the custom SVG cat illustration.

5. **Page Assembly (`src/app/(dashboard)/repositories/[owner]/[repo]/pulls/page.tsx`)**
   - Fetch initial data on the server via `getPullRequestsWithStatus`.
   - Pass the data to `PullRequestListClient` to hydrate the client-side cache.
