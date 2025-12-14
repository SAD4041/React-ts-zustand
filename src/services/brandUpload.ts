import {  putImageData } from "@/services/services";
const getUserId = () => localStorage.getItem("userId");

// ---------- UPLOAD PROFILE IMAGE ----------
export const uploadProfileImage = (file: File) => {
  const userId = getUserId();
  const formData = new FormData();
  formData.append("file", file);

  return putImageData({
    endPoint: `/api/manager/profile/${userId}/update/image`,
    data: formData,
  });
};

// ---------- UPLOAD BANNER IMAGE ----------
export const uploadBannerImage = (file: File) => {
  const userId = getUserId();
  const formData = new FormData();
  formData.append("file", file);

  return putImageData({
    endPoint: `/api/manager/profile/${userId}/update/banerimage`,
    data: formData,
  });
};
