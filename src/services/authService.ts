// src/services/authService.ts

import type { LoginPayload, LoginResponse } from "../types/authTypes";
import { postData } from "./services";

// Login function
export const loginService = async (
	credentials: LoginPayload
): Promise<LoginResponse> => {
	return postData({
		endPoint: `/v1/auth/login`,
		data: credentials,
	});
};
