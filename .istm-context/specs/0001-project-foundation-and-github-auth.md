# 0001 — Project Foundation and GitHub Authentication

## Summary

**Status**: Accepted

Set up the entire project foundation (directory structure, dependencies, design token configuration, Prisma schema, database connection) and implement GitHub OAuth authentication using Auth.js v5. This is the entry gate for the application. No other feature can function without it.

This spec covers two things that must ship together:
1. **Foundation**: the structural plumbing every future feature depends on.
2. **Authentication**: the first user facing feature (sign in with GitHub, protected routes, session management, sign in page, app shell).

---

## Requirements (Acceptance Criteria)

### Foundation

- [ ] Project uses a `src/` directory structure matching the folder layout in `architecture.md`.
- [ ] Path alias `@/*` resolves to `src/*`.
- [ ] All required dependencies are installed: Auth.js v5, Prisma, `@prisma/client`, `@prisma/adapter-neon`, `@neondatabase/serverless`, shadcn/ui, Framer Motion, TanStack Query v5, React Hook Form, Zod, Lucide React, `clsx`, `tailwind-merge`.
- [ ] `globals.css` is configured with Tailwind v4 imports and CSS custom properties for all design tokens from `design.md` (colors, spacing, radius, shadows, typography).
- [ ] Inter and JetBrains Mono fonts are loaded via `next/font/google` and applied globally.
- [ ] The `cn()` utility function exists at `src/lib/utils/cn.ts`.
- [ ] Constants file exists at `src/lib/utils/constants.ts` with route paths and app metadata.
- [ ] Prisma schema is created at `src/prisma/schema.prisma` with User, Account, Session, Repository, Review, Finding models, and all enums.
- [ ] Prisma client singleton exists at `src/lib/db/prisma.ts`.
- [ ] Database connection works via Neon serverless driver (connection string from `DATABASE_URL` env var).
- [ ] `.env.example` file documents all required environment variables.

### Authentication

- [ ] Auth.js v5 is configured with GitHub OAuth as the only provider.
- [ ] Auth config lives at `src/lib/auth.ts` (or `src/features/auth/lib/auth-config.ts`).
- [ ] Route handler exists at `src/app/api/auth/[...nextauth]/route.ts`.
- [ ] GitHub OAuth scopes include `read:user` and `repo`.
- [ ] On sign in, the GitHub access token is persisted to the database (on the Account model via Auth.js adapter) and made available in the session via the `jwt` and `session` callbacks.
- [ ] Auth.js Prisma adapter is used so User, Account, and Session models are managed automatically.
- [ ] Middleware at `src/middleware.ts` protects all `/(dashboard)/` routes. Unauthenticated users are redirected to `/sign-in`.
- [ ] The root route `/` serves a public landing page with a "Sign in with GitHub" call to action.
- [ ] The `/sign-in` page is a clean, minimal page with the CodeCat SVG logo, a one sentence value proposition, and a "Sign in with GitHub" button.
- [ ] After successful sign in, first time users see a welcome/onboarding screen. Returning users are redirected directly to the dashboard.
- [ ] A `signOut` action is available and accessible from the user avatar menu in the app shell header.
- [ ] Session data is accessible server side via `auth()` and client side via `useSession()` (with a `SessionProvider` in the root layout).

### App Shell

- [ ] A root dashboard layout exists at `src/app/(dashboard)/layout.tsx`.
- [ ] The layout includes a collapsible sidebar (240px, `bg-surface`, border right) and a top header bar (56px, sticky, `bg-canvas`, border bottom).
- [ ] The sidebar contains: CodeCat logo (custom SVG), navigation links (Dashboard, Repositories), and user avatar with sign out option at the bottom.
- [ ] The header contains: breadcrumb navigation and a user menu.
- [ ] The dashboard landing page at `src/app/(dashboard)/page.tsx` renders a placeholder welcome view for now.
- [ ] All layout components use design tokens from `design.md`. No hardcoded colors or spacing.

---

## Data Model

No new models beyond what is already defined in `architecture.md`. This feature uses:

- **User**: stores GitHub profile info (`name`, `email`, `image`, `githubId`).
- **Account**: stores OAuth provider details and the `access_token` from GitHub.
- **Session**: manages active sessions.

