// src/services/services.ts
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type {
  DeleteParams,
  GetParams,
  PatchParams,
  PostParams,
  PutParams,
} from "../types/apiTypes";

// ✅ استفاده از متغیر محیطی + fallback به لوکال (برای توسعه)
export const baseURL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 🔑 وقتی سیستم لاگین آماده شد، این قسمت رو فعال کن:
    // const token = localStorage.getItem("token"); // یا از store بخون
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // 🚫 برای FormData، Content-Type رو پاک کن تا مرورگر boundary رو بزنه
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ✅ GET
export const getData = async ({ endPoint, headers, params }: GetParams) => {
  try {
    const response: AxiosResponse = await apiClient.get(endPoint, {
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("error in getData", error);
    throw error;
  }
};

// ✅ POST
export const postData = async ({ endPoint, data, headers }: PostParams) => {
  try {
    const response: AxiosResponse = await apiClient.post(endPoint, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("error in postData", error);
    throw error;
  }
};

// ✅ POST image/form-data — بدون ست کردن دستی Content-Type
export const postImageData = async ({ endPoint, data }: PostParams) => {
  try {
    // ✅ فقط data رو بفرست — apiClient خودش header رو درست می‌کنه
    const response: AxiosResponse = await apiClient.post(endPoint, data);
    return response.data;
  } catch (error) {
    console.error("error in postImageData", error);
    throw error;
  }
};

// ✅ PATCH
export const patchData = async ({ endPoint, data, headers }: PatchParams) => {
  try {
    const response: AxiosResponse = await apiClient.patch(endPoint, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("error in patchData", error);
    throw error;
  }
};

// ✅ PUT
export const putData = async ({ endPoint, data }: PutParams) => {
  try {
    const response: AxiosResponse = await apiClient.put(endPoint, data);
    return response.data;
  } catch (error) {
    console.error("error in putData", error);
    throw error;
  }
};

// ✅ DELETE
export const deleteData = async ({ endPoint, data, headers }: DeleteParams) => {
  try {
    const response: AxiosResponse = await apiClient.delete(endPoint, {
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("error in deleteData", error);
    throw error;
  }
};