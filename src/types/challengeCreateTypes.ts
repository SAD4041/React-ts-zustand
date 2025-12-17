import type { UserProfile } from "./userTypes";

export interface StepOneProps {
  title: string;
  description: string;
  image: string | null;
  onTitleChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onImageChange: (v: string | null) => void;
  errors?: {
    title?: string;
    description?: string;
  };
}

export interface StepTwoProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  categorySearch: string;
  setCategorySearch: React.Dispatch<React.SetStateAction<string>>;
  filteredCategories: string[];
  values: any;
  setFieldValue: (field: string, value: any) => void;
}

export interface Step2DetailsProps {
  categories: ChallengeCategoryType[];
  loadingCategories?: boolean;
  values: any;
  setFieldValue: any;
  errors?: any;
  touched?: any;
}

export interface ChallengeCategoryType {
  id: number;
  name: string;
}

export interface StepThreeProps {
  values: any;
  userSearch: string;
  setUserSearch: React.Dispatch<React.SetStateAction<string>>;
  selectedUsers: UserProfile[];
  removeUser: (id: string) => void;
  availableUsers: UserProfile[];
  addUser: (user: UserProfile) => void;
  canAddMore: boolean;
  memberLimitError: boolean;
}

export interface DateAndLocationInputProps {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  onStartDateChange: (value: string) => void;
  onStartTimeChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

export interface ChallengeData {
  ID: number;
  title: string;
  description: string;
  image_url?: string | null;
  start_time: string;
  end_time: string;
  location?: string;
  participants: UserProfile[];
  visibility: "public" | "private";
  comments_enabled: boolean;
  category_id?: number;
  rule?: string;
  max_participants?: number | null;
  creator_id: number;
}

export interface SelectedCategoryTagProps {
  category: string;
  onRemove: (category: string) => void;
}

export interface createFormValues {
  title: string;
  description: string;
  image: string | null;
  selectedCategory: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  challengeLocation: string;
  challengeType: "عمومی" | "شخصی";
  isCommentsEnabled: boolean;
  memberCount: string;
  selectedUsers: UserProfile[];
}
