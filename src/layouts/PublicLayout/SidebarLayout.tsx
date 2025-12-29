// src/layouts/PublicLayout/SidebarLayout.tsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar/Sidebar";
import {
  BRAND_DASHBOARD_SIDEBAR_ITEMS,
  USER_DASHBOARD_SIDEBAR_ITEMS,
} from "@/pages/SidebarConstant";
import type { NavItem } from "@/types/sidebarTypes";
import useAuthStore from "@/store/authStore/authStore";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function SidebarLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const clearToken = useAuthStore((state) => state.clearToken);

  const isBrandDashboard =
    location.pathname.includes("/brand-dash");

  const baseItems = isBrandDashboard
    ? BRAND_DASHBOARD_SIDEBAR_ITEMS
    : USER_DASHBOARD_SIDEBAR_ITEMS;

  const items: NavItem[] = baseItems.map((item) => ({
    ...item,
    onClick: () => {
      if (item.id === "logout") {
        clearToken();
        navigate("/login");
        return;
      }

      navigate(item.path);
    },
  }));

  return (
    <div className="bg-background">
      <div className="flex min-h-screen w-full flex-row-reverse">
        <aside className="sticky top-0 h-screen self-start">
          <Sidebar items={items} className="rounded-none" />
        </aside>
        <main className="min-w-0 flex-1">
          <Header />
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
}
