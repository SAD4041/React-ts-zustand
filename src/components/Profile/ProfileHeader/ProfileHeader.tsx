import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

import styles from "./ProfileHeader.module.css";

import { Button } from "@/components/ui/button";
import { EllipsisIcon } from "@/components/ui/icons/lucide-ellipsis";
import FollowBar from "../FollowBar";
import OwnerButton from "../OwnerButton";
import ViewButton from "../ViewButton";
import ProfileSideSheet from "../ProfileSideSheet";
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
interface Props {
  fullName: string;
  personalColor?: string;
  // followersCount?: number;
  // followingCount?: number;
  // doneChallengesCount?: number;
  isOwner?: boolean;
}
const ProfileHeader = ({
  fullName,
  personalColor = "bg-blue-500 text-white",
  isOwner,
}: Props) => {
  const initials = getUserInitials(fullName);

  return (
    <>
      {/* <div className="relative w-full h-12">
        <Button
          className="absolute top-5 right-2"
          variant="ghost"
          onClick={() => console.log("open settings")}
        >
          <EllipsisIcon
            className="rotate-90"
            style={{ width: "1.5rem", height: "1.5rem" }}
          ></EllipsisIcon>
        </Button>
      </div> */}

      {isOwner && <ProfileSideSheet></ProfileSideSheet>}

      <div
        onClick={() => console.log("show the badges!")}
        className={`cursor-pointer flex justify-center ${isOwner ? "mt-2.5" : "mt-14.5"}`}
      >
        <div className="relative">
          <Avatar className="w-26 h-26 sm:w-34 sm:h-34 md:w-44 md:h-44 shadow-lg avatar">
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

          <img
            src="/badge.png"
            alt="badge"
            className={`${styles.badge} ${styles.badgeCenter}`}
          ></img>
          <img
            src="/badge.png"
            alt="badge"
            className={`${styles.badge} ${styles.badgeRight}`}
          ></img>
          <img
            src="/badge.png"
            alt="badge"
            className={`${styles.badge} ${styles.badgeLeft}`}
          ></img>
        </div>
      </div>
      <FollowBar ></FollowBar>
      {/* BUTTON */}
      {isOwner && <OwnerButton></OwnerButton>}
      {!isOwner && <ViewButton></ViewButton>}
      {/* button selector */}
    </>
  );
};

export default ProfileHeader;
