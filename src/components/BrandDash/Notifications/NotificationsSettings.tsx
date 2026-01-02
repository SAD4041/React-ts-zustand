import { useState } from "react";
import ToggleSwitch from "@/components/BrandDash/Notifications/ToggleSwitch";

export default function NotificationsSettings() {
  const [newOrder, setNewOrder] = useState(true);
  const [cancelOrder, setCancelOrder] = useState(true);
  const [inventory, setInventory] = useState(false);

  return (
    
    <div
      dir="rtl"
      className="
        rounded-[11px]
        border-1
        border-[#C0C0C0]
        bg-white
        p-4
        md:p-6
        shadow-[0_4px_8px_rgba(0,0,0,0.08)]
        space-y-6
        md:space-y-10
        "
    >
      {/* تیتر کارت */}
      <h2 className="text-right text-sm md:text-base font-semibold text-gray-900">
        اعلان‌های سفارش
      </h2>

      {/* سفارش جدید */}
      <div className="flex flex-col items-end gap-3 md:flex-row md:items-center md:justify-between">
        <div className="w-full text-right space-y-1 md:w-auto">
          <p className="text-sm font-medium text-gray-800">
            سفارش جدید
          </p>
          <p className="text-xs text-gray-500">
         </p>
        </div>

        <ToggleSwitch
          checked={newOrder}
          onChange={() => setNewOrder(!newOrder)}
        />
      </div>

      {/* لغو سفارش */}
      <div className="flex flex-col items-end gap-3 md:flex-row md:items-center md:justify-between">
        <div className="w-full text-right space-y-1 md:w-auto">
          <p className="text-sm font-medium text-gray-800">
            لغو سفارش
          </p>
          <p className="text-xs text-gray-500">
          هنگام لغو سفارش توسط مشتری           </p>
        </div>

        <ToggleSwitch
          checked={cancelOrder}
          onChange={() => setCancelOrder(!cancelOrder)}
        />
      </div>

      {/* موجودی محصولات */}
      <div className="flex flex-col items-end gap-3 md:flex-row md:items-center md:justify-between">
        <div className="w-full text-right space-y-1 md:w-auto">
          <p className="text-sm font-medium text-gray-800">
            موجودی محصولات
          </p>
          <p className="text-xs text-gray-500">
            هشدار کمبود موجودی محصولات  </p>
        </div>

        <ToggleSwitch
          checked={inventory}
          onChange={() => setInventory(!inventory)}
        />
      </div>
    </div>
  );
}
