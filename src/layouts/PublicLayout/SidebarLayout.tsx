import type { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import type { NavItem } from '@/types/sidebarTypes';

interface SidebarLayoutProps {
  children: ReactNode;
  sidebarItems: NavItem[];
}

export default function SidebarLayout({
  children,
  sidebarItems,
}: SidebarLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-background">
        {children}
      </div>

      {/* Sidebar */}
      <Sidebar items={sidebarItems} />
    </div>
  );
}