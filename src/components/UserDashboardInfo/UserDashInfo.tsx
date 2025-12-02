import React from 'react';
import ProfileHeader from './userDashInfoComponents/profileHeader';
import AddressesSection from './userDashInfoComponents/addressSection';
import PersonalInfoSection from './userDashInfoComponents/profileInfo';
import ChangePasswordSection from './userDashInfoComponents/changePassword';
import { UserData } from '@/data/userDashInfoData';

const ProfilePage: React.FC = () => {

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto bg-white">
      <div className="text-right">
        <h1 className="text-2xl font-bold">پروفایل کاربری</h1>
        <p className="text-gray-500 mt-2 text-sm">
          مدیریت اطلاعات شخصی و آدرس‌های خود
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AddressesSection />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <ProfileHeader user={UserData} />
          <PersonalInfoSection />
          <ChangePasswordSection />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;