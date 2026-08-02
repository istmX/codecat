export const APP_NAME = "CodeCat";
export const APP_DESCRIPTION =
  "AI-powered code review with specialist reviewers for every quality dimension.";
export const APP_TAGLINE =
  "Deeper code reviews. Specialist AI reviewers for every quality dimension.";

export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  DASHBOARD: "/dashboard",
  REPOSITORIES: "/repositories",
  PULL_REQUESTS: "/pull-requests",
  SETTINGS: "/settings",
} as const;

export const GITHUB_OAUTH_SCOPES = "read:user repo";

export const AI_PROVIDERS = {
  GROQ: "groq",
  MISTRAL: "mistral",
  GEMINI: "gemini",
} as const;

export const REVIEW_CATEGORIES = [
  "ARCHITECTURE",
  "CODE_QUALITY",
  "PERFORMANCE",
  "SECURITY",
  "ACCESSIBILITY",
  "MAINTAINABILITY",
  "BEST_PRACTICES",
  "TESTING",
  "DOCUMENTATION",
] as const;

export const SEVERITY_LEVELS = [
  "CRITICAL",
  "WARNING",
  "SUGGESTION",
  "INFO",
] as const;

export const MOTION = {
  MICRO: 0.15,
  TRANSITION: 0.25,
  PAGE: 0.4,
} as const;

export const MOTION_EASE = {
  STANDARD: [0.4, 0, 0.2, 1],
  ENTER: [0, 0, 0.2, 1],
  EXIT: [0.4, 0, 1, 1],
} as const;
