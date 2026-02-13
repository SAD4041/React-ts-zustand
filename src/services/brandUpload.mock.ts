export const uploadProfileImage = async (_file: File) => {
  return {
    success: true,
    url: "/placeholder-logo.png",
    path: "mock/logo",
  };
};

export const uploadBannerImage = async (_file: File) => {
  return {
    success: true,
    url: "/placeholder-banner.png",
    path: "mock/banner",
  };
};
