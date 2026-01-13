
export interface LoginPayload {
	email: string;
	username?: string | null;
	password: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  bio: string;
}


export interface LoginResponse {
	user: {
		id: number;
		name: string;
		email: string;
		username: string;
	};
}

export interface AuthResponse {
	message : string;
	user_response: {
		id: number;
		username: string;
		email: string;
		bio?: string;
		token: string;
	};
}

export interface VerifyEmailService {
	email : string;
	code : string;
}