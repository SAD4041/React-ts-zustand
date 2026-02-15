import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import "../Profile/ProfileHeader.css";
import { Button } from "@/components/ui/button";
import { EllipsisIcon } from "@/components/ui/icons/lucide-ellipsis";
import FollowBar from "./FollowBar";
import OwnerButton from "./OwnerButton";
import ViewButton from "./ViewButton";
import ProfileSideSheet from "./ProfileSideSheet";
import useUserStore from "@/store/userStore/userStore";
import type { ProfileHeaderProps } from "@/types/profileHeader"; // Use type-only import

function getUserInitials(fullName: string): string {
  if (!fullName) {
    return "";
  }

  const nameParts = fullName.split(" ");
  let initials = "";

  if (nameParts.length > 0) {
    initials += nameParts[0].charAt(0).toUpperCase();
  }

  if (nameParts.length > 1) {
    initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  }

  return initials;
}

const profileHeader = ({
  fullName,
  personalColor = "bg-blue-500 text-white",
  isOwner,
  userId,
}: ProfileHeaderProps) => {
  const initials = getUserInitials(fullName);

  return (
    <>
      <ProfileSideSheet />

      <div
        onClick={() => console.log("show the badges!")}
        className="flex justify-center mt-2.5"
      >
        <div className="relative">
          <Avatar className="w-24 h-24 shadow-lg avatar">
            <AvatarImage
              alt={fullName}
              src="https://samanskh.github.io/assets/images/bio-photo.jpg"
            />
            <AvatarFallback
              className={`text-2xl font-semibold ${personalColor}`}
            >
              {initials}
            </AvatarFallback>
          </Avatar>

          <img src="/badge.png" alt="badge" className="badge badge-center" />
          <img src="/badge.png" alt="badge" className="badge badge-right" />
          <img src="/badge.png" alt="badge" className="badge badge-left" />
        </div>
      </div>

      <FollowBar />

      {/* Pass the userId to ViewButton */}
      {!isOwner && (
        <ViewButton
          loggedInUserId={useUserStore((state) => state.id)}
          userIdToFollow={userId.toString()}
          token="your-token-here"
        />
      )}
    </>
  );
};

export default ProfileHeader;
