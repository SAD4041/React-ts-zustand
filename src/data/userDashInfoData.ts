import type { Address } from '@/types/UserDashInfoTypes';
import type { UserInfo } from '@/types/UserDashInfoTypes';

export const Addresses: Address[] = [
  {
    id: '1',
    title: 'خانه',
    fullAddress: 'تهران، خیابان ولیعصر، پلاک ۱۲۳، واحد ۵',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    isDefault: true,
  },
  {
    id: '2',
    title: 'محل کار',
    fullAddress: 'تهران، میدان ونک، برج سپهر، طبقه ۱۵',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    isDefault: false,
  },
];

export let UserData: UserInfo = {
  firstName: 'علی',
  lastName: 'احمدی',
  email: 'ali.ahmadi@example.com',
  phone: '09123456789',
  nationalCode: '1234567890',
  birthDate: '1370/01/15',
  password: 'OldPass123!',
};

export const getUserData = () => ({ ...UserData });
export const setUserData = (newData: UserInfo) => {
  UserData = { ...newData };
  console.log('User data updated:', UserData);
};