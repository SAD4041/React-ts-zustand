// src/types/brandProfileTypes.ts

import type { Product as BaseProductData } from './productCardTypes';

export interface BrandProduct extends BaseProductData {
  category: string;
  brandId: string | number;
  // اگر فیلدهای دیگری مثل slug, tags, etc. نیاز بود، اینجا اضافه کنید
}

// 🔹 برند — داده اصلی پروفایل
export interface BrandData {
  id: string | number;
  name: string;
  slogan?: string;
  description?: string;
  avatar?: string;
  coverImage?: string;
  isOfficial?: boolean;
  sales: number;        // تعداد کل فروش‌های برند
  followers: number;    // تعداد دنبال‌کنندگان
  rating: number;       // میانگین امتیاز محصولات برند (یا امتیاز اختصاصی برند)
  location?: string;
  phone?: string;
  email?: string;
  since?: string;       // مثلاً "۱۳۹۰"
  logoUrl: string;
  bannerUrl: string;
  promotion?: {
    title: string;
    subtitle: string;
  };
}

// 🔹 گزینه فیلتر (دسته‌بندی)
export interface FilterOption {
  value: string; // 'all', 'makeup', ...
  label: string; // 'همه', 'آرایشی', ...
}

// 🔹 Props کامپوننت‌ها — فقط اینترفیس‌ها، بدون منطق

export interface BrandHeaderProps {
  brandData: BrandData;
}

export interface BrandInfoProps {
  brandData: BrandData;
}

export interface BestSellProps {
  brandData: BrandData;
  products: BrandProduct[]; // ✅ حالا دقیقاً همان محصولاتی که برند دارد
}

export interface FilterOptionsProps {
  options: FilterOption[];
  currentFilter: string;
  onFilterChange: (value: string) => void;
}

export interface BrandProductsSectionProps {
  products: BrandProduct[]; // ✅ همین تایپ — بدون any!
  brandId?: string | number;
}

// ----------------------------
// نوع داده فرم در UI
// ----------------------------
export interface BrandFormValues {
  brand: string;
  description: string;
  mobile: string;
  email: string;
  address: string;

  // این دو فقط برای نمایش تصویر هستند، به API ارسال نمی‌شوند
  logoUrl: string;
  bannerUrl: string;
}

// Props مربوط به کامپوننت ویرایش پروفایل
export interface BrandProfileEditProps {
  brandData: BrandFormValues;
  onSave: (values: BrandFormValues) => Promise<void>;
}


// ----------------------------
// نوع داده‌ای که به API ارسال می‌کنیم
// ----------------------------
export interface BrandProfilePayload {
  brand: string;
  description: string;
  mobile: string;
  email: string;
  address: string;
}
