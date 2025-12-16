import React, { useState, useEffect, useCallback } from "react";
import type { Address, UserInfo } from "@/types/UserDashInfoTypes";
import ProfileHeader from "./userDashInfoComponents/profileHeader";
import ProfileInfo from "./userDashInfoComponents/profileInfo";
import AddressSection from "./userDashInfoComponents/addressSection";
import {
  getUserProfile,
  updateUserProfile,
  uploadUserAvatar,
} from "@/services/userDashInfoService";
import {
  getUserAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "@/services/addressService";


const Spinner = () => (
  <div className="flex justify-center items-center p-6">
    <div className="w-6 h-6 border-2 border-t-transparent border-primary rounded-full animate-spin" />
  </div>
);


const UserDashInfo: React.FC = () => {
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      localStorage.setItem(
        "authToken",
        "9|5Y3hhBm1jyYps1NxXM2W5zWSN1jpd5obIHOEHf2vecfb0af9"
      );
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await getUserProfile();
      setUserData(user);
    } catch (err) {
      console.error("Failed to load user profile", err);
      setError("خطا در بارگذاری اطلاعات پروفایل");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAddresses = useCallback(async () => {
    try {
      setAddressesLoading(true);
      const res = await getUserAddresses();
      setAddresses(res);
    } catch (e) {
      console.error("Failed to load addresses", e);
    } finally {
      setAddressesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  if (loading) return <Spinner />;
  if (error)
    return <div className="p-6 text-destructive text-right">{error}</div>;
  if (!userData)
    return <div className="p-6 text-right">داده‌ای یافت نشد.</div>;

  const handleSavePersonal = async (updatedData: UserInfo) => {
    try {
      const dataWithId = { ...updatedData, id: userData.id || "1" };
      const updated = await updateUserProfile(dataWithId);
      setUserData(updated);
      alert("اطلاعات شخصی با موفقیت ذخیره شد!");
    } catch (err) {
      alert("خطا در ذخیره اطلاعات");
    }
  };

  const handleAvatarChange = async (file: File | null) => {
    if (!file) return;
    try {
      const res = await uploadUserAvatar(file);
      setUserData((prev) => ({ ...prev!, avatar: res.avatar_url }));
      alert("عکس پروفایل بروز شد.");
    } catch (err) {
      alert("خطا در آپلود عکس");
    }
  };

  const handleAddAddress = async (data: Omit<Address, "id">) => {
    if (data.isDefault) {
      await Promise.all(
        addresses
          .filter(a => a.isDefault)
          .map(a => updateAddress(a.id, { isDefault: false }))
      );
    }

    const newAddress = await addAddress(data);

    setAddresses(prev => [
      ...(data.isDefault
        ? prev.map(a => ({ ...a, isDefault: false }))
        : prev),
      newAddress,
    ]);
  };

  const handleUpdateAddress = async (
    id: string,
    data: Partial<Address>
  ) => {
    if (data.isDefault) {
      await Promise.all(
        addresses
          .filter(a => a.isDefault && a.id !== id)
          .map(a => updateAddress(a.id, { isDefault: false }))
      );
    }

    const updated = await updateAddress(id, data);

    setAddresses(prev =>
      prev.map(addr => {
        if (addr.id === id) return updated;
        if (data.isDefault) return { ...addr, isDefault: false };
        return addr;
      })
    );
  };


  const handleDeleteAddress = async (id: string) => {
    await deleteAddress(id);
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };



  return (
    <div className="space-y-6 py-6 px-6 max-w-6xl mx-auto bg-background">
      <div className="text-right mb-4">
        <h1 className="text-xl font-bold">پروفایل کاربری</h1>
        <p className="text-muted-foreground text-sm">
          مدیریت اطلاعات شخصی
        </p>
      </div>

      <ProfileHeader
        user={{ ...userData, profileImage: userData.avatar }}
        onAvatarChange={handleAvatarChange}
      />
      <ProfileInfo initialData={userData} onSave={handleSavePersonal} />

      <AddressSection
        addresses={addresses}
        onAddAddress={handleAddAddress}
        onUpdateAddress={handleUpdateAddress}
        onDeleteAddress={handleDeleteAddress}
      />

    </div>
  );
};

export default UserDashInfo;
