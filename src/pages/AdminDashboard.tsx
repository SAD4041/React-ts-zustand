// src/pages/admin/AdminDashboardPage.tsx
import { AdminSidebar } from "@/components/Admin/AdminSidebar";
import { AdminContainer } from "@/components/Admin/AdminContainer";

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen" dir="rtl">
     
      <AdminSidebar />

    
      <AdminContainer
        title="داشبورد ادمین"
        description="اینجا  محتوای اصلی داشبورد (لیست کاربران، سفارش‌ها، گزارش‌ها و ...) قرار داده میشود."
      >
        <p className="text-small text-charcoal-700">
         سلام
        </p>
      </AdminContainer>
    </div>
  );
}
