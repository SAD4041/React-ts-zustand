import type { UserProfile } from "@/types/userTypes";

export interface DateAndLocationInputProps {
  challengeDate: string;
  challengeLocation: string;
  onDateChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

export interface ChallengeImageProps {
  imageUrl: string;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BackButtonProps {
  onClick: () => void;
}

export interface ChallengeTitleAndDescriptionInputProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export interface BackButtonAndMenuProps {
  onMenuClick?: () => void;
}

export interface DateAndLocationProps {
  dateRange: string;
  location: string;
}

export interface ImageContainerWithShadowProps {
  imageUrl: string;
}

export interface LikeSaveButtonsProps {
  likeCount: number;
  onLike: () => void;
  onSave: () => void;
}

export interface ChallengeSlideshowProps {
  currentChallengeIndex: number;
  mockChallenges: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  }[];
  nextSlide: () => void;
  prevSlide: () => void;
}

export interface ChallengeDescriptionProps {
  title: string;
  description: string;
}

export interface ChallengeData {
  title: string;
  description: string;
  dateRange: string;
  location: string;
  Img: string | null;
  commentsEnabled: boolean;
  categories: string[];
  type: string;
  memberCount: string;
  members: UserProfile[];
}
