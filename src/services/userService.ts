import { getData, putData, postData } from "./services";
import type { FollowStats, UserSummary } from "@/types/userTypes";
import type { PutUserProfileParams } from "@/types/putUserProfileTypes";

// آپدیت پروفایل
export const putUserProfileService = async ({
  userId,
  data,
}: PutUserProfileParams) => {
  if (!userId) throw new Error("User ID is required");

  return await putData({
    endPoint: `/api/v1/users/profile`,
    data,
  });
};

// گرفتن اطلاعات کلی کاربر
export const getUserProfileService = async (userId: string | number) => {
  if (!userId) throw new Error("User ID is required");
  return await getData({
    endPoint: `/api/v1/users/profile`,
  });
};

// گرفتن تعداد followers و following
export const getFollowStatsService = async (
  userId: string | number
): Promise<FollowStats> => {
  if (!userId) throw new Error("User ID is required");
  return await getData({
    endPoint: `/api/v1/users/${userId}/follow-stats`,
  });
};

// گرفتن لیست فالورها
export const getFollowersService = async (
  userId: string | number
): Promise<UserSummary[]> => {
  if (!userId) throw new Error("User ID is required");
  return await getData({
    endPoint: `/api/v1/users/${userId}/followers`,
  });
};

// گرفتن لیست فالوینگ‌ها
export const getFollowingService = async (
  userId: string | number
): Promise<UserSummary[]> => {
  if (!userId) throw new Error("User ID is required");
  return await getData({
    endPoint: `/api/v1/users/${userId}/following`,
  });
};

/* ======================================================
   توابع تغییر ایمیل مرحله‌ای با مسیر درست
====================================================== */

// مرحله initiate → ارسال درخواست تغییر ایمیل
export const initiateEmailChangeService = async ({
  new_email,
}: {
  new_email: string;
}) => {
  if (!new_email) throw new Error("New email is required");

  return await postData({
    endPoint: `/api/v1/users/email/change`,
    data: { new_email },
  });
};

// مرحله verify → تایید تغییر ایمیل با کد
export const verifyEmailChangeService = async ({
  old_email,
  new_email,
  code,
}: {
  old_email: string;
  new_email: string;
  code: string;
}) => {
  if (!old_email || !new_email || !code) throw new Error("All fields are required");

  return await postData({
    endPoint: `/api/v1/users/email/verify-change`,
    data: { old_email, new_email, code },
  });
};

// export const updatePostService = async (postId: number, dto: { description?: string; pictures?: string[] }) => {
//   return await putData({ endPoint: `/api/v1/posts/${postId}`, data: dto });
// };

