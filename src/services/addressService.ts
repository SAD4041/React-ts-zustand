import type { Address } from "@/types/UserDashInfoTypes";
import { mockAddresses } from "@/data/userDashInfo.mock";

let addressList: Address[] = mockAddresses.map((address) => ({ ...address }));

const cloneAddresses = () => addressList.map((address) => ({ ...address }));

export const getUserAddresses = async (): Promise<Address[]> => {
  return cloneAddresses();
};

export const addAddress = async (addr: Omit<Address, "id" | "userId">): Promise<Address> => {
  if (addr.isDefault) {
    addressList = addressList.map((address) => ({ ...address, isDefault: false }));
  }

  const newAddress: Address = {
    id: Date.now().toString(),
    userId: "1",
    ...addr,
  };

  addressList = [...addressList, newAddress];
  return { ...newAddress };
};

export const updateAddress = async (
  id: string,
  addr: Partial<Omit<Address, "id" | "userId">>
): Promise<Address> => {
  let updated: Address | null = null;

  addressList = addressList.map((address) => {
    if (address.id !== id) {
      if (addr.isDefault) {
        return { ...address, isDefault: false };
      }
      return address;
    }

    updated = { ...address, ...addr } as Address;
    return updated;
  });

  if (!updated) {
    throw new Error("Address not found");
  }

  return { ...updated };
};

export const deleteAddress = async (id: string): Promise<void> => {
  addressList = addressList.filter((address) => address.id !== id);
};
