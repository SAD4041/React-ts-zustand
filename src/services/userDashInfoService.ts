import type { UserInfo } from "@/types/UserDashInfoTypes";
import { mockUserInfo } from "@/data/userDashInfo.mock";

let userProfile: UserInfo = { ...mockUserInfo };

export const getUserProfile = async (): Promise<UserInfo> => {
  return { ...userProfile };
};

export const updateUserProfile = async (data: Partial<UserInfo>): Promise<UserInfo> => {
  userProfile = { ...userProfile, ...data };
  return { ...userProfile };
};

export const uploadUserAvatar = async (file: File): Promise<{ avatar_url: string }> => {
  // Mimic upload by creating a local preview URL.
  const avatar_url = URL.createObjectURL(file);
  userProfile = { ...userProfile, avatar: avatar_url };
  return { avatar_url };
};
