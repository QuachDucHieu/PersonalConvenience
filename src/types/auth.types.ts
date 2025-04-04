export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: UsersListResponse;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterResponse {
  access_token: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
} 

interface UsersListResponse {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
}