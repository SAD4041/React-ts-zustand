// src/apiClient.ts
import axios from "axios";
import type {
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import type {
	DeleteParams,
	GetParams,
	PatchParams,
	PostParams,
	PutParams,
} from "../types/apiTypes";

export const baseURL = "http://84.32.41.215:8080"; // backend URL

const apiClient: AxiosInstance = axios.create({
	baseURL,
	timeout: 20000,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// 🆕 فعال کردن Authorization header
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
			console.log("✅ Token added to request:", token.substring(0, 20) + "...");
		} else {
			console.warn("⚠️ No token found in localStorage");
		}
		return config;
	},
	(error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error) => {
		console.error("❌ API Error:", error.response?.status, error.response?.data);
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

// ✅ POST image/form-data
export const postImageData = async ({ endPoint, data }: PostParams) => {
	try {
		const response: AxiosResponse = await apiClient.post(endPoint, data, {
			headers: { "Content-Type": "multipart/form-data" },
		});
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