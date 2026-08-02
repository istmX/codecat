# Spec 0008: User Profile, Onboarding, and Cat Pay

## Summary
Implement a forced GitHub App onboarding flow for new users, a dedicated Profile section for managing limits and identity, an upgraded CodeCat Central (Cat Menu) with navigation, and a mock "Cat Pay" checkout system to upgrade users to a Pro plan.

## Requirements
1. **Onboarding Flow (`/setup`)**:
   - If a user signs in but hasn't installed the CodeCat GitHub App, redirect them to `/setup`.
   - The setup page explains the requirement and links to the GitHub App Installation URL.
   - Requires checking the GitHub API or local DB to verify installation.

2. **Profile Section (`/profile`)**:
   - Displays User Avatar, Name, Email.
   - Shows Current Plan (`FREE` or `PRO`) and Rate Limit usage (e.g., "X / 5" or "X / 100").
   - Includes a button to manage/revoke the GitHub App connection.
   - Includes Sign Out functionality.

3. **CodeCat Central (Cat Menu) Enhancement**:
   - Keep the existing floating mini-toolbar design when the mascot is clicked.
   - Add navigation icons/links for: Dashboard, Repositories, Profile, and Sign Out.

4. **Cat Pay (Mock Payment System)**:
   - Create a dummy checkout modal/page called "Cat Pay".
   - Asks for Card or PayPal (purely visual UI, accepts any dummy input).
   - Simulates processing (with idempotency to prevent double upgrades).
   - Triggers a Server Action to update the user's `planTier` to `PRO` in the database.
   - Shows a success animation and unlocks the `PRO_LIMIT` (100 reviews).

## Data Model Updates
- Ensure `User` model has a `planTier` field (already added as `String @default("FREE")`).
- Create a `Transaction` or `Payment` model (optional) for idempotency, or just use a unique token stored in memory/DB during the session. For simplicity, since it's fake, we can just rely on the Server Action to safely update `planTier` from `FREE` to `PRO`.

## UI & Motion
- **Aesthetic**: Follows the deep slate base (`#0D1117`) and amber accents (`#F59E0B`).
- **Cat Pay UI**: Should feel premium, maybe using a glassmorphic or highly polished card (within the allowed tokens) that looks like Stripe checkout but branded for CodeCat.
- **Empty States**: `/setup` should have a custom SVG illustration of a cat plugging in a wire.
- **Motion**: 150ms transitions on the Cat Menu expansion. Success animation (confetti or checkmark) when Cat Pay succeeds.

## Build Plan
1. **Database**: No major Prisma changes needed if `planTier` exists. We might need a `githubAppInstalled` boolean on the `User` model or we can check via GitHub API dynamically.
2. **Setup Route**: Create `src/app/(dashboard)/setup/page.tsx` and enforce middleware/layout redirect if not installed.
3. **Profile Route**: Create `src/app/(dashboard)/profile/page.tsx`.
4. **Cat Pay**: Build the fake checkout component in `src/features/billing/components/cat-pay.tsx` with a Server Action `upgradeToPro()`.
5. **Mascot Menu**: Update `interactive-mascot.tsx` to include the new navigation routes.