The `accessToken` field on the User model may need to be removed or kept as a convenience cache. The canonical token lives on the Account model (managed by Auth.js Prisma adapter). The session callbacks should expose the token from the Account record.

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `AUTH_SECRET` | Auth.js session encryption secret |
| `AUTH_GITHUB_ID` | GitHub OAuth App client ID |
| `AUTH_GITHUB_SECRET` | GitHub OAuth App client secret |
| `NEXTAUTH_URL` | Application URL (e.g., `http://localhost:3000`) |

---

## UI and Motion

### Sign-in Page (`/sign-in`)

- **Layout**: Centered vertically and horizontally on the full viewport. Background `bg-canvas` (`#0F172A`).
- **Content card**: A `primary-card` component centered on screen. Background `bg-surface` (`#1E293B`), border 1px `border-default` (`#334155`), rounded 8px, padding `2XL` (48px).
- **Logo**: Custom SVG cat silhouette icon at the top. Sized 48x48px. Color `primary` (`#6366F1`).
- **Heading**: "CodeCat" in H2 style (24px, weight 600, `text-primary`). Below the logo with `SM` (8px) gap.
- **Tagline**: One sentence value proposition in Body style (14px, weight 400, `text-secondary`). Below heading with `XS` (4px) gap.
- **Button**: "Sign in with GitHub" using `button-primary` style. Full width of the card. GitHub icon (from Lucide: `Github`) on the left of the text. Margin top `LG` (24px).
- **Motion**: The card fades in and translates up 8px on page load. Duration 400ms. Easing `cubic-bezier(0, 0, 0.2, 1)` (entry curve). Use Framer Motion `motion.div` with `initial={{ opacity: 0, y: 8 }}` and `animate={{ opacity: 1, y: 0 }}`.
- **Button hover**: Scale to 1.01 over 150ms. Subtle brightness increase on the primary color.

### Landing Page (`/`)

- **Layout**: Full viewport height. Background `bg-canvas`.
- **Content**: Centered vertically. CodeCat SVG logo (larger, 64x64px), "CodeCat" as H1 (36px, weight 700), tagline as Body (14px, `text-secondary`), and "Sign in with GitHub" button.
- **Distinction from /sign-in**: The landing page is the public entry point. It may include a brief feature list (2 to 3 bullet points with Lucide icons) below the tagline to communicate value. The `/sign-in` page is a focused auth page with no distractions.
- **Motion**: Same entry animation as sign-in page. Feature bullets stagger in with 100ms delay each.

### App Shell (Dashboard Layout)

- **Sidebar** (`src/components/layout/sidebar.tsx`):
  - Width 240px, fixed left, full height.
  - Background `bg-surface` (`#1E293B`), border right 1px `border-default`.
  - Top: CodeCat logo SVG (24x24) + "CodeCat" text in Card Title style (16px, weight 600).
  - Navigation items: Lucide icon + label. Inactive: `text-secondary`, no background. Active: `text-primary`, background `bg-surface-raised` (`#283548`), rounded 8px. Hover: `text-primary`, background at 50% of `bg-surface-raised`.
  - Bottom: User avatar (rounded pill, 32x32), user name (Body Small, 13px), sign out button (ghost style).
  - Mobile: Sidebar becomes a slide in drawer from the left. Overlay background at 50% opacity black. Triggered by a hamburger icon in the header.

- **Header** (`src/components/layout/header.tsx`):
  - Height 56px, sticky top, full width of content area (to the right of sidebar).
  - Background `bg-canvas`, border bottom 1px `border-default`.
  - Left: Breadcrumb text in Body style. Mobile: hamburger menu icon.
  - Right: User avatar (32x32, rounded pill) with dropdown menu for sign out.

- **Motion**: Sidebar navigation items have a 150ms color transition on hover. Mobile sidebar slides in with 250ms `cubic-bezier(0.4, 0, 0.2, 1)`. Overlay fades in over 250ms.

### Welcome / Onboarding Screen

