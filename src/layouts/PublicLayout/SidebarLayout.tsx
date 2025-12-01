import Sidebar from '@/components/Sidebar/Sidebar';
import type { SidebarLayoutProps } from '@/types/sidebarTypes';

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