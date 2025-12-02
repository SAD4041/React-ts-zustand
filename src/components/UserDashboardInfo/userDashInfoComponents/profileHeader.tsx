import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/userDashInfo/avatar';
import { Button } from '@/components/ui/userDashInfo/button';
import { Card } from '@/components/ui/userDashInfo/card';
import { Separator } from '@/components/ui/userDashInfo/separator';
import type { ProfileHeaderProps } from '@/types/UserDashInfoTypes';

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const getInitials = (name: string): string => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-6 mb-6">
        <Avatar className="w-24 h-24">
          {user.profileImage ? (
            <AvatarImage src={user.profileImage} alt="User" />
          ) : (
            <AvatarFallback className="bg-primary text-white text-2xl">
              {getInitials(user.firstName)}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="text-right flex-1">
          <h3 className="text-lg font-semibold">{user.firstName}</h3>
          <p className="text-gray-600 text-sm">{user.email}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 hover:bg-[rgba(254,98,31,1)] hover:text-white">
            تغییر تصویر پروفایل
          </Button>
        </div>
      </div>
      <Separator className="my-6" />
    </Card>
  );
};

export default ProfileHeader;