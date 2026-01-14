// src/services/authService.ts

import axios from "axios";
import type { AuthResponse, LoginPayload, LoginResponse, SignupPayload, VerifyEmailService } from "../types/authTypes";
import { AUTH_BASE, postData } from "./services";


// Login function
// export const loginService = async (
// 	credentials: LoginPayload
// ): Promise<LoginResponse> => {
// 	return postData({
// 		endPoint: `/v1/auth/login`,
// 		data: credentials,
// 	});
// };
// Login function
export const loginService = async (credentials: LoginPayload): Promise<AuthResponse> => {
    return postData({
        endPoint: `${AUTH_BASE}/auth/login`,
        data: credentials,
    });
};

// Signup function
export const signupService = async ({
  username,
  email,
  password,
  bio,
}: SignupPayload) => {
  const data = await postData({
    endPoint: `${AUTH_BASE}/auth/signup`,
    data: { username, email, password, bio },
  });
  return data;
};

export const verifyEmailService = async ({
  email,
  code,
}: VerifyEmailService) => {
  const data = await postData({
    endPoint: `${AUTH_BASE}/verify`,
    data: { email, code },
  });
  return data;
};

export const resendVerificationCode = async (email: string,password:string) => {
  // const res = await axios.post(`${AUTH_BASE}/resend-verification`, { email });
  const data = await postData({
    endPoint: `${AUTH_BASE}/resend-verification`,
    data: { email,password },
  });
  return data;
};
