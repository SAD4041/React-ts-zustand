// src/services/brandService.ts
import { getData, patchData, postImageData } from "@/services/services.ts";

export const getBrandProfile = () => {
  return getData({ endPoint: "/v1/brand/profile" });
};

export const updateBrandProfile = (data: any) => {
  return patchData({ endPoint: "/v1/brand/profile", data });
};

export const uploadBrandImage = (file: File, type: "logo" | "banner") => {
  const formData = new FormData();
  formData.append("file", file);

  return postImageData({
    endPoint: `/v1/upload/${type}`,
    data: formData
  });
};
