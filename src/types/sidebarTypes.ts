import type { ReactNode } from 'react';
export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface SidebarProps {
  items: NavItem[];
}

export interface SidebarLayoutProps {
  children: ReactNode;
  sidebarItems: NavItem[];
}