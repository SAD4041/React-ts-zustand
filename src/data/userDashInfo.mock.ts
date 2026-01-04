import type { Address, UserInfo } from "@/types/UserDashInfoTypes";

export const mockUserInfo: UserInfo = {
  id: "1",
  firstName: "Ali",
  lastName: "Ahmadi",
  email: "ali.ahmadi@example.com",
  phone: "09123456789",
  birthDate: "1370/01/15",
  avatar: null,
};

export const mockAddresses: Address[] = [
  {
    id: "101",
    userId: "1",
    title: "Home",
    province: "Tehran",
    city: "Tehran",
    fullAddress: "Tehran, Valiasr St, Alley 12, No. 8",
    postalCode: "1234567890",
    isDefault: true,
  },
  {
    id: "102",
    userId: "1",
    title: "Office",
    province: "Tehran",
    city: "Tehran",
    fullAddress: "Tehran, Motahari St, Pars Tower, Floor 5",
    postalCode: "0987654321",
    isDefault: false,
  },
  {
    id: "103",
    userId: "1",
    title: "Warehouse",
    province: "Alborz",
    city: "Karaj",
    fullAddress: "Karaj, Mehrshahr, Street 10, No. 21",
    postalCode: "4332211100",
    isDefault: false,
  },
];

export const mockUserDashInfo = {
  user: mockUserInfo,
  addresses: mockAddresses,
};

export const getMockUserDashInfo = () => ({
  user: { ...mockUserInfo },
  addresses: mockAddresses.map((address) => ({ ...address })),
});
