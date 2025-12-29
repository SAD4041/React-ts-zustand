/* =========================
   Shared Primitive Types
   ========================= */

// عددی که ممکن است از بک string یا number باشد
export type NumericString = string | number;

// تاریخ به صورت string (ISO یا شمسی)
// فرانت مسئول فرمت‌دهی است
export type DateString = string;

/* =========================
   Order (List / History)
   ========================= */

export interface Order {
  id: string;            // شناسه سفارش
  date: DateString;      // تاریخ ثبت سفارش
  amount: NumericString; // مبلغ کل سفارش
  status: string;        // وضعیت سفارش (تنها منبع وضعیت)
  items: number;         // تعداد اقلام
}

export interface OrderHistoryData {
  current: Order[];
  past: Order[];
  cancelled: Order[];
}

/* =========================
   Order Item (Details)
   ========================= */

export interface OrderItem {
  id: string;                 // شناسه آیتم سفارش
  productId?: string;         // برای رفتن به صفحه محصول
  name: string;               // نام محصول
  image: string;              // URL یا path تصویر
  size: string;               // سایز
  color: string;              // رنگ
  cost: NumericString;       // قیمت واحد
  count: number;           // تعداد
}

/* =========================
   Order Details
   ========================= */

export interface OrderDetailsType {
  id: string;            // شناسه سفارش
  orderDate: DateString;      // تاریخ سفارش
  status?: string;            // وضعیت سفارش (optional برای عدم شکستن mock)
  totalPrice: NumericString;  // جمع کل
  details: OrderItem[];
}
