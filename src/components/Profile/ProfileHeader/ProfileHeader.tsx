import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import FollowBar from "../FollowBar";
import OwnerButton from "../OwnerButton";
import ViewButton from "../ViewButton";
import ProfileSideSheet from "../ProfileSideSheet";

import {
  getFollowersService,
  getFollowingService,
  getUserProfileService,
} from "@/services/userService";

import styles from "./ProfileHeader.module.css";

function getUserInitials(fullName: string): string {
  if (!fullName) return "";
  const nameParts = fullName.trim().split(" ");
  const first = nameParts[0]?.charAt(0).toUpperCase() || "";
  const last =
    nameParts.length > 1
      ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
      : "";
  return first + last;
}

interface Props {
  personalColor?: string;
  isOwner?: boolean;
  userId: number;
}

const ProfileHeader: React.FC<Props> = ({
  personalColor = "bg-blue-500 text-white",
  isOwner = false,
  userId,
}) => {
  const [fullName, setFullName] = useState("User");
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const initials = getUserInitials(fullName);

  useEffect(() => {
    if (!userId) return;

    async function fetchUserData() {
      try {
        // const userData = await getUserProfileService(userId);
        // if (userData?.fullName) setFullName(userData.fullName);
        // else if (userData?.username) setFullName(userData.username);

        const followersRes = await getFollowersService(userId);
        if (followersRes?.count !== undefined) setFollowersCount(followersRes.count);

        const followingRes = await getFollowingService(userId);
        if (followingRes?.count !== undefined) setFollowingCount(followingRes.count);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    }

    console.log(followersCount)


    fetchUserData();
  }, [userId]);

  return (
    <>
      {isOwner && <ProfileSideSheet />}

      <div
        onClick={() => console.log("show the badges!")}
        className={`cursor-pointer flex justify-center ${
          isOwner ? "mt-2.5" : "mt-14.5"
        }`}
      >
        <div className="relative">
          <Avatar className="w-26 h-26 sm:w-34 sm:h-34 md:w-44 md:h-44 shadow-lg avatar">
            <AvatarImage
              alt={fullName}
              src="https://samanskh.github.io/assets/images/bio-photo.jpg"
            />
            <AvatarFallback className={`text-2xl font-semibold ${personalColor}`}>
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Badge decorations */}
          <img
            src="/badge.png"
            alt="badge"
            className={`${styles.badge} ${styles.badgeCenter}`}
          />
          <img
            src="/badge.png"
            alt="badge"
            className={`${styles.badge} ${styles.badgeRight}`}
          />
          <img
            src="/badge.png"
            alt="badge"
            className={`${styles.badge} ${styles.badgeLeft}`}
          />
        </div>
      </div>
      <FollowBar fullName={fullName}
      followersCount={followersCount}
      followingCount={followingCount}
      ></FollowBar>
      {/* BUTTON */}
      {isOwner && <OwnerButton></OwnerButton>}
      {!isOwner && <ViewButton></ViewButton>}
      {/* button selector */}
    </>
  );
};

export default ProfileHeader;
