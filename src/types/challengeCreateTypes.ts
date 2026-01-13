import type { UserProfile } from "./userTypes";

export interface StepOneProps {
  title: string;
  description: string;
  image: string | null;
  onTitleChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onImageChange: (v: string | null) => void;
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
