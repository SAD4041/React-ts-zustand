// src/services/userService.ts

import { getData } from './services';
import type { User } from '@/types/userTypes';

export const getCurrentUser = async (): Promise<User> => {
  try {
    const data = await getData({
      endPoint: '/api/user/profile', // یا endpoint که بک‌اند داره
    });
    return data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string): Promise<User> => {
  try {
    const data = await getData({
      endPoint: `/api/users/${userId}`,
    });
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};