# 0004: PR Review Runner and Results UI

**Status**: Draft

## Summary
When a user clicks on a Pull Request from the Repository Dashboard, they are navigated to the PR Review page (`/repositories/[owner]/[repo]/pulls/[number]`). If the PR has not been reviewed yet, this page serves as the "Review Runner" where they can trigger the AI analysis. If the PR has been reviewed, it displays the "Review Results".

## Requirements
- **Route**: `src/app/(dashboard)/repositories/[owner]/[repo]/pulls/[number]/page.tsx`
- **Data Fetching**: Fetch the specific PR details from GitHub API using the `owner`, `repo`, and `number`.
- **Review Runner State**:
  - If `status === "UNREVIEWED"`, show a clear, prominent "Run CodeCat Review" button.
  - When clicked, it should trigger a Server Action to kick off the AI review (for MVP, this can be a placeholder action that simulates a delay and changes status).
- **Review Results State**:
  - If `status === "COMPLETED"`, show the executive summary (quality score).
  - Show categorized findings (Architecture, Security, Performance, Best Practices) with issue counts.
  - Render individual findings with severity badges, file references, explanations, and expandable code snippets.
- **Empty/Loading States**: Use the custom SVG CodeCat mascot and `Loader2` for loading states.

## Data Model
No new database tables needed for the MVP UI scaffolding. The existing `PullRequestWithStatus` type and Prisma `Review` model (to be built backend) will be used. For now, the UI will rely on mock data or the GitHub API PR object.

## UI & Motion
- **Header**: PR title, number, author avatar, and status badge.
- **Run Review Button**: Large, primary button with a `Sparkles` icon. Use a subtle Framer Motion `whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.98 }}`.
- **Results Layout**: 
  - Top: Scorecard (grid of 4 metrics).
  - Middle: List of categorized findings in `bg-card` containers with `border-border`.
  - Severity Badges: 
    - Critical: `bg-red-500/10 text-red-500`
    - Warning: `bg-amber-500/10 text-amber-500`
    - Suggestion: `bg-blue-500/10 text-blue-500`
    - Info: `bg-muted text-muted-foreground`
- **Typography**: Inter for prose, JetBrains Mono for code snippets and file paths.

## Build Plan
1. **Component Creation**:
   - `src/features/reviews/components/review-runner.tsx` (The CTA to start a review)
   - `src/features/reviews/components/review-results.tsx` (The structured output display)
   - `src/features/reviews/components/finding-card.tsx` (Individual issue card)
2. **Page Assembly**:
   - Create `src/app/(dashboard)/repositories/[owner]/[repo]/pulls/[number]/page.tsx`.
   - Fetch PR data server-side and pass it to a unified client component.
3. **Actions**:
   - Create a placeholder `startReview` Server Action in `src/features/reviews/actions/review-actions.ts`.
