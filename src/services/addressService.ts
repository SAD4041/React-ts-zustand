import { getData, postData, putData, deleteData } from "./services";
import type { Address } from "@/types/UserDashInfoTypes";

const END_POINT = "/addresses";
const USER_ID = "1";

/* =======================
   GET user addresses
======================= */
export const getUserAddresses = async (): Promise<Address[]> => {
  const data = await getData({
    endPoint: END_POINT,
    params: { userId: USER_ID },
  });

  return data as Address[];
};

/* =======================
   ADD address
======================= */
export const addAddress = async (
  data: Omit<Address, "id">
): Promise<Address> => {
  // اگر پیش‌فرض است → بقیه را false کن
  if (data.isDefault) {
    const addresses = await getData({
      endPoint: END_POINT,
      params: { userId: USER_ID },
    });

    await Promise.all(
      (addresses as Address[])
        .filter(a => a.isDefault)
        .map(a =>
          putData({
            endPoint: `${END_POINT}/${a.id}`,
            data: { isDefault: false },
          })
        )
    );
  }

  const res = await postData({
    endPoint: END_POINT,
    data: { ...data, userId: USER_ID },
  });

  return res as Address;
};

/* =======================
   UPDATE address
======================= */
export const updateAddress = async (
  id: string,
  data: Partial<Address>
): Promise<Address> => {
  if (data.isDefault) {
    const addresses = await getData({
      endPoint: END_POINT,
      params: { userId: USER_ID },
    });

    await Promise.all(
      (addresses as Address[])
        .filter(a => a.isDefault && a.id !== id)
        .map(a =>
          putData({
            endPoint: `${END_POINT}/${a.id}`,
            data: { isDefault: false },
          })
        )
    );
  }

  const res = await putData({
    endPoint: `${END_POINT}/${id}`,
    data,
  });

  return res as Address;
};

/* =======================
   DELETE address
======================= */
export const deleteAddress = async (id: string): Promise<void> => {
  await deleteData({
    endPoint: `${END_POINT}/${id}`,
  });
};
