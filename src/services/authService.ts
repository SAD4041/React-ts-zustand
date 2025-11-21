// src/services/authService.ts

import type {
  LoginPayload,
  LoginSuccessResponse,
  RegisterPayload,
  RegisterSuccessResponse,
} from "../types/authTypes";

import { postData } from "./services";

// Login function
export const loginService = async (
  payload: LoginPayload
): Promise<LoginSuccessResponse> => {
  return postData({
    endPoint: "/v1/auth/login",
    data: payload,
  });
};

export const registerService = async (
  payload: RegisterPayload
): Promise<RegisterSuccessResponse> => {
  return postData({
    endPoint: `/v1/auth/signup`, 
    data: payload,
  });
};
