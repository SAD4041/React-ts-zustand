// src/constants/sidebarItems.ts
import type { NavItem } from "@/types/sidebarTypes";
import { Home, ShoppingBag, Bell, Heart, CircleUserRound, Banana, Settings, LogOut } from "lucide-react";

export const USER_DASHBOARD_SIDEBAR_ITEMS: Omit<NavItem, "onClick">[] = [
  {
    id: "home",
    label: "خانه",
    icon: <Home size={24} />,
    path: "/dash/home",
  },
  {
    id: "notifications",
    label: "اعلان‌ها",
    icon: <Bell size={24} />,
    path: "/dash/",
  },
  {
    id: "likes",
    label: "علاقه‌مندی‌ها",
    icon: <Heart size={24} />,
    path: "/dash/wish-list",
  },
  {
    id: "profile",
    label: "ویرایش اطلاعات",
    icon: <CircleUserRound size={24} />,
    path: "/dash/profile",
  },
  { 
    id: "logout", 
    label: "خروج", 
    icon: <LogOut size={24} />, 
    path: "/logout" 
  },
];

export const BRAND_DASHBOARD_SIDEBAR_ITEMS: Omit<NavItem, "onClick">[] = [
  {
    id: "home",
    label: "خانه",
    icon: <Home size={24} />,
    path: "/dash/brand/home",
  },
  {
    id: "products",
    label: "محصولات",
    icon: <Banana size={24} />,
    path: "/dash/brand/product-management",
  },
  {
    id: "orders",
    label: "سفارش‌ها",
    icon: <ShoppingBag size={24} />,
    path: "/dash/brand/order-management",
  },
  {
    id: "profile",
    label: "ویرایش اطلاعات",
    icon: <CircleUserRound size={24} />,
    path: "/dash/brand/profile-edit",
  },
    {
    id: "settings",
    label: "تنظیمات",
    icon: <Settings size={24} />,
    path: "/dash/brand/settings",
  },
  { 
    id: "logout", 
    label: "خروج", 
    icon: <LogOut size={24} />, 
    path: "/logout" 
  },
];
