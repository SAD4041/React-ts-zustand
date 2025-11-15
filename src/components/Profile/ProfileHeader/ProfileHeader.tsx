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
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const initials = getUserInitials(fullName);
  useEffect(() => {
    if (!userId) return;

    async function fetchUserData() {
      // اطلاعات پروفایل
      try {
        const userRes = await getUserProfileService(userId);
        if (userRes) {
          setFullName(userRes.username || "User");
          setProfilePicture(userRes.profile_picture || "");
          setBio(userRes.bio || "null");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }

      // تعداد فالوورها
      try {
        const followersRes = await getFollowersService(userId);
        if (followersRes?.count !== undefined)
          setFollowersCount(followersRes.count);
          // console.log(followersCount)
      } catch (err) {
        console.error("Error fetching followers:", err);
      }

      // تعداد فالووینگ‌ها
      try {
        const followingRes = await getFollowingService(userId);
        if (followingRes?.count !== undefined)
          setFollowingCount(followingRes.count);
      } catch (err) {
        console.error("Error fetching following:", err);
      }
    }

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
            {profilePicture ? (
              <AvatarImage alt={fullName} src={profilePicture} />
            ) : (
              <AvatarFallback
                className={`text-2xl font-semibold ${personalColor}`}
              >
                {initials}
              </AvatarFallback>
            )}
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

      <FollowBar
        fullName={fullName}
        followersCount={followersCount}
        followingCount={followingCount}
        bio={bio}
      />

      {/* BUTTON */}
      {isOwner && <OwnerButton />}
      {!isOwner && <ViewButton />}
    </>
  );
};

export default ProfileHeader;
