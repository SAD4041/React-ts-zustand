interface Profile {
  id: number;
  name: string;
  avatar: string;
  image: string;
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

  // 🟢 روزهای انتخاب‌شده در هفته (مثلاً ["شنبه", "دوشنبه", "چهارشنبه"])
  daysOfWeek?: string[];
}
