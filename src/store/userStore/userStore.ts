// src/stores/useProfileStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserState } from "../../types/userTypes"; 

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // Hardcoded values
      username: "hardcodedUsername", // Replace with desired username
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJpc3MiOiJjaGFsbGVuZ2UtYXBwIiwiZXhwIjoxNzYyMTY5MDU4LCJpYXQiOjE3NjIwODI2NTh9.BOYM3JvHUA6dsLa6KNRLWtdwO1WSXEzVxQxj3HuT9No", // Replace with desired token

      setUsername: (username: string) =>
        set((prev) => ({ ...prev, username })),

      setToken: (token: string) =>
        set((prev) => ({ ...prev, token })),
    }),
    {
      name: "profile-storage", // Store name
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for persistence
    }
  )
);

export default useUserStore;
