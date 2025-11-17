import { getData, putData } from "./services";
import type { FollowStats, UserSummary } from "@/types/userTypes";
import type { UpdateProfileRequest } from "@/types/updateProfileTypes";

export interface PutUserProfileParams {
  userId: string | number;
  data: UpdateProfileRequest;
}


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
