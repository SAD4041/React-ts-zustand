import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToggleSwitch from "@/components/BrandDash/Notifications/ToggleSwitch";

export default function ShipmentsSettings() {
  const [normal, setNormal] = useState(true);
  const [fast, setFast] = useState(true);
  const [free, setFree] = useState(false);

  return (
    <div
      dir="rtl"
      className="
        relative
        rounded-[16px]
        bg-white
        px-4
        md:px-6
        pb-4
        md:pb-6
        pt-9
        md:pt-10

        border
        border-[0.5px]
        border-[rgba(192,192,192,0.25)]

        shadow-[0_4px_10px_rgba(0,0,0,0.1)]
      "
    >
      {/* لیبل گوشه بالا راست */}
      <span className="absolute right-4 top-3 text-xs font-medium text-gray-800 md:right-6 md:text-sm">
        روش‌های ارسال
      </span>

      <div className="space-y-3 md:space-y-4">
        {/* ارسال عادی */}
        <ShipmentCard
          title="ارسال عادی"
          description="زمان تحویل ۳ تا ۵ روز کاری"
          enabled={normal}
          onToggle={() => setNormal(!normal)}
          inputPlaceholder="هزینه ارسال (تومان)"
        />

        {/* ارسال سریع */}
        <ShipmentCard
          title="ارسال سریع"
          description="زمان تحویل ۱ تا ۲ روز کاری"
          enabled={fast}
          onToggle={() => setFast(!fast)}
          inputPlaceholder="هزینه ارسال (تومان)"
        />

        {/* ارسال رایگان */}
        <ShipmentCard
          title="ارسال رایگان"
          description="برای سفارش‌های بالای مبلغ مشخص"
          enabled={free}
          onToggle={() => setFree(!free)}
          inputPlaceholder="حداقل مبلغ سفارش (تومان)"
        />
      </div>

      {/* دکمه ذخیره */}
      <div className="mt-6 flex justify-end">
        <button
          className="
            rounded-lg
            bg-rose-600
            px-6
            py-2
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-rose-700
          "
          onClick={() => {
            console.log({ normal, fast, free });
          }}
        >
          ذخیره تغییرات
        </button>
      </div>
    </div>
  );
}

/* =========================
   Card Component (Reusable)
========================= */

interface ShipmentCardProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  inputPlaceholder: string;
}

function ShipmentCard({
  title,
  description,
  enabled,
  onToggle,
  inputPlaceholder,
}: ShipmentCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 md:p-4">
      <div className="flex flex-col items-end gap-3 md:flex-row md:items-center md:justify-between">
        {/* متن */}
        <div className="w-full text-right space-y-1 md:w-auto">
          <p className="text-sm font-medium text-gray-900">
            {title}
          </p>
          <p className="text-xs text-gray-500">
            {description}
          </p>
        </div>

        {/* تاگل */}
        <ToggleSwitch checked={enabled} onChange={onToggle} />
      </div>

      {/* ورودی با انیمیشن نرم */}
      <AnimatePresence initial={false}>
        {enabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 26,
            }}
            className="overflow-hidden"
          >
            <input
              placeholder={inputPlaceholder}
              className="
                mt-3
                w-full
                rounded-lg
                bg-gray-100
                px-3
                py-2
                text-sm
                text-right
                outline-none
              "
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
