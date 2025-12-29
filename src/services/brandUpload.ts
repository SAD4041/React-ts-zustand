import { postImageData } from "@/services/services";
const getMarketId = () =>
  localStorage.getItem("marketId") ?? localStorage.getItem("userId");

// ---------- UPLOAD PROFILE IMAGE ----------
export const uploadProfileImage = (file: File) => {
  const marketId = getMarketId();
  const formData = new FormData();
  formData.append("logo", file);

  return postImageData({
    endPoint: `/api/manager/profile/${marketId}/update/image`,
    data: formData,
  });
};

// ---------- UPLOAD BANNER IMAGE ----------
export const uploadBannerImage = (file: File) => {
  const marketId = getMarketId();
  const formData = new FormData();
  formData.append("baner", file);

  return postImageData({
    endPoint: `/api/manager/profile/${marketId}/update/banerimage`,
    data: formData,
  });
};
