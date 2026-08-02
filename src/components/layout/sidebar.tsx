"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CodeCatLogo } from "@/components/shared/codecat-logo";
import { APP_NAME, ROUTES } from "@/lib/utils/constants";
import { LayoutDashboard, FolderGit2, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { name: "Repositories", href: ROUTES.REPOSITORIES, icon: FolderGit2 },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-60 flex-col border-r border-border bg-card transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:static lg:flex lg:translate-x-0",
          isOpen ? "flex translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2">
            <CodeCatLogo size={24} className="text-primary" />
            <span className="font-semibold tracking-tight text-foreground">
              {APP_NAME}
            </span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
