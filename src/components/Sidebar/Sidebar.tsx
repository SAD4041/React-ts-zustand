import { useState } from 'react';
import type { NavItem, SidebarProps } from '@/types/sidebarTypes.ts';

export default function Sidebar({ items }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const topItems = items.slice(0, items.length - 1);
  const bottomItem = items[items.length - 1];

  const handleClick = (item: NavItem) => {
    setActiveId(item.id);
    item.onClick?.();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-sidebar shadow-lg transition-all duration-300 ease-in-out z-50 ${
        isHovered ? 'w-sidebar' : 'w-sidebar-collapsed'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: 'vazirmatn, sans-serif' }}
    >
      <nav className="flex flex-col h-full py-4 justify-between">

        {/* Top items */}
        <div>
          {topItems.map(item => {
            const isActive = item.id === activeId;

            return (
              <div
                key={item.id}
                onClick={() => handleClick(item)}
                className={`relative flex items-center justify-end px-9 py-6 cursor-pointer transition-colors duration-200
                  ${isActive ? 'bg-muted border-r-4 border-primary' : 'hover:bg-muted-foreground'}
                `}
              >
                <span
                  className={`text-foreground text-2xl mr-14 whitespace-nowrap transition-all duration-300
                    ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
                    ${isActive ? 'font-bold' : ''}
                  `}
                >
                  {item.label}
                </span>

                <div className="flex-shrink-0 text-foreground [&>svg]:w-8 [&>svg]:h-8">
                  {item.icon}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom */}
        <div>
          {bottomItem && (() => {
            const isActive = bottomItem.id === activeId;

            return (
              <div
                key={bottomItem.id}
                onClick={() => handleClick(bottomItem)}
                className={`relative flex items-center justify-end px-9 py-4 cursor-pointer transition-colors duration-200
                  ${isActive ? 'bg-muted border-r-4 border-primary' : 'hover:bg-muted-foreground'}
                `}
              >
                <span
                  className={`text-foreground text-2xl mr-14 whitespace-nowrap transition-all duration-300
                    ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
                    ${isActive ? 'font-bold' : ''}
                  `}
                >
                  {bottomItem.label}
                </span>

                <div className="flex-shrink-0 text-foreground [&>svg]:w-8 [&>svg]:h-8">
                  {bottomItem.icon}
                </div>
              </div>
            );
          })()}
        </div>

      </nav>
    </div>
  );
  
}
