# Verify: User Profile, Onboarding, and Cat Pay · spec 0008 · updated 2026-08-02
_Steps derived from spec 0008 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## UI / manual
- [ ] Sign in with a new user who hasn't installed the GitHub App → Expect redirect to `/setup` → AC-1
- [ ] Click "Install CodeCat on GitHub" on `/setup` → Expect GitHub App installation page to open → AC-1
- [ ] Install the GitHub App and click "Verify now" → Expect redirect to `/dashboard` with success toast → AC-1
- [ ] Navigate to `/profile` → Expect User Avatar, Name, Email, and FREE PLAN badge to display → AC-2
- [ ] Check GitHub App connection status on `/profile` → Expect it to show "Installed" → AC-2
- [ ] Fill dummy details in Cat Pay and click "Pay with Cat Pay" → Expect success toast and plan badge to change to PRO PLAN → AC-4
- [ ] Click CodeCat mascot → Expect floating menu to open → AC-3
- [ ] Click "Sign Out" in Cat Menu → Expect user to be logged out and redirected to home → AC-3

## Acceptance-criteria coverage
- AC-1 (Onboarding Flow) covered by step 1, 2, 3
- AC-2 (Profile Section) covered by step 4, 5
- AC-3 (Cat Menu Enhancement) covered by step 7, 8
- AC-4 (Cat Pay) covered by step 6
