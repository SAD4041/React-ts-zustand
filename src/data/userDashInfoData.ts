import type { Address } from '@/types/UserDashInfoTypes';
import type { UserInfo } from '@/types/UserDashInfoTypes';

export let Addresses: Address[] = [
  {
    id: '1',
    userId: '1',
    title: 'خانه',
    province: 'تهران',
    city: 'تهران',
    postalCode: '1234567890',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    fullAddress: 'خیابان ولیعصر، پلاک ۱۲۳، واحد ۵',
    isDefault: true,
  },
  {
    id: '2',
    userId: '1',
    title: 'محل کار',
    province: 'تهران',
    city: 'تهران',
    postalCode: '0987654321',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    fullAddress: 'میدان ونک، برج سپهر، طبقه ۱۵',
    isDefault: false,
  },
];

export let UserData: UserInfo = {
  id: '1',
  firstName: 'علی',
  lastName: 'احمدی',
  avatar: null,
  email: 'ali.ahmadi@example.com',
  phone: '09123456789',
  birthDate: '1370/01/15',
};

export const getUserData = () => ({ ...UserData });
export const setUserData = (newData: UserInfo) => {
  UserData = { ...newData };
  console.log('User data updated:', UserData);
};

export const getAddresses = () => [...Addresses];
export const setAddressesData = (newAddresses: Address[]) => {
  Addresses = [...newAddresses];
  console.log('Addresses updated:', Addresses);
  localStorage.setItem('userAddresses', JSON.stringify(Addresses)); // ذخیره اختیاری
};