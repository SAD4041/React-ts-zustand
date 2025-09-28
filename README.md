# React + TypeScript + Zustand Project Setup & Usage Guide

This document explains how to set up and work with the project.

---

## 🚀 Getting Started

### Prerequisites

-   **Node.js** (recommended: latest LTS version)
-   **npm**

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Running the Development Server

Start the development server with:

```bash
npm run dev
```

It runs on **[http://localhost:3000](http://localhost:3000)**.

### Build

```bash
npm run build
```

---

## 📂 Project Structure

```
src/
├── assets/               # Static files like images
├── components/           # Reusable components
│   ├── Custom/           # Custom components (buttons, inputs, etc.)
│   └── ui/               # shadcn/ui components (pre-styled components)
├── layouts/              # Layout components
├── pages/                # Page components
├── routes/
│   └── route.tsx         # Central route configuration
├── services/             # API service layer
│   ├── services.ts       # Generic request templates (GET, POST, PUT, DELETE)
│   └── authService.ts    # Example: authentication services
├── store/                # Zustand stores
│   └── useProfileStore.ts # Example store for user profile state
├── types/                # TypeScript types & interfaces
│   └── authTypes.ts      # Example: auth-related types
├── utils/                # Utility functions
│   └── translateNumbers.ts # Example utility function
└── toast/                # Toast notifications setup
```

---

## 🗄️ State Management (Zustand)

Stores are located in `src/store/`. Example usage of a persisted profile store:

```ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserState } from "@/types/userTypes";

const useProfileStore = create<UserState>()(
	persist(
		(set) => ({
			username: null,
			setUsername: (username: string) => set({ username }),
		}),
		{
			name: "profile-storage",
			storage: createJSONStorage(() => sessionStorage), // change to localStorage if persistent across sessions
		}
	)
);

export default useProfileStore;
```

Example usage in a component:

```ts
import useProfileStore from "@/store/useProfileStore";

const username = useProfileStore((state) => state.username);
const setUsername = useProfileStore((state) => state.setUsername);
```

---

## 🛠️ Services

`services.ts` provides generic HTTP methods (GET, POST, PUT, DELETE, etc.). Specific services like `authService.ts` use these templates.

Example (`authService.ts`):

```ts
import type { LoginPayload, LoginResponse } from "@/types/authTypes";
import { postData } from "./services";

export const loginService = async (
	credentials: LoginPayload
): Promise<LoginResponse> => {
	return postData({
		endPoint: `/v1/auth/login`,
		data: credentials,
	});
};
```

---

## 📏 Conventions & Notes

-   **TypeScript types** should be placed in `src/types/`.
-   **Reusable utilities** belong in `src/utils/`.
-   **Assets** (images, icons, etc.) go inside `src/assets/`.
-   **Toast notifications** are set up in the `toast/` folder.
-   **Shadcn UI components** are in `src/components/ui/`.
-   Zustand stores should be persisted when needed and properly named to match file names.

---

✅ You’re ready to start coding!
