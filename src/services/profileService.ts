// src/services/profileService.ts

import { getData } from './services';
import useUserStore from '@/store/userStore/userStore';

export interface UserProfile {
  id: number;
  name?: string;
  email?: string;
  phone: string;
  bio?: string;
  avatar?: string;
  address?: string;
  profile_completed?: boolean;
}

/**
 * چک کردن اینکه پروفایل تکمیل شده یا نه
 * فعلاً از store می‌خونیم، بعداً از API
 */
export const checkProfileCompletion = async (): Promise<boolean> => {
  try {
    // 🔴 بعداً این رو uncomment کن و از API بخون:
    // const profile = await getData({
    //   endPoint: '/api/user/profile',
    // });
    // 
    // // اگر API فیلد profile_completed داره:
    // const isComplete = profile.profile_completed === true;
    // 
    // // آپدیت store
    // useUserStore.getState().setProfileCompleted(isComplete);
    // 
    // return isComplete;

    // 🟢 فعلاً از store می‌خونیم
    const profileCompleted = useUserStore.getState().profileCompleted;
    return profileCompleted;
    
  } catch (error) {
    console.error('Error checking profile completion:', error);
    return false;
  }
};

/**
 * دریافت اطلاعات پروفایل کاربر
 */
export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    // 🔴 بعداً این رو uncomment کن:
    // const profile = await getData({
    //   endPoint: '/api/user/profile',
    // });
    // return profile;

    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};