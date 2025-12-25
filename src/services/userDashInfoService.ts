import { getData, putData, postImageData } from "@/services/services";
import type { UserInfo } from "@/types/UserDashInfoTypes";

export const getUserProfile = async (): Promise<UserInfo> => {
  try {
    const response = await getData({ endPoint: "/api/user/profile" });

    return {
      id: String(response.user_id),
      firstName: response.name || "",
      lastName: response.family || "",
      email: response.email || "",
      phone: response.mobile || "",
      avatar: response.picture || null,
      birthDate: "", 
    };
  } catch (error) {
    console.error("Failed to fetch user profile", error);
    throw new Error("خطا در دریافت اطلاعات پروفایل");
  }
};

export const updateUserProfile = async (data: Partial<UserInfo>): Promise<UserInfo> => {
  try {
    const payload = {
      name: data.firstName || "",
      Fname: data.lastName || "",
      email: data.email || "",
      user_mobile: data.phone || "",
    };

    await putData({
      endPoint: "/api/user/profile/update",
      data: payload,
    });

    return getUserProfile();
  } catch (error) {
    console.error("Failed to update user profile", error);
    throw new Error("خطا در ذخیره اطلاعات شخصی");
  }
};

export const uploadUserAvatar = async (file: File): Promise<{ avatar_url: string }> => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await postImageData({
      endPoint: "/api/user/profile/Imageupdate",
      data: formData,
    });

    if (response?.success && response.url) {
      return { avatar_url: response.url };
    }

    throw new Error("پاسخ نامعتبر از سرور");
  } catch (error) {
    console.error("Failed to upload avatar", error);
    throw new Error("خطا در آپلود عکس پروفایل");
  }
};