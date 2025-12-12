// src/services/userDashInfoService.ts
import {
  getData,
  putData,
  postImageData,
} from "./services";
import type { UserInfo } from "@/types/UserDashInfoTypes";

// --- 1. دریافت پروفایل ---
export const getUserProfile = async (): Promise<UserInfo> => {
  const data = await getData({ endPoint: "/api/user/profile" });

  // استخراج id اگر وجود داشت
  const id = data.id ? String(data.id) : undefined;

  return {
    id,
    firstName: data.name || "",
    lastName: data.Fname || "",
    email: data.email || "",
    phone: data.user_mobile || "",
    nationalCode: "",
    birthDate: "",
    shabaNumber: "",
    avatar: data.avatar_url || data.avatar || null,
  };
};

// --- 2. بروزرسانی پروفایل ---
export const updateUserProfile = async (userInfo: Partial<UserInfo>): Promise<UserInfo> => {
  // گرفتن ID — اگر نبود، فرض می‌کنیم ID=1 (یا باید از localStorage بخونی)
  const userId = userInfo.id || "1";

  const payload = {
    name: userInfo.firstName,
    Fname: userInfo.lastName,
    email: userInfo.email,
    user_mobile: userInfo.phone,
  };

  const res = await putData({
    endPoint: `/api/user/profile/${userId}/update`,
    data: payload,
  });

  return {
    id: userId,
    firstName: res.name || "",
    lastName: res.Fname || "",
    email: res.email || "",
    phone: res.user_mobile || "",
    nationalCode: "",
    birthDate: "",
    shabaNumber: "",
    avatar: res.avatar_url || res.avatar || null,
  };
};

// --- 3. آپلود آواتار ---
export const uploadUserAvatar = async (file: File): Promise<{ avatar_url: string }> => {
  const formData = new FormData();
  formData.append("avatar", file);

  // فرض: ID=1 — بعداً می‌تونی از context یا state بگیری
  const res = await postImageData({
    endPoint: `/api/user/profile/1/Imageupdate`,
    data: formData,
  });

  return res;
};