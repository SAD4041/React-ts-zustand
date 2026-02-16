// src/services/brandService.ts

import { getData, putData } from "@/services/services";
import type { BrandProfilePayload } from "@/types/brandProfileTypes";

// ---------- GET profile ----------
export const getBrandProfile = () => {
  return getData({ endPoint: "/api/manager/profile" });
};

// ---------- UPDATE profile ----------
export const updateBrandProfile = (data: BrandProfilePayload) => {
  return putData({
    endPoint: `/api/manager/profile/update`,
    data,
  });
};

