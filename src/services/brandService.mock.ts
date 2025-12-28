// src/services/brandService.mock.ts

export const getBrandProfile = async () => {
  return {
    manager_id: 1,
    brand: "Test Market",
    description: "This is a mock description.",
    logo: "/placeholder-logo.png",
    baner: "/placeholder-banner.png",
    email: "test@example.com",
    mobile: "09120000000",
    address: "Mock Street 123",
  };
};

export const updateBrandProfile = async (data: any) => {
  console.log("MOCK - Updating profile with:", data);
  return data; // instantly return the same data
};
