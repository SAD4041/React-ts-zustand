import React, { useRef } from 'react';
import { Card } from '@/components/ui/userDashInfo/card';
import { Button } from '@/components/ui/userDashInfo/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/userDashInfo/avatar';
import type { ProfileHeaderProps } from "@/types/UserDashInfoTypes";

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onAvatarChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
    }
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
            <Avatar className="w-18 h-18 absolute -top-13 ring-2 ring-brand">
              <AvatarImage
                src={user.profileImage || undefined}
                alt={user.firstName || "User"}
              />
              <AvatarFallback className="bg-brand text-brand-foreground text-2xl ">
                {getInitials(user.firstName)}
              </AvatarFallback>
            </Avatar>
          </div>

          <Button
            size="sm"
            variant="brand"
            className="px-4 py-1 rounded-md text-sm mt-4"
            onClick={() => fileInputRef.current?.click()}
          >
            تغییر عکس پروفایل
          </Button>
        </div>

        <div className="text-right">
          <h3 className="text-lg font-bold">
            {user.firstName || "—"}
          </h3>
          <p className="text-muted-foreground text-sm">
            {user.email || ""}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;
