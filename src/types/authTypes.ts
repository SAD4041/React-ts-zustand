export interface LoginPayload {
	email: string;
	username: string | null;
	password: string;
}

export interface LoginResponse {
	user: {
		id: number;
		name: string;
		email: string;
		username: string;
	};
}

export interface ValidationFormValues {
  code: string;
}