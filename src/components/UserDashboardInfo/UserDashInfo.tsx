import React, { useState, useEffect } from 'react';
import {getAddresses,getUserData,setAddressesData,setUserData,Addresses} from '@/data/userDashInfoData';
import type { Address, UserInfo } from '@/types/UserDashInfoTypes';
import ProfileHeader from './userDashInfoComponents/profileHeader';
import ProfileInfo from './userDashInfoComponents/profileInfo';
import ChangePassword from './userDashInfoComponents/changePassword';
import AddressSection from './userDashInfoComponents/addressSection';

const UserDashInfo: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>(Addresses);
  const [userData, setUserDataState] = useState<UserInfo | null>(null);

  useEffect(() => {
    setAddresses(getAddresses());
    setUserDataState(getUserData());
  }, []);

  if (!userData) return <div>در حال بارگذاری...</div>;

  const handleSavePersonal = (data: UserInfo) => {
    setUserData(data);
    setUserDataState(data);
    window.location.reload();
  };

  const handleSavePassword = (newPassword: string) => {
    const updated = { ...userData, password: newPassword };
    setUserData(updated);
    setUserDataState(updated);
    window.location.reload();
  };

  const handleAddAddress = (newAddress: Omit<Address, 'id'>) => {
    const newId = Date.now().toString(); // یا UUID
    const addressWithId = { ...newAddress, id: newId };
    const updated = [...addresses, addressWithId];
    setAddressesData(updated);
    setAddresses(updated);
  };

  const handleUpdateAddress = (id: string, updatedAddress: Omit<Address, 'id'>) => {
    const updated = addresses.map(addr =>
      addr.id === id ? { ...updatedAddress, id } : addr
    );
    setAddressesData(updated);
    setAddresses(updated);
  };

  const handleDeleteAddress = (id: string) => {
    const current = getAddresses();
    const isDeletingDefault = current.find(a => a.id === id)?.isDefault;
    const updated = current.filter(a => a.id !== id);

    if (isDeletingDefault && updated.length > 0) {
      updated[0] = { ...updated[0], isDefault: true };
    }

    setAddressesData(updated);
    setAddresses(updated);
  };

  const handleAvatarChange = (avatarDataUrl: string | null) => {
    const updated = { ...userData, avatar: avatarDataUrl };
    setUserData(updated);
    setUserDataState(updated);
    window.location.reload();
  };

  return (
    <div className="space-y-6 py-6 px-30 max-w-6xl mx-auto bg-white">
      <div className="text-right mb-4">
        <h1 className="text-xl font-bold">پروفایل کاربری</h1>
        <p className="text-gray-500 text-sm">
          مدیریت اطلاعات شخصی و آدرس‌های خود
        </p>
      </div>

      <ProfileHeader
        user={{ ...userData, profileImage: userData.avatar }}
        onAvatarChange={handleAvatarChange}
      />
      <ProfileInfo initialData={userData} onSave={handleSavePersonal} />
      <ChangePassword currentPassword={userData.password} onSave={handleSavePassword} />
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