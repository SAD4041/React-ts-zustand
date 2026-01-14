import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from "lucide-react";
import type { UserCardProps } from '@/types/userCardListType';


const UserCard: React.FC<UserCardProps> = ({ 
  id, 
  username, 
  imagePath, 
  bio, 
  followersCount, 
  followingCount, 
  doneChallengesCount, 
  onDelete, 
  isOwner ,
  className
}) => {
  const navigate = useNavigate();

  // Handle the card click event to navigate to the user's profile
  const handleCardClick = () => {
    // Navigate to the user's profile and pass necessary data as state
    navigate(`/dashboard/${id}`, {
      state: {
        fullName: username,  // Passing the username as fullName
        bio,
        followersCount,
        followingCount,
        doneChallengesCount
      }
    });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();  // Prevent the card click event from firing
    onDelete(id, username);
  };

  return (
    <div
      className={`flex items-center justify-between mb-2 p-2 w-88 sm:w-100 md:w-110 h-24 border border-black rounded-[7px] cursor-pointer ${className} `}
      onClick={handleCardClick}  // Trigger navigation on card click
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
        <button className="text-primary" onClick={handleDeleteClick}>
          <X className='w-6 h-6 mr-2 border-2 border-primary rounded-[11px] hover:bg-orange-100' />
        </button>
      )}
    </div>
  );
};

export default UserCard;
