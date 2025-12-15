import {
  getData,
  putData,
  postImageData,
} from "./services";
import type { UserInfo } from "@/types/UserDashInfoTypes";


export const getUserProfile = async (): Promise<UserInfo> => {
  const data = await getData({
    endPoint: "/api/user",
  });

  console.log("PROFILE RESPONSE 👉", data);
  console.log("RAW API RESPONSE 👉", JSON.stringify(data, null, 2));

  return {
    id: String(data.id),
    firstName: data.name ?? "",
    lastName: data.Fname ?? "",
    email: data.email ?? "",
    phone: data.user_mobile ?? "",
    nationalCode: "",
    birthDate: "",
    shabaNumber: "",
    avatar: data.avatar_url ?? null,
  };
};


export const updateUserProfile = async (userInfo: Partial<UserInfo>): Promise<UserInfo> => {
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

export const uploadUserAvatar = async (file: File): Promise<{ avatar_url: string }> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await postImageData({
    endPoint: `/api/user/profile/1/Imageupdate`,
    data: formData,
  });

  return res;
};