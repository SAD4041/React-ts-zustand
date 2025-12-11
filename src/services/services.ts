// src/apiClient.ts
import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const baseURL = "http://127.0.0.1:8000"; // backend URL

const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---- دریافت توکن ----
const getTokenFromStore = () => {
  return localStorage.getItem("token");
};

// ---- اینترسپتور درخواست ----
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getTokenFromStore();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ---- اینترسپتور پاسخ ----
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// ----------- متدهای عمومی API -----------

export const getData = async ({ endPoint, headers, params }) => {
  try {
    const response = await apiClient.get(endPoint, { headers, params });
    return response.data;
  } catch (error) {
    console.error("error in getData", error);
    throw error;
  }
};

export const postData = async ({ endPoint, data, headers }) => {
  try {
    const response = await apiClient.post(endPoint, data, { headers });
    return response.data;
  } catch (error) {
    console.error("error in postData", error);
    throw error;
  }
};

export const postImageData = async ({ endPoint, data }) => {
  try {
    const response = await apiClient.post(endPoint, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
  } catch (error) {
    console.error("error in postImageData", error);
    throw error;
  }
};

export const patchData = async ({ endPoint, data, headers }) => {
  try {
    const response = await apiClient.patch(endPoint, data, { headers });
    return response.data;
  } catch (error) {
    console.error("error in patchData", error);
    throw error;
  }
};

export const putData = async ({ endPoint, data }) => {
  try {
    const response = await apiClient.put(endPoint, data);
    return response.data;
  } catch (error) {
    console.error("error in putData", error);
    throw error;
  }
};

export const deleteData = async ({ endPoint, data, headers }) => {
  try {
    const response = await apiClient.delete(endPoint, { data, headers });
    return response.data;
  } catch (error) {
    console.error("error in deleteData", error);
    throw error;
  }
};

export const putImageData = async ({ endPoint, data }) => {
  try {
    const response = await apiClient.put(endPoint, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("error in putImageData", error);
    throw error;
  }
};
