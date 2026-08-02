"use client";

import { Menu } from "lucide-react";
import { UserMenu } from "@/features/auth/components/user-menu";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onMenuClick: () => void;
  user: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
}

export function Header({ onMenuClick, user }: HeaderProps) {
  const pathname = usePathname();
  
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentSegment = pathSegments[pathSegments.length - 1] || "Dashboard";
  const title = currentSegment.charAt(0).toUpperCase() + currentSegment.slice(1);

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-md p-1 text-muted-foreground hover:bg-muted lg:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-sm font-medium text-foreground">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <UserMenu user={user} />
      </div>
    </header>
  );
}
