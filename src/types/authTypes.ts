export interface LoginPayload {
	email: string;
	password: string;
}

export interface LoginSuccessData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  access_token: string;
  refresh_token: string;
}

export interface LoginSuccessResponse {
  status: number;          // 200
  message: string;         // "login successful"
  data: LoginSuccessData;  // tokens + user
}

export interface LoginErrorResponse {
  status: number;          // 401
  message: string;         // "invalid email or password"
  data: null;
}

export interface RegisterPayload {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	password: string;
}

export interface RegisterSuccessData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  access_token: string;
  refresh_token: string;
}

export interface RegisterSuccessResponse {
  status: number;        // 201
  message: string;       // "user created successfully"
  data: RegisterSuccessData;
}

export interface RegisterErrorResponse {
  status: number;   // 409
  messages: {
    phone?: {
      "already exists"?: string;
    };
    email?: {
      "already exists"?: string;
    };
    [key: string]: any;
  };
  data: null;
}