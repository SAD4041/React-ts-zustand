import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomButton from "../Custom/CustomButton";
import {
  followUser,
  removeFollowing,
  checkIfFollowing,
} from "@/services/followerFollowingService";
import useUserStore from "@/store/userStore/userStore";

interface Props {
  loggedInUserId: string;
  isFollowing?: boolean;
  token: string;
}

const ViewButton = ({ loggedInUserId, isFollowing = false, token }: Props) => {
  const [isUserFollowing, setIsUserFollowing] = useState(isFollowing);
  const { userId } = useParams<{ userId: string }>();
  const userToken = useUserStore((state) => state.token) || "";

  useEffect(() => {
    console.log(
      "useEffect triggered with userId:",
      userId,
      "and token:",
      userToken
    );
    const fetchFollowStatus = async () => {
      if (!userId || !userToken) {
        console.error("Missing required parameters: userId or token");
        return;
      }

      try {
        const followingStatus = await checkIfFollowing(userId, userToken);
        console.log("Follow status:", followingStatus);
        setIsUserFollowing(followingStatus);
      } catch (error) {
        console.error("Error fetching follow status:", error);
      }
    };

    fetchFollowStatus();
  }, [userId, userToken]);

  useEffect(() => {
    console.log("isUserFollowing changed:", isUserFollowing); // This should show the latest value
  }, [isUserFollowing]);

  const handleFollowClick = async () => {
    if (!userId) {
      console.error("No user ID found");
      return;
    }
    try {
      await followUser(loggedInUserId, userId, userToken);
      console.log(userId);

      setIsUserFollowing(true); // Update the button to 'Unfollow' after following
    } catch (error) {
      console.error("Failed to follow the user:", error);
    }
  };

  const handleUnfollowClick = async () => {
    if (!userId) {
      console.error("No user ID found");
      return;
    }
    try {
      await removeFollowing(loggedInUserId, userId, userToken);
      setIsUserFollowing(false); // Update the button to 'Follow' after unfollowing
    } catch (error) {
      console.error("Failed to unfollow the user:", error);
    }
  };

  // Forcing re-render when follow status changes
  useEffect(() => {
    console.log("isUserFollowing changed:", isUserFollowing);
  }, [isUserFollowing]);

  return (
    <div className="px-2 mt-5 flex w-full justify-center">
      {isUserFollowing ? (
        <CustomButton
          onClick={handleUnfollowClick}
          className="bg-red-500 w-full font-bold !text-white text-profile-title-size"
        >
          لغو دنبال
        </CustomButton>
      ) : (
        <CustomButton
          onClick={handleFollowClick}
          className="w-60 font-bold bg-secondary !text-white text-profile-title-size"
        >
          دنبال کن
        </CustomButton>
      )}
    </div>
  );
};

export default ViewButton;
