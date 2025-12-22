export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	message?: string;
	error?: any;
}

export interface CheckPhonePayload {
	mobile: string;
}

export interface VerifyCodePayload {
	mobile: string;
	otp: string;
}

export interface VerifyCodeResponse {
	message: string;
	userExist: boolean;
	token: string;
}

export interface CheckPhoneResponse {
	registered: boolean;
	message?: string;
}