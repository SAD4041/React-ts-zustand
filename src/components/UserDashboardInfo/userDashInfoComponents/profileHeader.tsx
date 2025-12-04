import React, { useRef } from 'react';
import { Card } from '@/components/ui/userDashInfo/card';
import { Button } from '@/components/ui/userDashInfo/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/userDashInfo/avatar';
import type { ProfileHeaderProps } from '@/types/UserDashInfoTypes';

interface ExtendedProfileHeaderProps extends ProfileHeaderProps {
  onAvatarChange?: (avatar: string | null) => void;
}

const ProfileHeader: React.FC<ExtendedProfileHeaderProps> = ({ user, onAvatarChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (firstName: string): string => {
    return firstName[0]?.toUpperCase() || '?';
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('لطفاً یک فایل تصویری انتخاب کنید.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (onAvatarChange) {
        onAvatarChange(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="px-6 py-3 relative">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      <div className="flex justify-between items-start">
        <div className="flex flex-col items-center">
          <div className="h-3 relative w-full flex justify-center">
            <Avatar className="w-18 h-18 absolute -top-13">
              {user.profileImage ? (
                <AvatarImage src={user.profileImage} alt="User" />
              ) : (
                <AvatarFallback className="bg-[#00A6D4] text-white text-2xl">
                  {getInitials(user.firstName)}
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          <Button
            size="sm"
            className="bg-[#2CD1FF] text-white px-4 py-1 rounded-md text-sm hover:bg-[#00A6D4] mt-4"
            onClick={() => fileInputRef.current?.click()}
          >
            تغییر عکس پروفایل
          </Button>
        </div>

        <div className="text-right">
          <h3 className="text-lg font-bold">{user.firstName}</h3>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;