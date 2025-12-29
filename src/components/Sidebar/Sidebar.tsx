// src/components/Sidebar/Sidebar.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { NavItem } from "@/types/sidebarTypes";

type SidebarProps = {
  items: NavItem[];
  className?: string;
};

export default function Sidebar({ items, className }: SidebarProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const topItems = items.slice(0, -1);
  const bottomItem = items[items.length - 1];

  const handleClick = (item: NavItem) => {
    setActiveId(item.id);
    if (item.onClick) {
      item.onClick();
      return;
    }

    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div
      className={`h-full bg-sidebar shadow-lg transition-all duration-300 ease-in-out ${isHovered ? "w-72" : "w-20"
        } ${className ?? ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: "vazirmatn, sans-serif" }}
    >
      <nav className="flex h-full flex-col justify-between overflow-y-auto py-4">
        <div>
          {topItems.map((item) => {
            const isActive = item.id === activeId;
            return (
              <div
                key={item.id}
                onClick={() => handleClick(item)}
                className={`relative flex cursor-pointer items-center justify-end px-9 py-6 transition-colors duration-200
                  ${isActive ? "bg-muted border-r-4 border-primary" : "hover:bg-muted-foreground"}
                `}
              >
                <span
                  className={`mr-14 whitespace-nowrap text-2xl text-foreground transition-all duration-300
                    ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}
                    ${isActive ? "font-bold" : ""}
                  `}
                >
                  {item.label}
                </span>
                <div className="shrink-0 text-foreground [&>svg]:h-8 [&>svg]:w-8">
                  {item.icon}
                </div>
              </div>
            );
          })}
        </div>

        {bottomItem && (
          <div>
            {(() => {
              const isActive = bottomItem.id === activeId;
              return (
                <div
                  key={bottomItem.id}
                  onClick={() => handleClick(bottomItem)}
                  className={`relative flex cursor-pointer items-center justify-end px-9 py-4 transition-colors duration-200
                    ${isActive ? "bg-muted border-r-4 border-primary" : "hover:bg-muted-foreground"}
                  `}
                >
                  <span
                    className={`mr-14 whitespace-nowrap text-2xl text-foreground transition-all duration-300
                      ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}
                      ${isActive ? "font-bold" : ""}
                    `}
                  >
                    {bottomItem.label}
                  </span>
                  <div className="shrink-0 text-foreground [&>svg]:h-8 [&>svg]:w-8">
                    {bottomItem.icon}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </nav>
    </div>
  );
}
