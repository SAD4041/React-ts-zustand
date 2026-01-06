import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import useUserStore from "@/store/userStore/userStore";

import type {
  GetParams,
  PostParams,
  PatchParams,
  PutParams,
  DeleteParams,
} from "@/types/apiTypes"; // ← اینجا مهم است

export const baseURL = "http://185.60.136.225";
const TEST_TOKEN = "21|WyyucFOUWGa7pAnkHmTfKVXkMNSGTeTEt31LJ4DC47be1255";

const apiClient: AxiosInstance = axios.create({
  baseURL: "/",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// دریافت توکن
const getTokenFromStore = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return useUserStore.getState().token || TEST_TOKEN;
};

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig & { skipAuth?: boolean }) => {
    const token = getTokenFromStore();
    if (token && !config.skipAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Interceptor response
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// ------------ GET ------------
export const getData = async ({ endPoint, headers, params, skipAuth }: GetParams) => {
  try {
    const response = await apiClient.get(endPoint, ({ headers, params, skipAuth } as unknown) as InternalAxiosRequestConfig);
    return response.data;
  } catch (error) {
    console.error("error in getData", error);
    throw error;
  }
};

// ------------ POST ------------
export const postData = async ({ endPoint, data, headers, skipAuth }: PostParams) => {
  try {
    const response = await apiClient.post(endPoint, data, ({ headers, skipAuth } as unknown) as InternalAxiosRequestConfig);
    return response.data;
  } catch (error) {
    console.error("error in postData", error);
    throw error;
  }
};

// ---- POST Image (multipart/form-data) ----
export const postImageData = async ({ endPoint, data, skipAuth }: PostParams) => {
  try {
    const response = await apiClient.post(
      endPoint,
      data,
      ({
        headers: { "Content-Type": "multipart/form-data" },
        skipAuth,
      } as unknown) as InternalAxiosRequestConfig
    );
    return response.data;
  } catch (error) {
    console.error("error in postImageData", error);
    throw error;
  }
};

// ------------ PATCH ------------
export const patchData = async ({ endPoint, data, headers, skipAuth }: PatchParams) => {
  try {
    const response = await apiClient.patch(endPoint, data, ({ headers, skipAuth } as unknown) as InternalAxiosRequestConfig);
    return response.data;
  } catch (error) {
    console.error("error in patchData", error);
    throw error;
  }
};

// ------------ PUT ------------
export const putData = async ({ endPoint, data, skipAuth }: PutParams) => {
  try {
    const response = await apiClient.put(endPoint, data, ({ skipAuth } as unknown) as InternalAxiosRequestConfig);
    return response.data;
  } catch (error) {
    console.error("error in putData", error);
    throw error;
  }
};

// ------------ DELETE ------------
export const deleteData = async ({ endPoint, data, headers, skipAuth }: DeleteParams) => {
  try {
    const response = await apiClient.delete(endPoint, ({ data, headers, skipAuth } as unknown) as InternalAxiosRequestConfig);
    return response.data;
  } catch (error) {
    console.error("error in deleteData", error);
    throw error;
  }
};

// ---- PUT Image (multipart/form-data) ----
export const putImageData = async ({ endPoint, data, skipAuth }: PutParams) => {
  try {
    const response = await apiClient.put(
      endPoint,
      data,
      ({
        headers: { "Content-Type": "multipart/form-data" },
        skipAuth,
      } as unknown) as InternalAxiosRequestConfig
    );
    return response.data;
  } catch (error) {
    console.error("error in putImageData", error);
    throw error;
  }
};
