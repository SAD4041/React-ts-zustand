// src/pages/OrderHistoryPage.tsx

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ❌ حذف کن — دیگر لازم نیست
// import { getOrderHistory } from "@/services/brandService.mock.ts";
// ❌ این هم لازم نیست
// import { getOrderHistory } from "@/services/orderService";

// ✅ فقط این را ایمپورت کن (Switcher خودش انتخاب می‌کند Mock یا API)
import { getOrderHistory } from "@/services/orderService.api.mock";

import { OrderHistory } from "@/components/OrderHistory/OrderHistory";
import { Spinner } from "@/components/ui/Spinner.tsx";
import type { OrderHistoryData } from "@/types/orderTypes";

const OrderHistoryPage = () => {
  const [data, setData] = useState<OrderHistoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchOrderHistory = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getOrderHistory(); // CHANGED
      setData(res);
    } catch (err) {
      console.error("Error fetching order history:", err);
      navigate("/error500");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchOrderHistory();
  }, [fetchOrderHistory]);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 rtl">
        <div className="text-right mb-6">
          <h1
            className="font-bold vazir"
            style={{ fontSize: "28px", fontWeight: 700 }}
          >
            تاریخچه سفارشات
          </h1>
        </div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 text-destructive text-right rtl vazir">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 text-center text-muted-foreground vazir">
        هیچ داده‌ای برای نمایش وجود ندارد.
      </div>
    );
  }

  return <OrderHistory data={data} />;
};

export default OrderHistoryPage;
