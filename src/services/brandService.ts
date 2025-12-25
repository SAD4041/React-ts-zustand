// src/services/brandService.ts

import { getData, putData } from "@/services/services";
import type { BrandProfilePayload } from "@/types/brandProfileTypes";

const getMarketId = () =>
  localStorage.getItem("marketId") ?? localStorage.getItem("userId");

// ---------- GET profile ----------
export const getBrandProfile = () => {
  return getData({ endPoint: "/api/manager/profile" });
};

// ---------- UPDATE profile ----------
export const updateBrandProfile = (data: BrandProfilePayload) => {
  const marketId = getMarketId();
  return putData({
    endPoint: `/api/manager/profile/${marketId}/update`,
    data,
  });
};

