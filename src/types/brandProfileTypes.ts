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
// نوع داده ذخیره‌شده در state
// ----------------------------
export interface BrandData {
  brand: string;
  description: string;
  mobile: string;
  email: string;
  address: string;

  logoUrl: string;
  bannerUrl: string;
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
