  // src/stores/useProfileStore.ts

  import { create } from "zustand";
  import { persist, createJSONStorage } from "zustand/middleware";
  import type { UserState } from "../../types/userTypes"; 

  const useUserStore = create<UserState>()(
    persist(
      (set) => ({
        username: "",
        token: "", 
      userId: 0, 
        setUsername: (username: string) =>
          set((prev) => ({ ...prev, username })),

        setToken: (token: string) =>
          set((prev) => ({ ...prev, token })),
      setUserId: (userId: number) =>
          set((prev) => ({ ...prev, userId })),
      }),
      {
        name: "profile-storage", // Store name
        storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for persistence
      }
    )
  );

  export default useUserStore;