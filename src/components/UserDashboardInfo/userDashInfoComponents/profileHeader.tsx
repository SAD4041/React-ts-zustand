import React, { useMemo, useRef } from 'react';
import { Card } from '@/components/ui/userDashInfo/card';
import { Button } from '@/components/ui/userDashInfo/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/userDashInfo/avatar';
import type { ProfileHeaderProps } from "@/types/UserDashInfoTypes";
import { baseURL } from '@/services/services';

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

  const avatarSrc = useMemo(() => {
    const src = user.profileImage || (user as any).avatar || "";
    if (!src) return undefined;
    const cleaned = src.replace(/\\/g, "");
    if (cleaned.startsWith("http")) {
      // اگر دامنه بدون پورت بود، پورت 9000 را اضافه می‌کنیم
      if (cleaned.includes("buckgallery.ir") && !/buckgallery\.ir:\d+/.test(cleaned)) {
        try {
          const url = new URL(cleaned);
          url.port = "9000";
          return url.toString();
        } catch {
          return cleaned;
        }
      }
      return cleaned;
    }
    if (cleaned.startsWith("//")) return `https:${cleaned}`;
    return `${baseURL.replace(/\/+$/, "")}/${cleaned.replace(/^\/+/, "")}`;
  }, [user.profileImage, (user as any).avatar]);

  return (
    <Card className="px-6 py-3 relative mt-14 md:mt-0">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-6">
        <div className="flex flex-col items-center md:items-start w-full md:w-auto">
          <div className="h-3 relative w-full flex justify-center">
            <Avatar className="w-18 h-18 absolute -top-13 ring-2 ring-brand bg-white">
              <AvatarImage
                src={avatarSrc}
                alt={user.firstName || "User"}
                className="object-cover"
                onError={(e) => {
                  console.error("Failed to load avatar image", avatarSrc);
                  (e.currentTarget as HTMLImageElement).src = "";
                }}
              />
              <AvatarFallback className="bg-brand text-brand-foreground text-2xl ">
                {getInitials(user.firstName)}
              </AvatarFallback>
            </Avatar>
          </div>

          <Button
            size="sm"
            variant="brand"
            className="px-4 py-1 rounded-md text-sm mt-4 w-full md:w-auto"
            onClick={() => fileInputRef.current?.click()}
          >
            تغییر عکس پروفایل
          </Button>
        </div>

        <div className="text-center md:text-right w-full md:w-auto">
          <h3 className="text-lg font-bold">
            {user.firstName || "???"}
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
