import { baseURL, getData, putData, postImageData } from "@/services/services";
import type { UserInfo } from "@/types/UserDashInfoTypes";

/**
 * دریافت اطلاعات پروفایل کاربر
 */
export const getUserProfile = async (): Promise<UserInfo> => {
  try {
    const response = await getData({ endPoint: "/api/user/profile" });

    if (!response) {
      throw new Error("پاسخ نامعتبر هنگام دریافت اطلاعات پروفایل");
    }

    // تبدیل داده‌ها از ساختار API به ساختار مصرف‌کننده
    return {
      id: String(response.user_id || ""),
      firstName: response.name || "",
      lastName: response.family || "", 
      email: response.email || "",
      phone: response.mobile || "", 
      avatar: response.picture
        ? (response.picture.startsWith("http")
            ? response.picture
            : `${baseURL.replace(/\/+$/, "")}/${String(response.picture).replace(/^\/+/, "")}`)
        : null,
      birthDate: "", 
    };

  } catch (error: any) {
    console.error("Failed to fetch user profile", error);
    
    // در صورت خطای 404 (عدم یافتن کاربر به هر دلیل)
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
    throw new Error("خطای ناشناخته هنگام دریافت اطلاعات پروفایل");
  }
};

/**
 * به‌روزرسانی اطلاعات پروفایل کاربر
 */
export const updateUserProfile = async (data: Partial<UserInfo>): Promise<UserInfo> => {
  try {
    // آماده‌سازی payload مطابق با UserUpdateProfileRequest در بک‌اند
    const payload = {
      name: data.firstName || "",        // معادل $data['name']
      Fname: data.lastName || "",       // معادل $data['Fname']
      email: data.email || "",
      user_mobile: data.phone || "",    // معادل $data['user_mobile']
      role: 'C',                         // نقش کاربر (Consumer) برای محدودیت‌های بک‌اند
    };

    console.log("در حال ارسال به‌روزرسانی پروفایل با داده:", payload);

    await putData({
      endPoint: "/api/user/profile/update",
      data: payload,
    });

    // پس از به‌روزرسانی موفق، داده تازه را دریافت می‌کنیم
    return getUserProfile();
  } catch (error: any) {
    console.error("Failed to update user profile", error);
    const errorMessage = error.response?.data?.message || "خطا در به‌روزرسانی اطلاعات پروفایل";
    throw new Error(errorMessage);
  }
};

/**
 * آپلود تصویر پروفایل کاربر
 */
export const uploadUserAvatar = async (file: File): Promise<{ avatar_url: string }> => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await postImageData({
      endPoint: "/api/user/profile/Imageupdate",
      data: formData,
    });

    // انتظار می‌رود 'url' در پاسخ موجود باشد؛ در PHP نام متد updateImageprofile است
    const joinWithBase = (path: string) =>
      `${baseURL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;

    const avatar_url =
      typeof response?.url === "string" && response.url
        ? response.url
        : response?.path
          ? joinWithBase(response.path)
          : "";

    return { avatar_url };
  } catch (error) {
    console.error("Failed to upload avatar", error);
    throw new Error("خطا در آپلود تصویر پروفایل");
  }
};
