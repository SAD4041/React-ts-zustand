// src/components/ChallengeManagement/UserCardList.tsx

import React from "react";
import UserCard from "@/components/Custom/UserCard";
import type { UserCardListProps } from "@/types/userCardListType";

const UserCardList: React.FC<UserCardListProps> = ({
  users,
  onDelete,
  isOwner,
}) => {
  console.log(users);

  return (
    <div className="w-full mt-4 max-w-xl mx-auto">
      <div
        className="w-full flex flex-col items-center space-y-4 overflow-y-auto max-h-[300px]"
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {users?.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            username={user.username}
            imagePath={user.imagePath}
            bio={user.bio}
            onDelete={onDelete}
            isOwner={isOwner}
            followersCount={user.followersCount}
            followingCount={user.followingCount}
            doneChallengesCount={0} //where is the end point of this?
            className="w-full sm:w-full md:w-full lg:w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default UserCardList;
