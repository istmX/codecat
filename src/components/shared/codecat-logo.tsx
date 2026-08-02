import { cn } from "@/lib/utils/cn";

interface CodeCatLogoProps {
  size?: number;
  className?: string;
}

export function CodeCatLogo({ size = 32, className }: CodeCatLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn(className)}
    >
      {/* Cat head */}
      <ellipse cx="16" cy="18" rx="11" ry="10" fill="currentColor" opacity="0.15" />
      <ellipse cx="16" cy="18" rx="11" ry="10" stroke="currentColor" strokeWidth="1.5" />

      {/* Left ear */}
      <path
        d="M7 11 L5 4 L11 9 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Right ear */}
      <path
        d="M25 11 L27 4 L21 9 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Eyes */}
      <ellipse cx="12" cy="17" rx="1.5" ry="1.8" fill="currentColor" />
      <ellipse cx="20" cy="17" rx="1.5" ry="1.8" fill="currentColor" />

      {/* Nose */}
      <path
        d="M15 20 L16 19 L17 20 L16 21 Z"
        fill="currentColor"
        opacity="0.7"
      />

      {/* Whiskers left */}
      <line x1="5" y1="19" x2="13" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="5" y1="21.5" x2="13" y2="21" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      {/* Whiskers right */}
      <line x1="27" y1="19" x2="19" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="27" y1="21.5" x2="19" y2="21" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      {/* Code brackets on the chest — CodeCat branding detail */}
      <text
        x="16"
        y="27"
        textAnchor="middle"
        fontSize="6"
        fontFamily="monospace"
        fill="currentColor"
        opacity="0.6"
      >
        {"</>"}
      </text>
    </svg>
  );
}
