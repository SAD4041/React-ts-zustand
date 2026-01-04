// src/layouts/PublicLayout/SidebarLayout.tsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar/Sidebar";
import {
  BRAND_DASHBOARD_SIDEBAR_ITEMS,
  USER_DASHBOARD_SIDEBAR_ITEMS,
} from "@/pages/SidebarConstant";
import type { NavItem } from "@/types/sidebarTypes";
import useUserStore from "@/store/userStore/userStore";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function SidebarLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const clearAuth = useUserStore((state) => state.clearAuth);

  const isBrandDashboard =
    location.pathname.includes("/brand/");

  const baseItems = isBrandDashboard
    ? BRAND_DASHBOARD_SIDEBAR_ITEMS
    : USER_DASHBOARD_SIDEBAR_ITEMS;

  const items: NavItem[] = baseItems.map((item) => ({
    ...item,
    onClick: () => {
      if (item.id === "logout") {
        clearAuth();
        navigate("/login");
        return;
      }

      navigate(item.path);
    },
  }));

  return (
    <div className="min-h-screen bg-background grid grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="grid w-full flex-1 grid-cols-1 md:grid-cols-[1fr_auto] md:grid-rows-1 md:items-stretch">
        <main className="min-w-0 pb-16 md:pb-0">
          <Outlet />
        </main>
        <aside className="hidden md:block md:h-full">
          <Sidebar items={items} className="rounded-none" />
        </aside>
      </div>
      <Footer />
      <aside className="fixed inset-x-0 bottom-0 z-30 md:hidden">
        <Sidebar items={items} className="rounded-none" />
      </aside>
    </div>
  );
}


