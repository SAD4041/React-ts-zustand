// src/stores/useProfileStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthUserWithTokens } from "@/types/authTypes";

interface AuthState {
  authUser: AuthUserWithTokens | null;
  setAuth: (user: AuthUserWithTokens) => void;
  clearAuth: () => void;
}

const useUserStore = create<AuthState>()(
  persist(
    (set) => ({
      authUser: null,

      setAuth: (user) => set(() => ({ authUser: user })),

      clearAuth: () => set(() => ({ authUser: null })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage), // یا sessionStorage اگر خواستی
    }
  )
);

export default useUserStore;