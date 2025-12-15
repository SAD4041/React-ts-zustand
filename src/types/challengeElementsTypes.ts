import type { FetchedUserProfile, UserProfile } from "@/types/userTypes";
import type { ChallengeCategoryType } from "@/types/challengeCreateTypes";

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
  imageUrl: string | undefined;
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

export interface ChallengeDataDetails {
  title: string;
  description: string;
  dateRange: string;
  location: string;
  Img: string | null;
  commentsEnabled: boolean;
  categories: string[];
  type: string;
  memberCount: string;
  participants: FetchedUserProfile[];
  like_count: number;
  start_time: string;
  end_time: string;
  visibility: string;
}

export interface UserCardListProps {
  users: UserProfile[];
  searchTerm: string;
  onAddUser: (user: UserProfile) => void;
  onDelete?: (id: string, username: string) => void;
  disabled?: boolean; // NEW: disables all add buttons
}

export interface CategorySelectEditProps {
  categories: ChallengeCategoryType[];
  loading?: boolean;
  selectedCategory: string;
  onCategoryChange: (name: string) => void;
}

export interface FormValues {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
}

export interface ChallengeUserCardProps {
  id: string;
  username: string;
  imagePath: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  doneChallengesCount: number;
  onDelete: (id: string, username: string) => void;
  onAdd?: () => void;
  isOwner: boolean;
  className: string;
}


export interface TitleAndDescriptionFormValues {
  challengeTitle: string;
  challengeDescription: string;
}
