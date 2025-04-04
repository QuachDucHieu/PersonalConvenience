import { LoginCredentials, RegisterCredentials, RegisterResponse, LoginResponse } from '@/types/auth.types';
import { API_ENDPOINTS } from '@/utils/constants';
// import { httpClient } from '@/utils/http';
import Cookies from 'js-cookie';
// import { router } from 'next/navigation';
import { UsersListResponse } from '@/types/users.type'
import api from '@/utils/api';

export class AuthService {
    //login
    static async login(credentials: LoginCredentials): Promise<LoginResponse> {
      try {
        const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
        
        const data = response.data;
        if (data?.access_token) {
          this.setToken(data.access_token);
          this.setUser(JSON.stringify(data.user));
          return data;
        }
        throw new Error('Invalid response from server');
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    }

  static setToken(token: string): void {
    // Set cookie với httpOnly và secure options
    Cookies.set('token', token, {
      expires: 7, // Token hết hạn sau 7 ngày
      secure: process.env.NODE_ENV === 'production', // Chỉ dùng HTTPS trong production
      sameSite: 'strict'
    });
  }

  static setUser(user: string): void {
    Cookies.set('user', user)
  }

  static getToken(): string | null {
    return Cookies.get('token') || null;
  }

  static removeToken(): void {
    Cookies.remove('token');
  }

  static isAuthenticated(): boolean {
    return !!Cookies.get('token');
  }

  //register

  static async register(credentials: RegisterCredentials): Promise<RegisterResponse> {
    try {
      // const response = await httpClient<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, {
      //   method: 'POST',
      //   body: JSON.stringify(credentials),
      // });

      const response = await api.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, credentials);
      
      // Lưu access_token
    //   this.setToken(response.access_token);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async logout(): Promise<void> {
    Cookies.remove('token');
    window.location.href = '/login';
  }
} 