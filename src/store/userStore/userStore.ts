import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserState } from "@/types/userTypes";

const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			token: null,

			setToken: (token: string) =>
				set((prev) => ({ ...prev, token })),
			
			clearToken: () =>
				set((prev) => ({ ...prev, token: null })),
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

export default useUserStore;