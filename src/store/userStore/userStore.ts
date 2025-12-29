// src/stores/useProfileStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserState } from "../../types/userTypes";

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: null,
      accessToken: null,
      

      setUsername: (username: string) => set((prev) => ({ ...prev, username })),
      setAccessToken: (accessToken: string | undefined) =>
        set((prev) => ({ ...prev, accessToken })),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
