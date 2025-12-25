// src/services/authService.ts
import type {
  LoginPayload,
  RegisterPayload,
  RegisterSuccessResponse,      
  VerifyOtpPayload,
  VerifyOtpSuccessResponse,     
} from "@/types/authTypes";

import { postData } from "./services";

/* -----------------------------------------
   LOGIN – مرحله ۱ (ارسال OTP با ایمیل)
   ریسپانس: status 200, message "OTP sent...", data: null
----------------------------------------- */
export const loginService = async (
  payload: LoginPayload
): Promise<RegisterSuccessResponse> => {
  return postData({
    endPoint: "/v1/auth/login", // endpoint واقعی رو خودت می‌ذاری
    data: payload,
  });
};

/* -----------------------------------------
   REGISTER – مرحله ۱ (ارسال OTP بعد از فرم ثبت نام)
   ریسپانس: status 200, message "OTP sent...", data: null
----------------------------------------- */
export const registerService = async (
  payload: RegisterPayload
): Promise<RegisterSuccessResponse> => {
  return postData({
    endPoint: "/v1/auth/signup", // endpoint واقعی رو خودت می‌ذاری
    data: payload,
  });
};

/* -----------------------------------------
   VERIFY OTP – مرحله ۲ (نتیجه‌ی نهایی: ساخت اکانت یا لاگین)
   ریسپانس موفق: status 201 یا 200 + user + tokens
----------------------------------------- */
export const verifyOtpSignupService = async (
  payload: VerifyOtpPayload
): Promise<VerifyOtpSuccessResponse> => {
  return postData({
    endPoint: "/v1/auth/signup/verify", // endpoint واقعی رو خودت می‌ذاری
    data: payload,
  });
};

export const verifyOtpLoginService = async (
  payload: VerifyOtpPayload
): Promise<VerifyOtpSuccessResponse> => {
  return postData({
    endPoint: "/v1/auth/login/verify", // endpoint واقعی رو خودت می‌ذاری
    data: payload,
  });
};
