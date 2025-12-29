// src/stores/userStore/userStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserState } from "@/types/userTypes";

const useUserStore = create<UserState>()(
	persist(
		(set, get) => ({
			token: null,
			user: null,
			isAuthenticated: false,
			profileCompleted: false, // فعلاً false، بعداً از API میاد

			setToken: (token: string) =>
				set({ token, isAuthenticated: !!token }),

			setUser: (user) =>
				set({ user }),

			setAuth: (token: string, user) =>
				set({ token, user, isAuthenticated: true }),

			setProfileCompleted: (completed: boolean) =>
				set({ profileCompleted: completed }),

			clearAuth: () =>
				set({ 
					token: null, 
					user: null, 
					isAuthenticated: false,
					profileCompleted: false 
				}),

			// Helper getters
			getUserId: () => get().user?.id || null,
			getRole: () => get().user?.role || null,
			isBrand: () => get().user?.role === 'brand',
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

export default useUserStore;