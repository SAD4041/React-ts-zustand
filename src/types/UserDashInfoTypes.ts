export type Address = {
  id: string;
  userId: string;
  title: string;
  province: string;
  city: string;
  fullAddress: string;
  postalCode: string;
  isDefault: boolean;
};

export type AddressFormData = {
  title: string;
  province: string;
  city: string;
  postalCode: string;
  fullAddress: string;
  isDefault: boolean;
};

export interface UserInfo {
  id?: string;
  avatar: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
}

export interface ProfileInfoProps {
  initialData: UserInfo;
  onSave: (data: UserInfo) => void;
}

export interface AddressCardProps {
  address: Address;
  onEdit?: () => void;
  onDelete: (id: string) => void;
}

export interface ProfileHeaderProps {
  user: {
    firstName: string;
    email: string;
    profileImage?: string | null;
  };
  onAvatarChange?: (file: File | null) => void;
}

export interface AddressFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (address: AddressFormData) => void;
  initialData?: Address | null;
}


export interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

export interface ChangePasswordProps {
  currentPassword: string;
  onSave: (newPassword: string) => void;
}

export interface AddressSectionProps {
  addresses: Address[];
  onAddAddress: (newAddress: AddressFormData) => void;
  onUpdateAddress: (id: string, updatedAddress: AddressFormData) => void;
  onDeleteAddress: (id: string) => void;
}