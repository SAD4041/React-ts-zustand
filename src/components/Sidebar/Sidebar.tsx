import { useState } from 'react';
import type { NavItem } from '@/types/sidebarTypes';

interface SidebarProps {
  items: NavItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const topItems = items.slice(0, items.length - 1);
  const bottomItem = items[items.length - 1];

  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-sidebar shadow-lg transition-all duration-300 ease-in-out z-50 ${
        isHovered ? 'w-[300px]' : 'w-[110px]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: 'vazirmatn, sans-serif' }}
    >
      <nav className="flex flex-col h-full py-4 justify-between">

        {/* Top items */}
        <div>
          {topItems.map(item => (
            <div
              key={item.id}
              onClick={item.onClick}
              className="relative flex items-center justify-end px-9 py-6 cursor-pointer hover:bg-muted-foregound transition-colors duration-200"
            >
              <span
                className={`text-foreground text-2xl mr-14 whitespace-nowrap transition-all duration-300 ${
                  isHovered
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-4 pointer-events-none'
                }`}
              >
                {item.label}
              </span>

              <div className="flex-shrink-0 text-foreground">{item.icon}</div>
            </div>
          ))}
        </div>

        {/* Bottom (logout or last item) */}
        <div>
          {bottomItem && (
            <div
              key={bottomItem.id}
              onClick={bottomItem.onClick}
              className="relative flex items-center justify-end px-9 py-4 cursor-pointer hover:bg-muted-foregound transition-colors duration-200"
            >
              <span
                className={`text-foreground text-2xl mr-14 whitespace-nowrap transition-all duration-300 ${
                  isHovered
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-4 pointer-events-none'
                }`}
              >
                {bottomItem.label}
              </span>

              <div className="flex-shrink-0 text-foreground">{bottomItem.icon}</div>
            </div>
          )}
        </div>

      </nav>
    </div>
  );
}