- **Layout**: Rendered inside the dashboard layout (sidebar + header visible).
- **Content**: Centered in the main content area. Custom SVG cat illustration (code generated, not an image file). "Welcome to CodeCat" as H2. Brief description (Body, `text-secondary`). "Connect Your First Repository" as `button-primary`. Below: "or explore the dashboard" as a text link in `text-secondary` with `primary` hover color.
- **First-time detection**: Check if the user has any connected repositories. If `repositories.length === 0`, show the welcome screen. Otherwise, show the dashboard.
- **Motion**: Content fades in with the standard entry animation (400ms, y: 8px translate).

---

## Build Plan

The implementation should follow this exact order. Each step produces a working state.

### Step 1: Project Restructuring

1. Create the `src/` directory with subdirectories: `app/`, `components/ui/`, `components/layout/`, `components/shared/`, `features/auth/components/`, `features/auth/actions/`, `features/auth/lib/`, `features/auth/types/`, `features/repositories/`, `features/pull-requests/`, `features/reviews/`, `features/diff-viewer/`, `lib/ai/`, `lib/github/`, `lib/db/`, `lib/utils/`, `types/`, `prisma/`.
2. Move existing `app/` contents into `src/app/`.
3. Update `tsconfig.json` paths: `"@/*": ["./src/*"]`.
4. Update `next.config.ts` if needed for the `src/` directory.
5. Verify the dev server still works.

### Step 2: Install Dependencies

Install all required packages:
```
npm install next-auth@5 @auth/prisma-adapter prisma @prisma/client @neondatabase/serverless @prisma/adapter-neon framer-motion @tanstack/react-query react-hook-form @hookform/resolvers zod lucide-react clsx tailwind-merge
```

Also install shadcn/ui via its CLI:
```
npx shadcn@latest init
```
Configure shadcn for the project (Tailwind CSS v4, dark theme, path aliases).

### Step 3: Design Token Setup

1. Update `src/app/globals.css` with Tailwind v4 `@import "tailwindcss"` and CSS custom properties for every design token from `design.md`.
2. Replace Geist fonts with Inter and JetBrains Mono using `next/font/google` in `src/app/layout.tsx`.
3. Create `src/lib/utils/cn.ts` with the `clsx` + `tailwind-merge` utility.
4. Create `src/lib/utils/constants.ts` with route constants (`ROUTES.SIGN_IN`, `ROUTES.DASHBOARD`, `ROUTES.REPOSITORIES`, etc.) and app metadata (`APP_NAME`, `APP_DESCRIPTION`).

### Step 4: Prisma Schema and Database

1. Create `src/prisma/schema.prisma` with the full schema from `architecture.md`.
2. Configure the Neon serverless adapter in the Prisma client.
3. Create `src/lib/db/prisma.ts` as a singleton.
4. Create `.env.example` with all required variables.
5. Run `npx prisma generate` to generate the client.
6. Run `npx prisma db push` (or `migrate dev`) to sync the schema to the database.

### Step 5: Auth.js Configuration

1. Create `src/features/auth/lib/auth-config.ts` with Auth.js v5 configuration:
   - GitHub OAuth provider with `read:user` and `repo` scopes.
   - Prisma adapter pointing to the Prisma client singleton.
   - `jwt` callback: attach `accessToken` and `userId` to the JWT.
   - `session` callback: expose `accessToken` and `userId` on the session object.
   - `pages` config: set `signIn` to `/sign-in`.
2. Export `auth`, `signIn`, `signOut`, and `handlers` from a thin wrapper at `src/lib/auth.ts`.
3. Create `src/app/api/auth/[...nextauth]/route.ts` exporting the `GET` and `POST` handlers.
4. Create `src/features/auth/types/index.ts` extending the Auth.js session types to include `accessToken` and `userId`.

### Step 6: Middleware

1. Create `src/middleware.ts` using Auth.js middleware.
2. Protect all routes under `/(dashboard)/`.
3. Allow public access to `/`, `/sign-in`, and `/api/auth/*`.

### Step 7: Sign-in Page and Landing Page

1. Create the CodeCat SVG logo component at `src/components/shared/codecat-logo.tsx`. A minimal cat silhouette icon in pure SVG, accepting `size` and `className` props.
2. Create `src/app/sign-in/page.tsx` following the UI spec above.
3. Create the sign-in button component at `src/features/auth/components/sign-in-button.tsx` that calls `signIn("github")`.
4. Update `src/app/page.tsx` to be the public landing page following the UI spec above.
5. Both pages use Framer Motion for entry animations.

