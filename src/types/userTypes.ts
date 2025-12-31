// src/types/userTypes.ts

export interface User {
  id: string;
  mobile: string;
  username?: string;
  name?: string;
  avatar?: string;
  role: 'user' | 'brand' ;
  isBrand: boolean; // آیا این کاربر برند هست یا نه
  // هر فیلد دیگه‌ای که از بک میاد
}

export interface UserState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  profileCompleted: boolean; // آیا پروفایل تکمیل شده

  setToken: (token: string) => void;
  setUser: (user: User) => void;
  setAuth: (token: string, user: User) => void;
  setProfileCompleted: (completed: boolean) => void;
  clearAuth: () => void;
  
  // Helper getters
  getUserId: () => string | null;
  getRole: () => 'user' | 'brand' | 'admin' | null;
  isBrand: () => boolean;
  isAdmin: () => boolean;
}