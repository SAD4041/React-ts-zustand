// src/components/ChallengeManagement/create/UserCardListToAdd.tsx
import React from "react";
import UserCardWithAddButton from "./UserCardWithAddButton";

export type User = {
  id: string;
  username: string;
  imagePath: string;
  bio: string;
  followersCount?: number;
  followingCount?: number;
  doneChallengesCount?: number;
};

export interface UserCardListProps {
  users: User[];
  searchTerm: string;
  onAddUser: (user: User) => void;
  onDelete?: (id: string, username: string) => void;
  disabled?: boolean; // NEW: disables all add buttons
}

const UserCardListToAdd: React.FC<UserCardListProps> = ({
  users,
  searchTerm,
  onAddUser,
  disabled = false, // default to false
}) => {
  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full mt-4 max-w-xl mx-auto">
      <div
        className="flex flex-col items-center space-y-4 overflow-y-auto max-h-[250px]"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {filtered.length === 0 ? (
          <p className="text-center text-primary py-4">کاربری یافت نشد</p>
        ) : (
          filtered.map((user) => (
            <UserCardWithAddButton
              key={user.id}
              id={user.id}
              username={user.username}
              imagePath={user.imagePath}
              bio={user.bio}
              followersCount={user.followersCount ?? 0}
              followingCount={user.followingCount ?? 0}
              doneChallengesCount={user.doneChallengesCount ?? 0}
              onDelete={() => {}} // placeholder
              isOwner={true}
              className="w-full"
              onAdd={() => onAddUser(user)}
              disabled={disabled} // PASS DISABLED STATE
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserCardListToAdd;