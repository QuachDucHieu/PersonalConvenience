import { LoginCredentials, LoginResponse, RegisterCredentials, RegisterResponse } from '@/types/auth.types';
import { API_ENDPOINTS } from '@/utils/constants';
import { httpClient } from '@/utils/http';
import Cookies from 'js-cookie';

export class AuthService {
    //login
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await httpClient<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      // Lưu token vào cookie thay vì localStorage
      this.setToken(response.token);
      return response;
    } catch (error) {
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

  static getToken(): string | null {
    return Cookies.get('token') || null;
  }

  static removeToken(): void {
    Cookies.remove('token');
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  //register

  static async register(credentials: RegisterCredentials): Promise<RegisterResponse> {
    try {
      const response = await httpClient<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      // Lưu access_token
    //   this.setToken(response.access_token);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static logout(): void {
    this.removeToken();
    window.location.href = '/login';
  }
} 