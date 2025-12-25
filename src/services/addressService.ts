import { getData, postData, putData, deleteData } from "@/services/services";
import type { Address } from "@/types/UserDashInfoTypes";

const mapApiToAddress = (api: any): Address => ({
  id: String(api.id),
  userId: String(api.user_id),
  title: api.address_title || "",
  province: api.province || "",
  city: api.city || "",
  fullAddress: api.address_line || "",
  postalCode: api.postal_code || "",
  isDefault: Boolean(api.is_default),
});

const mapAddressToApi = (addr: Omit<Address, "id" | "userId">) => ({
  address_title: addr.title,
  address_line: addr.fullAddress,
  city: addr.city,
  province: addr.province,
  postal_code: addr.postalCode,
  is_default: addr.isDefault,
});

export const getUserAddresses = async (): Promise<Address[]> => {
  try {
    const response = await getData({ endPoint: "/api/user/addresses" });
    return Array.isArray(response) ? response.map(mapApiToAddress) : [];
  } catch (error) {
    console.error("Failed to fetch addresses", error);
    throw new Error("خطا در بارگذاری آدرس‌ها");
  }
};

export const addAddress = async (addr: Omit<Address, "id" | "userId">): Promise<Address> => {
  try {
    const response = await postData({
      endPoint: "/api/user/addresses/create",
      data: mapAddressToApi(addr),
    });
    return mapApiToAddress(response.data);
  } catch (error) {
    console.error("Failed to add address", error);
    throw new Error("خطا در افزودن آدرس");
  }
};

export const updateAddress = async (id: string, addr: Partial<Omit<Address, "id" | "userId">>): Promise<Address> => {
  try {
    const cleanData: Record<string, any> = {};
    if (addr.title !== undefined) cleanData.address_title = addr.title;
    if (addr.fullAddress !== undefined) cleanData.address_line = addr.fullAddress;
    if (addr.city !== undefined) cleanData.city = addr.city;
    if (addr.province !== undefined) cleanData.province = addr.province;
    if (addr.postalCode !== undefined) cleanData.postal_code = addr.postalCode;
    if (addr.isDefault !== undefined) cleanData.is_default = addr.isDefault;

    const response = await putData({
      endPoint: `/api/user/addresses/${id}/update`,
      data: cleanData,
    });
    return mapApiToAddress(response.data);
  } catch (error) {
    console.error("Failed to update address", error);
    throw new Error("خطا در بروزرسانی آدرس");
  }
};

export const deleteAddress = async (id: string): Promise<void> => {
  try {
    await deleteData({ endPoint: `/api/user/addresses/${id}` });
  } catch (error) {
    console.error("Failed to delete address", error);
    throw new Error("خطا در حذف آدرس");
  }
};