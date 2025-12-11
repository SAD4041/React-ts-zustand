// src/services/brandService.ts

import { getData, patchData, putImageData } from "@/services/services";
import type { BrandProfilePayload } from "@/types/brandProfileTypes";
localStorage.setItem("userId", "3");

const getUserId = () => localStorage.getItem("userId");

// ---------- GET profile ----------
export const getBrandProfile = () => {
  const userId = getUserId();
  return getData({ endPoint: `/api/manager/profile/${userId}` });
};

// ---------- UPDATE profile ----------
export const updateBrandProfile = (data: BrandProfilePayload) => {
  const userId = getUserId();
  return patchData({
    endPoint: `/api/manager/profile/${userId}/update`,
    data,
  });
};

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
