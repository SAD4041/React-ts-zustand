// src/layouts/PublicLayout/SidebarLayout.tsx
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

export default function SidebarLayout() {
  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-background">
        {/* فقط children را نمایش می‌دهیم — React Router خودش اینجا محتوای فرزند را قرار می‌دهد */}
        {/* ⚠️ اما باید children را دریافت کنیم */}
        {/* پس یکبار دیگر: children باید باشه، ولی می‌تونه optional باشه */}
        { /* children رو از props بگیریم */ }
      </div>
      <Header />
      <Outlet />
      <Sidebar />
      
    </div>
  );
}