### Step 8: App Shell Layout

1. Create `src/components/layout/sidebar.tsx` following the UI spec.
2. Create `src/components/layout/header.tsx` following the UI spec.
3. Create `src/components/layout/app-shell.tsx` composing sidebar + header + main content area.
4. Create `src/app/(dashboard)/layout.tsx` using the app shell. Wrap children with `SessionProvider`.
5. Create `src/app/(dashboard)/page.tsx` with the welcome/onboarding screen (check for repositories, show welcome if none).

### Step 9: Sign-out and User Menu

1. Create `src/features/auth/actions/sign-out.ts` with a Server Action that calls `signOut()`.
2. Create `src/features/auth/components/user-menu.tsx` with avatar, name, and sign out option. Use shadcn `DropdownMenu` if available, or a simple Framer Motion animated dropdown.
3. Integrate the user menu into the sidebar bottom and header right.

### Step 10: Verification

1. Start the dev server. Navigate to `/`. Verify the landing page renders correctly.
2. Click "Sign in with GitHub". Verify redirect to GitHub OAuth.
3. Authorize the app. Verify redirect back to the dashboard.
4. Verify the user record is created in the database.
5. Verify the session contains `accessToken` and `userId`.
6. Verify the sidebar, header, and welcome screen render correctly.
7. Sign out. Verify redirect to the sign-in page.
8. Try accessing `/(dashboard)/` while signed out. Verify redirect to `/sign-in`.
9. Sign in again. Verify the dashboard loads (not the welcome screen if repos exist, welcome if none).

---

## Edge Cases

- **GitHub OAuth denied**: User denies permission on GitHub. Auth.js handles this and redirects to the sign-in page with an error. Display a toast or inline error message.
- **Token expiry**: GitHub access tokens from OAuth do not expire by default (they are valid until revoked). If a refresh token flow is needed later, it can be added to the Auth.js callbacks.
- **Database unavailable**: If Neon is unreachable, Auth.js should fail gracefully. The sign-in page should show an error state.
- **Concurrent sessions**: Auth.js handles multiple sessions per user by default. No special handling needed.
- **Missing environment variables**: The app should fail at startup with a clear error if `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, or `DATABASE_URL` are missing. Use Zod to validate env vars at import time.

---

## Files Created or Modified

| File | Action |
|------|--------|
| `src/app/layout.tsx` | Create (moved from `app/`, updated fonts and metadata) |
| `src/app/globals.css` | Create (design tokens, Tailwind v4 setup) |
| `src/app/page.tsx` | Create (public landing page) |
| `src/app/sign-in/page.tsx` | Create |
| `src/app/api/auth/[...nextauth]/route.ts` | Create |
| `src/app/(dashboard)/layout.tsx` | Create |
| `src/app/(dashboard)/page.tsx` | Create |
| `src/middleware.ts` | Create |
| `src/features/auth/lib/auth-config.ts` | Create |
| `src/features/auth/types/index.ts` | Create |
| `src/features/auth/components/sign-in-button.tsx` | Create |
| `src/features/auth/components/user-menu.tsx` | Create |
| `src/features/auth/actions/sign-out.ts` | Create |
| `src/lib/auth.ts` | Create (thin re-export wrapper) |
| `src/lib/db/prisma.ts` | Create |
| `src/lib/utils/cn.ts` | Create |
| `src/lib/utils/constants.ts` | Create |
| `src/components/layout/sidebar.tsx` | Create |
| `src/components/layout/header.tsx` | Create |
| `src/components/layout/app-shell.tsx` | Create |
| `src/components/shared/codecat-logo.tsx` | Create |
| `src/prisma/schema.prisma` | Create |
| `tsconfig.json` | Modify (update paths) |
| `.env.example` | Create |
| `next.config.ts` | Modify if needed |

---

## Dependencies on Other Features

None. This is the foundation feature. All other features depend on this.

## What This Spec Does NOT Cover

- Repository connection and browsing (separate spec)
- Pull request listing (separate spec)
- AI review execution (separate spec)
- Diff viewer (separate spec)
- Review results display (separate spec)

---

## Next Step

After this spec is approved, run `/develop` to begin implementation.
