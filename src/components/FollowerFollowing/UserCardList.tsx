import React from 'react';
import UserCard from '@/components/FollowerFollowing/UserCard';

interface UserCardListProps {
  users: { id: string; username: string; imagePath: string }[];
  onDelete: (id: string, username: string) => void;
  isOwner: boolean; // Add isOwner here
}

const UserCardList: React.FC<UserCardListProps> = ({ users, onDelete, isOwner }) => {
  return (
    <div className="w-full max-w-md flex justify-center">
      {users.length > 0 ? (
        <div
          className="overflow-auto max-h-96"
          style={{
            scrollbarWidth: 'none',  // Firefox: make the scrollbar invisible
            msOverflowStyle: 'none', // Internet Explorer: make scrollbar invisible
          }}
        >
          {/* Wrap the list with a div and apply overflow styles */}
          {users.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              username={user.username}
              imagePath={user.imagePath}
              onDelete={onDelete}
              isOwner={isOwner} // Pass isOwner to UserCard
            />
          ))}
        </div>
      ) : (
        <p className="font-semibold m-10 text-primary text-5xl">!موردی یافت نشد</p>
      )}
    </div>
  );
};

export default UserCardList;
