// src/api/types.ts
export interface BaseParams {
	endPoint: string;
	headers?: Record<string, string>;
}

export interface GetParams extends BaseParams {
	params?: Record<string, any>;
}

export interface PostParams extends BaseParams {
	data: any;
}

export type PatchParams = PostParams;
export type PutParams = PostParams;
export interface DeleteParams extends BaseParams {
	data?: any;
}

export interface CheckPhonePayload {
	phone: string;
}

export interface VerifyCodePayload {
	phone: string;
	code: string;
}

export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	message?: string;
	error?: any;
}
