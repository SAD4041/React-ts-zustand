import { number } from "yup";

interface Profile {
  id: number;
  name: string;
  avatar: string;
  image: string;
}

export interface ChallengeCardProps {
  id: number;
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
  onClick?: () => void; 
  start_time?: string | number;
  end_time?: string;

  creator?: {
    name: string;
    avatar: string;
  };

  // 🟢 روزهای انتخاب‌شده در هفته (مثلاً ["شنبه", "دوشنبه", "چهارشنبه"])
  daysOfWeek?: string[];
}
