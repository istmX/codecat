# 0003: Unified Repository Dashboard

**Status**: Accepted

## Summary
The current flow requires a user to manually "connect" a repository and then navigate to a separate Pull Request page to view PRs. This feature unifies the Repository Detail page and the PR Dashboard into a single, seamless view. The manual "Add CodeCat to Repo" button will be removed in favor of auto-syncing the repository to the database upon visitation. The unified page will divide pull requests into two distinct categories: "Reviewed by CodeCat" and "Not Reviewed". To encourage usage, the "Not Reviewed" section will feature a prominent, beautifully styled hero banner showcasing CodeCat's specialist AI capabilities.

## Requirements
1. **Auto-Sync Repository**: When navigating to `/repositories/[owner]/[repo]`, the system must automatically upsert the `Repository` record into the Neon PostgreSQL database, ensuring user preferences can still be saved without a manual "Connect" step.
2. **Remove Manual Connection**: Delete the `ConnectRepoButton` component and its associated manual connection logic.
3. **Unified View**: Fetch pull requests on the repository detail page using the existing `getPullRequestsWithStatus` logic.
4. **PR Categorization**: Display PRs in two distinct lists:
   - **Reviewed by CodeCat**: PRs that have a corresponding `Review` record in the database.
   - **Not Reviewed**: PRs (including older ones) that have not yet been analyzed.
5. **Feature Showcase**: Inject a prominent hero banner at the top of the "Not Reviewed" section highlighting CodeCat's features (Specialist Reviewers, Security Analysis, Performance Checks) to encourage users to initiate a review.
6. **Route Cleanup**: Delete the now-redundant `/repositories/[owner]/[repo]/pulls/page.tsx` route, as the PRs are now displayed on the root repository page.

## Data Model
- No changes to `schema.prisma`. 
- Relies on existing `Repository`, `Review`, and `User` relationships.
- The Server Action or Page loader will utilize `prisma.repository.upsert()` to handle the auto-sync.

## UI & Motion
- **Aesthetic**: Strictly adhere to the CodeRabbit x GitHub dark theme (`bg-background` `#0D1117`, `primary` Amber `#F59E0B`).
- **Layout**: 
  - Top: Repository metadata (Stars, Language, Open PRs).
  - Middle: "Reviewed by CodeCat" list.
  - Bottom: "Not Reviewed" list, preceded by the `CodeCatFeatureBanner`.
- **Banner Design**: The feature banner should use a flat `bg-card` with an `border-border` and subtle `bg-muted` hover states on the feature icons (Lucide).
- **Motion**: Standard 150ms micro-interactions on PR cards. The Feature Banner can use a lightweight Framer Motion stagger effect for the feature items (`transition: 250ms cubic-bezier(0.4, 0, 0.2, 1)`). No heavy GSAP.

## Build Plan
1. **Refactor Actions**: Update repository actions to include an `autoSyncRepository` function that fetches GitHub repo data and upserts it to Prisma.
2. **Component Creation**:
   - Create `CodeCatFeatureBanner` component.
   - Refactor `PullRequestListClient` into a unified `RepositoryDashboardClient` that handles the two-list categorization.
3. **Page Assembly**: 
   - Update `src/app/(dashboard)/repositories/[owner]/[repo]/page.tsx` to fetch the PR data alongside the repository data.
   - Implement the new unified UI layout.
4. **Cleanup**: 
   - Delete `ConnectRepoButton`.
   - Delete `src/app/(dashboard)/repositories/[owner]/[repo]/pulls/page.tsx`.
