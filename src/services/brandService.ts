// src/services/brandService.ts
import { getData, patchData, postImageData } from "@/services/services";

export interface BrandProfilePayload {
  maket_name: string;
  description: string;
  mobile: string;
  email: string;
  address: string;
  logo?: string;
  banner?: string;
}

/** Get brand profile */
export const getBrandProfile = () => {
  // ⚠ backend hardcoded id = 3 — keep or replace with token-based ID
  return getData({ endPoint: "/api/manager/profile/3" });
};

/** Update brand profile */
export const updateBrandProfile = (data: BrandProfilePayload) => {
  return patchData({
    endPoint: "/api/manager/profile/3/update",
    data,
  });
};

/** Upload brand images (logo/banner) */
export const uploadBrandImage = (file: File, type: "logo" | "banner") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  return postImageData({
    endPoint: "/api/upload",
    data: formData,
  });
};
