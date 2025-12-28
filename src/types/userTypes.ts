// src/types/userTypes.ts

export interface User {
  id: string;
  mobile: string;
  username?: string;
  role: 'user' | 'brand' | 'admin';
  // هر فیلد دیگه‌ای که از بک میاد
}

export interface UserState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  setToken: (token: string) => void;
  setUser: (user: User) => void;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  
  // Helper getters
  getUserId: () => string | null;
  getRole: () => 'user' | 'brand' | 'admin' | null;
  isBrand: () => boolean;
}