import { cn } from "@/lib/utils";
import Image from "next/image";

export interface CodeCatLogoProps {
  size?: number;
  className?: string;
  variant?: "four-legs"; // Kept for compatibility but we only use the face now
}

export function CodeCatLogo({ size = 64, className }: CodeCatLogoProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-full", className)} style={{ width: size, height: size }}>
      <Image
        src="/icon.png"
        alt="CodeCat Logo"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
    </div>
  );
}
