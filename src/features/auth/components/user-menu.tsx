"use client";

import { LogOut } from "lucide-react";
import { signOut } from "@/features/auth/actions/sign-out";
import { useState } from "react";
import * as motion from "framer-motion/client";

interface UserMenuProps {
  user: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full hover:bg-muted p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="h-8 w-8 rounded-full border border-border bg-card object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-border bg-card py-1 shadow-lg"
          >
            <div className="border-b border-border px-4 py-2">
              <p className="truncate text-sm font-medium text-foreground">
                {user.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
            <div className="p-1">
              <form action={signOut} className="w-full">
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-destructive transition-colors text-left"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
