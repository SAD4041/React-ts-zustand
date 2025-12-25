// src/api/types.ts

export interface BaseParams {
  endPoint: string;
  headers?: Record<string, any>;
  skipAuth?: boolean;
}

// ---- GET ----
export interface GetParams extends BaseParams {
  params?: Record<string, any>;
}

// ---- POST ----
export interface PostParams extends BaseParams {
  data: any; // می‌تواند object یا FormData باشد
}

// ---- PATCH ----
export type PatchParams = PostParams;

// ---- PUT ----
export type PutParams = PostParams;

// ---- DELETE ----
export interface DeleteParams extends BaseParams {
  data?: any;
}
