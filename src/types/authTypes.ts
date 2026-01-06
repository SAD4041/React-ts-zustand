export interface SignupPayload {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export interface SignupResponse {
	statusCode: number;
	messages?: SignupResponseErrors;
	message?: string;
}

export interface SignupResponseErrors {
	name: string;
	email?: string;
	password?: string;
}

export interface LoginPayload {
	email: string;
	password: string;
	rememberMe: boolean;
}

export interface LoginResponse {
	statusCode: number;
	messages?: LoginResponseErrors;
	message?: string;
	data?: LoginResponseData;
}

export interface LoginResponseErrors {
	email?: string;
	password?: string;
}

export interface LoginResponseData {
	accessToken: string;
	permissions: PermissionResponse[];
}

export interface PermissionResponse {
	id: number;
	name: string;
	description: string;
}

export interface ForgetPasswordPayload {
	Email: string;
}

export interface ForgetPasswordResponse {
	statusCode: number;
	messages?: ForgetPasswordErrors;
	message?: string;
}

export interface ForgetPasswordErrors {
	Email?: string;
}


export interface ResetPasswordPayload {
	email: string;   
	token: string;   
	password: string; 
  }
  
  export interface ResetPasswordResponse {
	statusCode: number;
	message?: string;
	messages?: {
	  password?: string;
	  email?: string;
	  token?: string;
	};
  }
  