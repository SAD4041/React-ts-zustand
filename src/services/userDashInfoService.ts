import { getData, putData, postImageData } from "@/services/services";
import type { UserInfo } from "@/types/UserDashInfoTypes";

/**
 * دریافت اطلاعات پروفایل کاربر
 */
export const getUserProfile = async (): Promise<UserInfo> => {
  try {
    const response = await getData({ endPoint: "/api/user/profile" });

    if (!response) {
      throw new Error("پاسخی از سرور دریافت نشد");
    }

    // نگاشت فیلدهای دیتابیس (Consumer) به مدل فرانت‌اِند
    return {
      id: String(response.user_id || ""),
      firstName: response.name || "",
      lastName: response.family || "", 
      email: response.email || "",
      phone: response.mobile || "", 
      avatar: response.picture || null,
      birthDate: "", 
    };

  } catch (error: any) {
    console.error("Failed to fetch user profile", error);
    
    // مدیریت ارور 404 (اگر کاربر هنوز پروفایل نساخته است)
    if (error.response?.status === 404) {
      return {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        avatar: null,
        birthDate: "",
      };
    }
    throw new Error("خطا در دریافت اطلاعات پروفایل");
  }
};

/**
 * آپدیت اطلاعات پروفایل
 */
export const updateUserProfile = async (data: Partial<UserInfo>): Promise<UserInfo> => {
  try {
    // پلود مطابق با UserUpdateProfileRequest در بک‌اِند
    const payload = {
      name: data.firstName || "",        // متناظر با $data['name']
      Fname: data.lastName || "",       // متناظر با $data['Fname']
      email: data.email || "",
      user_mobile: data.phone || "",    // متناظر با $data['user_mobile']
      role: 'C',                         // نقش کاربر (Consumer) برای جلوگیری از ارور
    };

    console.log("در حال ارسال اطلاعات به سرور:", payload);

    await putData({
      endPoint: "/api/user/profile/update",
      data: payload,
    });

    // دریافت اطلاعات تازه‌سازی شده پس از آپدیت
    return getUserProfile();
  } catch (error: any) {
    console.error("Failed to update user profile", error);
    const errorMessage = error.response?.data?.message || "خطا در ذخیره اطلاعات شخصی";
    throw new Error(errorMessage);
  }
};

/**
 * آپلود تصویر پروفایل
 */
export const uploadUserAvatar = async (file: File): Promise<{ avatar_url: string }> => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await postImageData({
      endPoint: "/api/user/profile/Imageupdate",
      data: formData,
    });

    // فیلد 'url' از پاسخ متد updateImageprofile در PHP
    return { avatar_url: response.url };
  } catch (error) {
    console.error("Failed to upload avatar", error);
    throw new Error("خطا در آپلود تصویر");
  }
};