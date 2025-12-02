// src/services/brandService.mock.ts

export const getBrandProfile = async () => {
  return {
    maket_name: "Test Market",
    description: "This is a mock description.",
    mobile: "09120000000",
    email: "test@example.com",
    address: "Mock Street 123",
    logo: "/placeholder-logo.png",
    banner: "/placeholder-banner.png",
  };
};

export const updateBrandProfile = async (data: any) => {
  console.log("MOCK - Updating profile with:", data);
  return data; // instantly return the same data
};
