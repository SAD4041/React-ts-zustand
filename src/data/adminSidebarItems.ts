// src/data/adminSidebarItems.ts
import {
  ShieldCheck,
  ListChecks,
  Users,
  MessageSquareMore,
  AlertCircle,
  CalendarDays,
  LockKeyhole,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS = [
  { id: "verify-sitter", label: "اعتبارسنجی پت سیتر", icon: ShieldCheck },
  { id: "sitters-list", label: "نمایش لیست پت سیتر", icon: ListChecks },
  { id: "owners-list", label: "نمایش لیست پت اونر", icon: Users },
  { id: "reviews", label: "نمایش نظرات", icon: MessageSquareMore },
  { id: "complaints", label: "نمایش شکایات", icon: AlertCircle },
  { id: "bookings", label: "نمایش رزروها", icon: CalendarDays },
  { id: "access", label: "دسترسی‌ها", icon: LockKeyhole },
] as const;
