
export interface Address {
  id: string;
  title: string;
  fullAddress: string;
  phone: string;
  isDefault: boolean;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationalCode: string;
  birthDate: string;
  password: string;
}

export interface AddressCardProps {
  address: {
    id: string;
    title: string;
    fullAddress: string;
    phone: string;
    isDefault: boolean;
  };
  onDelete: (id: string) => void;
}

export interface ProfileHeaderProps {
  user: {
    firstName: string;
    email: string;
    profileImage?: string | null;
  };
}