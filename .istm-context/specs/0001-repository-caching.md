# Feature Spec: Repository State Persistence & Caching

## Summary
Implement client-side caching and state persistence for user repositories using TanStack Query. This ensures that repositories fetched from the database or GitHub remain instantly available during client-side navigation and page refreshes, eliminating the need for repeated loading states or re-authorizations. NextAuth continues to strictly handle all session and user authentication state.

## Requirements
- **Auth Separation**: Rely solely on Auth.js (`useSession`) for user state. Do not cache user auth data in TanStack Query.
- **Repository Caching**: Use TanStack Query (`useQuery`) to fetch and cache the user's connected repositories from the backend.
- **Cache Invalidation**: When a user connects or disconnects a repository via a Server Action, invalidate the TanStack Query cache to instantly reflect the updated state in the UI.
- **Hydration (Optional but recommended)**: Hydrate the TanStack Query cache using initial data fetched by Next.js React Server Components to ensure an instant first paint.

## Data Model
- **No changes to the Prisma Schema**. The existing `Repository` and `User` models remain structurally intact.

## UI & Motion
- **Loading States**: Display skeleton loaders matching the existing Card UI (`bg-card`, `border-border`, 6px radius) while TanStack Query fetches data in the background (if not already hydrated).
- **Motion**: No heavy GSAP. Use standard 150ms transitions for hover effects on repository cards as defined in the design tokens.
- **Empty States**: If no repositories are connected, show the custom CodeCat SVG illustration with a clear "Connect Repository" call to action.

## Build Plan

1. **Setup TanStack Query Provider**:
   - Ensure a `QueryClientProvider` wraps the application (likely in a `providers.tsx` file inside `app/` or `components/`).

2. **Create Repository Hooks**:
   - Create a new file: `src/features/repositories/lib/hooks.ts`.
   - Implement `useRepositories()` utilizing `useQuery` to fetch from the existing repository fetcher (Server Action or API route).

3. **Update Repository UI Components**:
   - Refactor `RepositoryListClient` (or equivalent client component) to consume the `useRepositories` hook.
   - Remove any local state (`useState`) previously used to hold the repositories list, handing full control over to TanStack Query.

4. **Wire Cache Invalidation**:
   - In the components where the "Connect" or "Disconnect" repository Server Actions are invoked, use `useMutation` or standard `queryClient.invalidateQueries({ queryKey: ['repositories'] })` on success to refresh the UI automatically.

5. **Verify Stability**:
   - Test navigating between the dashboard and repository list.
   - Perform a hard refresh to ensure the data persists or fetches seamlessly without forcing re-authorization.
