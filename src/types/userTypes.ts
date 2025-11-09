// src/types/userTypes.ts

export interface UserState {
	username: string | null;
	token: string | null; // Add token to the interface
	setUsername: (username: string) => void;
	setToken: (token: string) => void; // Add setToken function
  }
  
