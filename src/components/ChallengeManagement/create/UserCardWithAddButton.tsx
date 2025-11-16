// src/components/ChallengeManagement/create/UserCardWithAddButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export interface UserCardProps {
  id: string;
  username: string;
  imagePath: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  doneChallengesCount: number;
  onDelete: (id: string, username: string) => void;
  onAdd?: () => void;                 // NEW
  isOwner: boolean;
  className: string;
}

const UserCardWithAddButton: React.FC<UserCardProps> = ({
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
      className={`flex items-center justify-between mb-2 p-2 w-88 sm:w-100 md:w-110 h-24 border border-black rounded-[7px] cursor-pointer ${className}`}
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
          className="bg-white border-primary border-2 px-1 py-1 rounded-[10px] text-primary text-sm font-medium hover:bg-primary-hover transition-colors"
          onClick={handleAddClick}
        >
          اضافه کردن
        </button>
      )}
    </div>
  );
};

export default UserCardWithAddButton;