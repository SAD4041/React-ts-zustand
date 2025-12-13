// src/services/brandService.ts

import { getData, patchData } from "@/services/services";
import type { BrandProfilePayload } from "@/types/brandProfileTypes";

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

