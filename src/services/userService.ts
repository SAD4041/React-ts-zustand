import { getData, putData } from "./services";
import type { FollowStats, UserSummary } from "@/types/userTypes";

// گرفتن اطلاعات کلی کاربر (نام، عکس و ...)
interface UpdateProfileRequest {
  username?: string;
  email?: string;
  bio?: string;
  profile_picture?: string;
}

export const putUserProfileService = async (
  userId: string | number,
  data: UpdateProfileRequest
) => {
  if (!userId) throw new Error("User ID is required");

  return await putData({
    endPoint: `/api/v1/users/profile`,
    data, // باید به صورت key-value جدا باشه
  });
};


// گرفتن اطلاعات کلی کاربر (نام، عکس و ...)
export const getUserProfileService = async (userId: string | number) => {
  if (!userId) throw new Error("User ID is required");
  return await getData({
    endPoint: `/api/v1/users/${userId}`,
  });
};

// گرفتن تعداد followers و following
export const getFollowStatsService = async (userId: string | number): Promise<FollowStats> => {
  if (!userId) throw new Error("User ID is required");
  return await getData({
    endPoint: `/v1/users/${userId}/follow-stats`,
  });
};

// گرفتن لیست فالورها
export const getFollowersService = async (userId: string | number): Promise<UserSummary[]> => {
  if (!userId) throw new Error("User ID is required");
  return await getData({
    endPoint: `/api/v1/users/${userId}/followers`,
  });
};

// گرفتن لیست فالوینگ‌ها
export const getFollowingService = async (userId: string | number): Promise<UserSummary[]> => {
  if (!userId) throw new Error("User ID is required");
  return await getData({
    endPoint: `/api/v1/users/${userId}/following`,
  });
};
