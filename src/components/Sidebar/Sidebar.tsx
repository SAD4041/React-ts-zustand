// src/components/Sidebar/Sidebar.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_SIDEBAR_ITEMS } from '@/pages/SidebarConstant';
import type { NavItem } from '@/types/sidebarTypes';
import useUserStore from '@/store/userStore/userStore';

// تابع کمکی برای اضافه کردن onClick
const mapItemsWithNavigation = (navigate: (path: string) => void): NavItem[] => {
  return DASHBOARD_SIDEBAR_ITEMS.map(item => ({
    ...item,
    onClick: () => {
      if (item.id === 'logout') {
        // مثلاً logout logic
        useUserStore.getState().setToken(null);
        navigate('/login');
      } else {
        navigate(item.path);
      }
    },
  }));
};

export default function Sidebar() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // آیتم‌ها را با onClick پر می‌کنیم
  const items: NavItem[] = mapItemsWithNavigation(navigate);

  const topItems = items.slice(0, -1);
  const bottomItem = items[items.length - 1];

  const handleClick = (item: NavItem) => {
    setActiveId(item.id);
    item.onClick?.();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-sidebar shadow-lg transition-all duration-300 ease-in-out z-50 ${
        isHovered ? 'w-72' : 'w-20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: 'vazirmatn, sans-serif' }}
    >
      <nav className="flex flex-col h-full py-4 justify-between">
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

        {bottomItem && (
          <div>
            {(() => {
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
        )}
      </nav>
    </div>
  );
  
}
