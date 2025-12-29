import { X } from 'lucide-react';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback.tsx";
// 🌟 ایمپورت کردن Typeهای مرکزی
import type { OrderDetailsType } from "@/types/orderTypes"; 
// import type { OrderItem } from "@/types/orderTypes"; 
interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  // استفاده از OrderDetailsType که در فایل types تعریف شد
  order: OrderDetailsType; 
}

export function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  if (!isOpen) return null;

  const handleItemClick = (itemId: string) => {
    console.log(`رفتن به صفحه محصول با شناسه: ${itemId}`);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      dir="rtl"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[80vh] overflow-y-auto p-4">
        {/* هدر */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold">جزئیات سفارش #{order.id}</h2>
            <p className="text-gray-600 text-sm mt-1">تاریخ: {order.orderDate}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* محتوای اصلی */}
        <div className="mt-4 space-y-3">
          {order.details.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="flex gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm cursor-pointer"
            >
              {/* تصویر محصول */}
              <div className="flex-shrink-0">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>

              {/* اطلاعات محصول */}
              <div className="flex-1 text-sm">
                <h3 className="font-semibold">{item.name}</h3>
                <div className="flex flex-col gap-1 text-gray-600 mt-1">
                  <div className="flex gap-3">
                    <span>سایز: <span className="text-gray-900">{item.size}</span></span>
                    <span>رنگ: <span className="text-gray-900">{item.color}</span></span>
                  </div>
                  <div>
                    تعداد: <span className="text-gray-900">{item.count}</span>
                  </div>
                </div>
              </div>

              {/* قیمت */}
              <div className="flex-shrink-0 text-left text-sm font-semibold text-blue-600">
                {item.cost} تومان
              </div>
            </div>
          ))}
        </div>

        {/* جمع کل */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between font-semibold text-gray-700">
          <span>جمع کل:</span>
          <span className="text-blue-600">{order.totalPrice} تومان</span>
        </div>
      </div>
    </div>
  );
}