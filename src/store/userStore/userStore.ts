// src/stores/userStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserState } from "../../types/userTypes";

const useUserStore = create<UserState>()(
	persist(
		(set, get) => ({
			token: null,
			user: null,
			isAuthenticated: false,

			setToken: (token: string) =>
				set({ token, isAuthenticated: !!token }),

			setUser: (user) =>
				set({ user }),

			setAuth: (token: string, user) =>
				set({ token, user, isAuthenticated: true }),

			clearAuth: () =>
				set({ token: null, user: null, isAuthenticated: false }),

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