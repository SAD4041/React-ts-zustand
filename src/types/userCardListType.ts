import type { UserProfile } from "./userTypes";

export interface UserCardListProps {
  users: UserProfile[] | null;
  onDelete: (id: string, username: string) => void;
  isOwner: boolean;
}

export interface UserCardProps {
  id: string;
  username: string;
  imagePath: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  doneChallengesCount: number;
  onDelete: (id: string, username: string) => void;
  isOwner: boolean;
  className: string;
}
