# Spec: Dedicated Sign-In Page

## Summary
Currently, the landing page includes direct "Sign in with GitHub" buttons. To improve the user experience and create a more professional funnel, we need to change the landing page CTAs to say "Get Started" and have them route to a dedicated `/sign-in` page. This new page will host the actual GitHub OAuth flow.

## Requirements
1. **Landing Page CTA Updates**:
   - Change the button text on the hero section from "Sign in with GitHub" to "Get Started".
   - Change the button text on the pricing section to "Get Started".
   - These buttons should now be standard `Link` components wrapping a `shadcn/ui` Button, pointing to `/sign-in`.
2. **Dedicated Sign-In Page**:
   - Create a new route at `src/app/(auth)/sign-in/page.tsx`.
   - The page must be a minimal, centered auth screen (Linear/Vercel aesthetic).
   - Display the CodeCat logo, a bold heading, and a short subtext.
   - Include the actual `SignInButton` component that triggers GitHub OAuth.
   - Add a "Back to home" subtle link.

## UI & Motion
- **Layout**: Centered card layout on a dark background (`bg-background`).
- **Card**: Use `bg-card` with a subtle `border-border` and no heavy shadows.
- **Typography**: `Inter` for all text. The heading should be sharp and high-contrast.
- **Motion**: The entire auth card should fade in and slide up slightly on mount (`duration: 0.4`, `ease: easeOut`).
- **Tokens**: Strictly adhere to `.istm-context/design.md`.

## Build Plan
1. **Update Landing Page (`src/app/page.tsx`)**:
   - Replace `<SignInButton />` with a `Link href="/sign-in"` containing a "Get Started" button.
2. **Update Pricing Section (`src/components/landing/pricing-section.tsx`)**:
   - Replace `<SignInButton />` with the same "Get Started" link.
3. **Create Sign-In Page (`src/app/(auth)/sign-in/page.tsx`)**:
   - Implement the centered layout.
   - Import and render `<SignInButton />` (which should say "Sign in with GitHub").
4. **Verify**: Ensure the OAuth flow still functions correctly from the new page.

Run `/develop sign in page` to execute this spec.
