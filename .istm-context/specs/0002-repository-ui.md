# 0002: Repository UI

## Summary
Build the UI for the Repositories ecosystem, mimicking the GitHub App installation flow. Users can either grant access to a single repository or all repositories. The dashboard will show recently active repositories, a dedicated `/repositories` page will list all connected repositories with search functionality, and a repository detail page will display specific repository metadata along with an "Add CodeCat to Repo" CTA button. For this phase, we are building ONLY the UI with mock data.

## Requirements
- **AC-1:** Dashboard `/dashboard` features a "Recently Active" section displaying mock recently created/updated repositories.
- **AC-2:** A dedicated `/repositories` page exists showing a searchable, GitHub-style vertical list of all connected repositories.
- **AC-3:** A repository detail page exists at `/repositories/[owner]/[repo]` displaying key repository metadata (Name, Description, Language, Open PRs, Stars, Last Updated).
- **AC-4:** The repository detail page includes a prominent CTA button "Add CodeCat to Repo".
- **AC-5:** Clicking the "Add CodeCat" button triggers an inline state change to a "Connected" badge/button state along with a success toast (mocking the integration).
- **AC-6:** The UI must adhere strictly to the `GEMINI.md` and `globals.css` constraints (deep slate background, amber accents, Inter/JetBrains Mono typography).

## Data Model
- No new Prisma schema changes required for this phase.
- Use static mock data arrays for the repository list and detail views.

## UI & Motion
- **Aesthetic:** High-precision developer tool. Dark theme (`bg-background` mapped via `globals.css`) with Amber/Orange `primary` accents.
- **Repositories List:**
  - Vertical list layout (GitHub style).
  - Each item has a `border-border` bottom border separator.
  - Hover states use `bg-muted` or `bg-accent` with a 150ms transition.
  - Include semantic Lucide icons for languages, stars, and last updated times.
- **Repository Detail CTA:**
  - Default state: `Button` with `default` variant (Amber background, dark text).
  - Connected state: `Button` with `outline` variant, accompanied by a checkmark (`success` styling) and a success toast.
- **Motion:** Standard 150ms transitions for hovers and focus states. 250ms `ease-in-out` for the button state transformation. No GSAP. No heavy scroll-jacking.

## Build Plan
1. **Mock Data Setup:**
   - Create mock repository data objects in `src/features/repositories/lib/mock-data.ts`.
2. **Dashboard UI Update:**
   - Update `src/app/dashboard/page.tsx` to include the "Recently Active" repository list, integrated cleanly below or alongside the InteractiveMascot.
3. **Repositories Page (`/repositories`):**
   - Create `src/app/repositories/page.tsx` with a search input and the vertical list of mock repositories.
4. **Repository Detail Page (`/repositories/[owner]/[repo]`):**
   - Create `src/app/repositories/[owner]/[repo]/page.tsx`.
   - Implement the metadata layout (header, description, language, stats).
5. **Add CodeCat CTA Component:**
   - Create a client component `src/features/repositories/components/connect-repo-button.tsx`.
   - Implement the local React state (idle vs connected) and the toast notification on click.
6. **Verify Aesthetics:**
   - Ensure the layout matches the specified design tokens, spacing scale (8px grid), and typography (Inter).

**Status**: Accepted
