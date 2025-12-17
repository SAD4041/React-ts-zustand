export interface ProfileHeaderProps {
  personalColor?: string;
  isOwner?: boolean;
  userId: number;
}
export interface FollowBarProps {
  fullName?: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  doneChallengesCount?: number;
}
export interface ViewBtnProps {
  username: string;
  isFollowing?: boolean;
}
