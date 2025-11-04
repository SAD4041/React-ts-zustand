import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CustomButton from "../Custom/CustomButton";

// Assuming you have a followUser function to make the API call to follow a user
const followUser = async (username: string) => {
  try {
    // Replace with actual API logic to follow the user
    // Example: await api.followUser(username);
    console.log(`Following ${username}`);
  } catch (error) {
    console.error("Failed to follow the user:", error);
  }
};

interface Props {
  username: string;  // Add username to know which user to follow
  isFollowing?: boolean;
}

const ViewButton = ({ isFollowing = false, username }: Props) => {
  const [isUserFollowing, setIsUserFollowing] = useState(isFollowing);

  const handleFollowClick = async () => {
    // Perform the follow action (make API call, etc.)
    await followUser(username);

    // After successful follow, update the state to reflect the change
    setIsUserFollowing(true);
  };

  const handleUnfollowClick = async () => {
    // Handle unfollow logic (API call to remove from following list)
    // Example: await api.unfollowUser(username);
    console.log(`Unfollowed ${username}`);

    // After successful unfollow, update the state
    setIsUserFollowing(false);
  };

  return (
    <div className="flex justify-center mt-5">
      {isUserFollowing ? (
        <CustomButton
          backgroundColor="bg-red-500"
          width="w-60"
          onClick={handleUnfollowClick}
        >
          لغو دنبال
        </CustomButton>
      ) : (
        <CustomButton
          backgroundColor="bg-secondry"
          width="w-60"
          onClick={handleFollowClick}
        >
          بزن دنبالش
        </CustomButton>
      )}
    </div>
  );
};

export default ViewButton;
