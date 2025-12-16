import { data } from "react-router-dom";
import {
  getData,
  putData,
  postImageData,
} from "./services";
import type { UserInfo } from "@/types/UserDashInfoTypes";
const END_POINT = "/userInfo";

export const getUserProfile = async (): Promise<UserInfo> => {
  const data = await getData({
    // endPoint: "/api/user",
    endPoint: END_POINT,
  });

  console.log("PROFILE RESPONSE 👉", data);
  console.log("RAW API RESPONSE 👉", JSON.stringify(data, null, 2));

  const user = data.find((u:UserInfo) => u.id === "1");

  return {
    id: String(user.id),
    firstName: user.name ?? "",
    lastName: user.Fname ?? "",
    email: user.email ?? "",
    phone: user.user_mobile ?? "",
    birthDate: user.birthdate ?? "",
    avatar: user.avatar_url ?? null,
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
    endPoint: `${END_POINT}/${userId}`,
    data: payload,
  });

  return {
    id: userId,
    firstName: res.name || "",
    lastName: res.Fname || "",
    email: res.email || "",
    phone: res.user_mobile || "",
    birthDate: "",
    avatar: res.avatar_url || res.avatar || null,
  };
};

export const uploadUserAvatar = async (file: File): Promise<{ avatar_url: string }> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await postImageData({
    endPoint: END_POINT,
    data: formData,
  });

  return res;
};