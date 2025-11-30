// src/services/brandService.ts
import { getData, patchData, postImageData } from "@/services/services";

export const getBrandProfile = () => {
  return getData({ endPoint: "/api/manager/profile/3" });
};

export const updateBrandProfile = ( {
  maket_name: string;
  description: string;
  mobile: string;
  email: string;
  address: string;
}) => {
  return patchData({
    endPoint: "/api/manager/profile/3/update",
    data,
  });
};

export const uploadBrandImage = (file: File, type: "logo" | "banner") => {
  const formData = new FormData();
  formData.append("file", file);
  return postImageData({
    endPoint: "/api/upload",
     formData,
  });
};