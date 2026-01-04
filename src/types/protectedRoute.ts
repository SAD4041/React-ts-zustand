export type UserRole = 'user' | 'brand' | string;

export interface ProtectedRouteProps {
  children: React.ReactNode;
  /**
   * لیست نقش‌های مجاز — اگر مشخص نشد، هر کاربر لاگین‌شده (با هر نقشی) دسترسی دارد
   * 
   * مثال:
   *   allowedRoles={['brand']} → فقط برندها
   *   allowedRoles={['user']} → فقط کاربران عادی
   *   allowedRoles={['admin']} → فقط ادمین‌ها
   *   allowedRoles={['user', 'brand']} → همه لاگین‌شده‌ها
   *   allowedRoles={[]} یا undefined → همه لاگین‌شده‌ها (پیش‌فرض)
   */
  allowedRoles?: UserRole[];
}