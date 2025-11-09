interface Profile {
  id: number;
  image: string;
  fallback: string;
}

export interface ChallengeCardProps {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  profiles: Profile[];
  initialLikes?: number;
  initialComments?: number;
  coverImage?: string;
  isPrivate?: boolean;
  isJoined?: boolean;
  creator?: {
    name: string;
    avatar: string;
  };
}