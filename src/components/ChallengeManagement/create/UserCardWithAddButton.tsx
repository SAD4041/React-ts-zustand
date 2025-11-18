// src/components/ChallengeManagement/create/UserCardWithAddButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import type { ChallengeUserCardProps } from "@/types/challengeElementsTypes";

const UserCardWithAddButton: React.FC<ChallengeUserCardProps> = ({
  id,
  username,
  imagePath,
  bio,
  followersCount,
  followingCount,
  doneChallengesCount,
  onDelete,
  onAdd,
  isOwner,
  className,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dashboard/${id}`, {
      state: {
        fullName: username,
        bio,
        followersCount,
        followingCount,
        doneChallengesCount,
      },
    });
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd?.();
  };

  return (
    <div
      className={`flex items-center justify-between mb-2 p-2 w-88 sm:w-100 md:w-110 h-24 border border-black rounded-primary-radius cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      <div className="flex items-center space-x-4">
        <img
          className="w-16 h-16 rounded-full border-1 border-black"
          src={imagePath}
          alt="profile"
        />
        <span className="font-bold">{username}</span>
      </div>

      {isOwner && (
        <button
          className="bg-white border-primary border-2 px-1 py-1 rounded-primary-radius text-primary text-sm font-medium hover:bg-primary-hover transition-colors"
          onClick={handleAddClick}
          type="button"
        >
          اضافه کردن
        </button>
      )}
    </div>
  );
};

export default UserCardWithAddButton;
