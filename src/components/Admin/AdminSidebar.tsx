// src/components/Admin/AdminSidebar.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

import { ADMIN_SIDEBAR_ITEMS } from "@/data/adminSidebarItems";

interface AdminSidebarProps {
  activeItemId?: string;
  onChangeActive?: (id: string) => void;
  className?: string;
}

export function AdminSidebar({
  activeItemId,
  onChangeActive,
  className,
}: AdminSidebarProps) {
  const [activeId, setActiveId] = useState<string>(
    activeItemId ?? ADMIN_SIDEBAR_ITEMS[0]?.id
  );

  const handleClick = (id: string) => {
    setActiveId(id);
    onChangeActive?.(id);
  };

  return (
    <aside
      className={cn(
        "flex w-64 flex-col bg-admin-sidebar text-admin-sidebar-foreground shadow-lg",
        className
      )}
    >
      {/* هدر سایدبار */}
      <div className="flex h-20 items-center justify-center border-b border-admin-sidebar-foreground/20">
        <span className="text-lg font-extrabold">PetYar</span>
      </div>

      {/* منو */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {ADMIN_SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-full px-4 py-2 text-small font-medium transition",
                "hover:bg-border/60 hover:text-admin-sidebar",
                isActive && "bg-card text-admin-sidebar shadow-sm"
              )}
            >
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </span>
            </button>
          );
        })}
      </nav>

      {/* خروج */}
      <div className="border-t border-admin-sidebar-foreground/20 px-4 py-4">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-full bg-card px-4 py-2 text-small font-semibold text-admin-sidebar transition hover:bg-primary-50"
        >
          <span>خروج از پنل ادمین</span>
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
