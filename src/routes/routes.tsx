// src/routes/route.tsx
import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import BrandProfileEditPage from "@/pages/BrandProfileEditPage"; // ✅ فقط این صفحه

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true, // ✅ این یعنی http://localhost:3000/ مستقیماً صفحه ویرایش رو نشون بده
        element: <BrandProfileEditPage />,
      },
      // ❌ همه routeهای قدیمی (Landing, Temp, /brand/:id) حذف شدن
    ],
  },
]);