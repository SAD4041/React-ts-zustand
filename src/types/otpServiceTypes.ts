// src/types/otpServiceTypes.ts

export interface CheckPhonePayload {
  mobile: string;
}

export interface CheckPhoneResponse {
  message: string;
  // هر فیلد دیگه‌ای که بک برمی‌گردونه
}

export interface VerifyCodePayload {
  mobile: string;
  otp: string;
}

export interface VerifyCodeResponse {
  message: string;
  userExist: boolean;
  token: string;
  
  // اطلاعات اضافی که ممکنه از بک بیاد
  userId?: string;
  role?: 'user' | 'brand' | 'admin';
  isBrand?: boolean;
  name?: string;
  avatar?: string;
  email?: string;
  
  // هر فیلد دیگه‌ای
  [key: string]: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}