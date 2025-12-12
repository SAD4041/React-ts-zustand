import React, { useState, useEffect, useCallback } from 'react';
import type { UserInfo } from '@/types/UserDashInfoTypes';
import ProfileHeader from './userDashInfoComponents/profileHeader';
import ProfileInfo from './userDashInfoComponents/profileInfo';
import {
  getUserProfile,
  updateUserProfile,
  uploadUserAvatar,
} from '@/services/userDashInfoService';

const Spinner = () => (
  <div className="flex justify-center items-center p-6">
    <div className="w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
  </div>
);

const UserDashInfo: React.FC = () => {
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await getUserProfile();
      setUserData(user);
    } catch (err) {
      console.error('Failed to load user profile', err);
      setError('خطا در بارگذاری اطلاعات پروفایل');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Spinner />;
  if (error) return <div className="p-6 text-red-500 text-right">{error}</div>;
  if (!userData) return <div className="p-6 text-right">داده‌ای یافت نشد.</div>;

  const handleSavePersonal = async (updatedData: UserInfo) => {
    try {
      const dataWithId = { ...updatedData, id: userData.id || "1" };
      const updated = await updateUserProfile(dataWithId);
      setUserData(updated);
      alert('اطلاعات شخصی با موفقیت ذخیره شد!');
    } catch (err) {
      alert('خطا در ذخیره اطلاعات');
    }
  };

  const handleAvatarChange = async (file: File | null) => {
    if (!file) return;
    try {
      const res = await uploadUserAvatar(file);
      setUserData(prev => ({ ...prev!, avatar: res.avatar_url }));
      alert('عکس پروفایل بروز شد.');
    } catch (err) {
      alert('خطا در آپلود عکس');
    }
  };

  return (
    <div className="space-y-6 py-6 px-6 max-w-6xl mx-auto bg-white">
      <div className="text-right mb-4">
        <h1 className="text-xl font-bold">پروفایل کاربری</h1>
        <p className="text-gray-500 text-sm">
          مدیریت اطلاعات شخصی
        </p>
      </div>

      <ProfileHeader
        user={{ ...userData, profileImage: userData.avatar }}
        onAvatarChange={handleAvatarChange}
      />
      <ProfileInfo initialData={userData} onSave={handleSavePersonal} />
    </div>
  );
};

export default UserDashInfo;