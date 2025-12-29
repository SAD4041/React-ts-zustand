// src/services/authService.ts

import type {
	LoginPayload,
	LoginResponse,
	SignupPayload,
	SignupResponse,
	ForgetPasswordPayload,
	ForgetPasswordResponse,
	ResetPasswordPayload,
  	ResetPasswordResponse,
} from "@/types/authTypes";
import { postData } from "./services";
import { putData } from "./services";


export const loginService = async (
	credentials: LoginPayload,
): Promise<LoginResponse> => {
	return postData({
		endPoint: `/v1/auth/login`,
		data: credentials,
	});
};

export const signupService = async (
	credentials: SignupPayload,
): Promise<SignupResponse> => {
	return postData({
		endPoint: `/v1/auth/register`,
		data: credentials,
	});
};

export const forgetpasswordService = async (
	credentials: ForgetPasswordPayload,
): Promise<ForgetPasswordResponse> => {
	return postData({
		endPoint: `/v1/auth/forgot-password`,
		data: credentials,
	});
};


// export const resetPasswordService = async (
// 	credentials: ResetPasswordPayload,
//   ): Promise<ResetPasswordResponse> => {
// 	// const { email, token, password } = params;
  
// 	return postData({
// 	  endPoint: `/v1/auth/reset-password`,
// 	  data: credentials, // JSON body
// 	});
//   };


// export const resetPasswordService = async (
// 	params: ResetPasswordPayload,
//   ): Promise<ResetPasswordResponse> => {
// 	const { email, token, password } = params;
  
// 	return postData({
// 	  endPoint: `/v1/auth/reset-password?token=${encodeURIComponent(
// 		token,
// 	  )}&email=${encodeURIComponent(email)}`,
// 	  data: { password }, // JSON body
// 	});
//   };


export const resetPasswordService = async (
	params: ResetPasswordPayload,
  ): Promise<ResetPasswordResponse> => {
	const { email, token, password } = params;
  
	return putData({
	  endPoint: `/v1/auth/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`,
	  data: { password }, // JSON body
	});
  };
  
  

  
  
