import { cn } from "@/lib/utils";
export interface CodeCatLogoProps {
  size?: number;
  className?: string;
  variant?: "four-legs"; // Kept for compatibility but we only use one pose now
}

export function CodeCatLogo({ size = 64, className }: CodeCatLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("mascot-svg", className)}
    >
      <style>
        {`
          @keyframes swing {
            0%, 100% { transform: rotate(-20deg); }
            50% { transform: rotate(20deg); }
          }
          @keyframes swing-reverse {
            0%, 100% { transform: rotate(20deg); }
            50% { transform: rotate(-20deg); }
          }
          .leg-1, .leg-3, .leg-2, .leg-4 {
            transform-box: fill-box;
            transform-origin: center top;
          }
          .leg-1, .leg-3 {
            animation: swing 0.6s infinite ease-in-out;
          }
          .leg-2, .leg-4 {
            animation: swing-reverse 0.6s infinite ease-in-out;
          }
          .paused .leg-1, .paused .leg-2, .paused .leg-3, .paused .leg-4 {
            animation-play-state: paused;
            transform: rotate(0deg);
          }
        `}
      </style>

      {/* Shadow */}
      <ellipse cx="50" cy="85" rx="35" ry="5" fill="#000000" fillOpacity="0.4" />

      {/* Tail */}
      <path d="M80 65 Q 95 65 95 40" stroke="#161B22" strokeWidth="8" strokeLinecap="round" />
      <path d="M80 65 Q 95 65 95 40" stroke="#30363D" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Body: Chunky Fat Cat */}
      <rect x="20" y="40" width="55" height="35" rx="15" fill="#161B22" stroke="#30363D" strokeWidth="2" />

      {/* Legs */}
      <g className="four-legs">
        <g transform="translate(29, 65)"><rect className="leg-1" x="-4" y="0" width="8" height="15" rx="4" fill="#0D1117" stroke="#30363D" strokeWidth="1" /></g>
        <g transform="translate(44, 70)"><rect className="leg-2" x="-4" y="0" width="8" height="15" rx="4" fill="#161B22" stroke="#30363D" strokeWidth="1" /></g>
        <g transform="translate(59, 65)"><rect className="leg-3" x="-4" y="0" width="8" height="15" rx="4" fill="#0D1117" stroke="#30363D" strokeWidth="1" /></g>
        <g transform="translate(69, 70)"><rect className="leg-4" x="-4" y="0" width="8" height="15" rx="4" fill="#161B22" stroke="#30363D" strokeWidth="1" /></g>
      </g>

      {/* Head */}
      <circle cx="25" cy="35" r="20" fill="#161B22" stroke="#30363D" strokeWidth="2" />
      
      {/* Ears */}
      <path d="M10 25 L15 10 L25 17 Z M30 15 L40 5 L42 20 Z" fill="#161B22" stroke="#30363D" strokeWidth="2" strokeLinejoin="round" />

      {/* 3D Glasses (Amber/Cyan for CodeCat vibe) */}
      <rect x="10" y="25" width="14" height="10" rx="2" fill="#F59E0B" stroke="#000000" strokeWidth="2" /> {/* Left Lens (Amber) */}
      <rect x="26" y="25" width="14" height="10" rx="2" fill="#06B6D4" stroke="#000000" strokeWidth="2" /> {/* Right Lens (Cyan) */}
      <path d="M24 30 H26" stroke="#000000" strokeWidth="2" /> {/* Bridge */}
      <path d="M5 28 Q 8 26 10 28" stroke="#000000" strokeWidth="2" fill="none" /> {/* Left Arm */}
      <path d="M40 28 Q 42 26 45 28" stroke="#000000" strokeWidth="2" fill="none" /> {/* Right Arm */}

      {/* Nose and Mouth */}
      <path d="M24 38 L25 40 L26 38" fill="#F472B6" />
      <path d="M22 41 Q 25 43 28 41" stroke="#30363D" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
