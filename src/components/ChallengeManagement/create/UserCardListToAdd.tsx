// src/components/ChallengeManagement/create/UserCardListToAdd.tsx
import React from "react";
import UserCardWithAddButton from "./UserCardWithAddButton";
import type { UserCardListProps } from "@/types/challengeElementsTypes";

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
              id={user.id}
              username={user.username}
              imagePath={user.imagePath}
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
