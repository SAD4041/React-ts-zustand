
export interface Address {
  id: string;
  title: string; 
  province: string; 
  city: string;    
  postalCode: string; 
  phone: string;    
  fullAddress: string; 
  isDefault: boolean;
}

export interface UserInfo {
  id?: string;
  avatar: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationalCode: string;
  birthDate: string;
  /* password: string; */
  shabaNumber: string;
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
  onSubmit: (address: Omit<Address, 'id'> & { id?: string }) => void;
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
  onAddAddress: (newAddress: Omit<Address, 'id'>) => void;
  onUpdateAddress: (id: string, updatedAddress: Omit<Address, 'id'>) => void;
  onDeleteAddress: (id: string) => void;
}