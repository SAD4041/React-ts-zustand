// ===========================
// مشترک‌ها
// ===========================

// یوزر + توکن‌ها (در لاگین و verify OTP برمی‌گرده)
export interface AuthUserWithTokens {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  access_token: string;
  refresh_token: string;
}

// ===========================
// LOGIN (ایمیل + OTP)
// ===========================

// مرحله‌ی اول لاگین: فقط ایمیل می‌فرستی
export interface LoginPayload {
  email: string;
}

// ریسپانس موفق نهایی لاگین (بعد از تایید OTP)
// این همون چیزی‌ه که دادی: status 200 + "login successful" + user + tokens
export interface LoginSuccessResponse {
  status: number;          // 200
  message: string;         // "login successful"
  data: AuthUserWithTokens;
}

// ریسپانس خطای لاگین (مثلاً ایمیل اشتباه، یا OTP اشتباه در جریان لاگین)
export interface LoginErrorResponse {
  status: number;          // مثلا 401
  message: string;         // مثلا "invalid email" یا "invalid code"
  data: null;
}

// ===========================
// REGISTER (فرم + ارسال OTP)
// ===========================

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  tshirt_size: string;
  university: string;
}

// ریسپانس موفق ثبت‌نام (فقط ارسال OTP)
export interface RegisterSuccessResponse {
  status: number;   // 200
  message: string;  // "OTP sent to your email"
  data: null;
}

// خطای ثبت‌نام (مثلاً تکراری بودن ایمیل/شماره)
export interface RegisterErrorResponse {
  status: number;   // 409
  messages: {
    phone?: {
      "already exists"?: string;
    };
    email?: {
      "already exists"?: string;
    };
    [key: string]: any;
  };
  data: null;
}

// ===========================
// OTP VERIFY (برای ثبت‌نام و لاگین)
// ===========================

// بدنه‌ی درخواست verify OTP
// هم در مرحله‌ی نهایی ثبت‌نام استفاده می‌شود، هم مرحله‌ی نهایی لاگین
export interface VerifyOtpPayload {
  email: string;
  code: string;  // "808921"
}

// موفقیت در verify OTP:
// - در سناریوی ثبت‌نام: status 201, message: "account created successfully"
// - در سناریوی لاگین: status 200, message: "login successful" (اگر اینجا استفاده‌اش کنی)
// شکل data در هر دو یکی است (AuthUserWithTokens)
export interface VerifyOtpSuccessResponse {
  status: number;          // 200 یا 201
  message: string;         // "account created successfully" | "login successful" | ...
  data: AuthUserWithTokens;
}

// خطا در verify OTP (برای ثبت‌نام یا لاگین)
export interface VerifyOtpErrorResponse {
  status: number;      // 404
  message: string;     // "OTP not found or expired"
  data: null;
}
