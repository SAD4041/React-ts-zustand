// src/constants/sidebarItems.ts
import type { NavItem } from '@/types/sidebarTypes';
import { Home, User, Settings, LogOut } from 'lucide-react'; // یا هر آیکونی که استفاده می‌کنید
import { useNavigate } from 'react-router-dom'; // ⚠️ فقط داخل کامپوننت می‌شود استفاده کرد

// ❗ توجه: onClick نمی‌تواند مستقیماً در اینجا با useNavigate باشد (چون غیر از کامپوننت است)
// پس onClick را بعداً در کامپوننت Sidebar ست کنید — یا فقط path ذخیره کنید

export const DASHBOARD_SIDEBAR_ITEMS: Omit<NavItem, 'onClick'>[] = [
  { id: 'home', label: 'خانه', icon: <Home size={24} />, path: '/dash' },
  { id: 'profile', label: 'پروفایل', icon: <User size={24} />, path: '/dash/profile' },
  { id: 'settings', label: 'تنظیمات', icon: <Settings size={24} />, path: '/dash/settings' },
  { id: 'logout', label: 'خروج', icon: <LogOut size={24} />, path: '/logout' }, // مثلاً
];