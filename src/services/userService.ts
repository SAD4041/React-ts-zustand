import { getData, putData, postData, deleteData } from "./services";
import type { FollowStats, UserSummary } from "@/types/userTypes";
import type { PutUserProfileParams } from "@/types/putUserProfileTypes";
import type { Challenge, LikeRequest } from "@/types/challengeTypes";
import { categoryNameToId } from "@/data/mockCategories";

// services/userService.ts

export const getMutualFollowersService = async (challengeId: number) => {
  return await getData({
    endPoint: `/api/v1/challenges/${challengeId}/mutual-followers`,
  });
};

export const LikeService = async ({
  entity_type,
  entity_id
}: LikeRequest) => {
  const data = await postData({
    endPoint: `/api/v1/likes`,
    data: { entity_type, entity_id },
  });
  return data;
};

export const UnlikeService = async ({
  entity_type,
  entity_id
}: LikeRequest) => {
  return await deleteData({
    endPoint: `/api/v1/likes`,
    data: { entity_type, entity_id },
  });
};

// گرفتن لیست چالش‌هایی که کاربر در آنها شرکت کرده
export const getParticipatingChallengesService = async (): Promise<Challenge[]> => {
  const response = await getData({ endPoint: `/api/v1/challenges/participating` });
  return response.data; // فقط آرایه
};

export const getPublicChallengesService = async (): Promise<Challenge[]> => {
  const response = await getData({ endPoint: `/api/v1/challenges/public` });
  return response.data; // فقط آرایه
};

export const getPopularChallengesService = async (): Promise<Challenge[]> => {
  const response = await getData({ endPoint: `/api/v1/challenges/like-count` });
  return response.data; // فقط آرایه
};

// گرفتن چالش‌ها بر اساس نوع (برای صفحه اصلی)
export const getChallengesByTypeService = async (type: string): Promise<Challenge[]> => {
  let endPoint = '';
  
  switch(type) {
    case 'popular':
      endPoint = '/api/v1/challenges/like-count';
      break;
    case 'near':
      // اگر API مخصوص چالش‌های نزدیک دارید
      endPoint = '/api/v1/challenges/nearby';
      break;
    case 'following':
      // اگر API مخصوص چالش‌های دنبال‌شوندگان دارید
      endPoint = '/api/v1/challenges/following';
      break;
    default:
      endPoint = '/api/v1/challenges/public';
  }
  
  const response = await getData({ endPoint });
  return response.data || [];
};

export const getChallengesByCategoryService = async (
  categoryName: string
): Promise<Challenge[]> => {
  const response = await getData({ 
    endPoint: `/api/v1/challenges/category-name/${categoryName}` 
  });
  console.log(response);
  return response.data;
};

// گرفتن چالش‌های ساخته شده توسط کاربر
export const getCreatedChallengesService = async (creatorId: number): Promise<Challenge[]> => {
  if (!creatorId) throw new Error("Creator ID is required");

  const response = await getData({
    endPoint: `/api/v1/challenges/creator/${creatorId}`,
  });

  return response.data; // فقط آرایه را برمی‌گرداند
};

// جستجوی چالش‌ها با API بک‌اند
export const searchChallengesService = async (query: string): Promise<{ data: Challenge[] }> => {
  if (!query.trim()) {
    throw new Error("Search query is required");
  }
  
  const response = await getData({
    endPoint: `/api/v1/challenges/search?query=${encodeURIComponent(query)}`,
  });
  
  return {
    data: response.data || []
  };
};

export const searchMyChallengesService = async (query: string): Promise<{ data: Challenge[] }> => {
  if (!query.trim()) {
    throw new Error("Search query is required");
  }
  
  const response = await getData({
    endPoint: `/api/v1/challenges/my/search?query=${encodeURIComponent(query)}`,
  });
  
  return {
    data: response.data || []
  };
};

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
  console.log("iii", userId);

  if (!userId) throw new Error("User ID is required");
  const data = await getData({
    endPoint: `/api/v1/users/profile`,
  });
  console.log("data:", data);

  return data;
};
export const getUserById = async (userId: string | number) => {
  if (!userId) throw new Error("User ID is required");
  return await getData({
    endPoint: `/api/v1/users/${userId}`,
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
  if (!old_email || !new_email || !code)
    throw new Error("All fields are required");

  return await postData({
    endPoint: `/api/v1/users/email/verify-change`,
    data: { old_email, new_email, code },
  });
};

// export const updatePostService = async (postId: number, dto: { description?: string; pictures?: string[] }) => {
//   return await putData({ endPoint: `/api/v1/posts/${postId}`, data: dto });
// };