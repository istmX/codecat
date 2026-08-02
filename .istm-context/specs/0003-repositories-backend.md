# Feature Spec: Repositories Backend Logic

**Status**: Proposed

## 1. Summary
This feature implements the backend logic for connecting and disconnecting GitHub repositories to CodeCat. It replaces the current mock data with real data fetched from the GitHub REST API using the user's OAuth access token, and manages the connected state via Prisma (Neon PostgreSQL).

## 2. Requirements
- Retrieve the authenticated user's GitHub repositories via the GitHub REST API.
- Cross-reference the fetched repositories with the local Prisma database to determine which repositories are currently "connected" to CodeCat.
- Provide a Server Action to connect a repository (create a `Repository` record in the database).
- Provide a Server Action to disconnect a repository (delete the `Repository` record from the database).
- Handle GitHub API rate limits and token expiration gracefully.

## 3. Data Model
Leverages the existing `Repository` model in `schema.prisma`:
```prisma
model Repository {
  id          String   @id @default(cuid())
  githubId    Int      @unique
  name        String
  fullName    String
  owner       String
  description String?
  language    String?
  isPrivate   Boolean  @default(false)
  url         String
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  reviews     Review[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 4. UI & Motion
- Use React `useTransition` or native Next.js Server Action loading states inside `ConnectRepoButton`.
- On successful connection, trigger `window.dispatchEvent(new Event("codecat-happy"))`.
- On successful disconnection, trigger `window.dispatchEvent(new Event("codecat-sad"))`.
- Ensure standard error toasts if a Server Action fails (e.g. GitHub API error).

## 5. Build Plan

### Step 1: GitHub API Client
Create `src/lib/github/client.ts` to wrap standard GitHub API calls:
- Require the `access_token` from the Auth.js session.
- Method: `getUserRepositories()` (fetches `GET /user/repos`).

### Step 2: Server Actions
Create `src/features/repositories/actions/repository-actions.ts`:
- `getRepositories()`: Combines GitHub API data with Prisma `Repository` data to return a unified list (with an `isConnected` flag).
- `connectRepository(repoData)`: Inserts a new `Repository` into the DB for the current user.
- `disconnectRepository(githubId)`: Deletes the `Repository` from the DB.

### Step 3: Wire the UI
- Update `src/app/(dashboard)/repositories/page.tsx` to call `getRepositories()` instead of `MOCK_REPOSITORIES`.
- Update `src/features/repositories/components/connect-repo-button.tsx` to invoke the `connectRepository` and `disconnectRepository` Server Actions.

### Step 4: Cleanup
- Delete `src/features/repositories/lib/mock-data.ts`.
