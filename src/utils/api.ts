import axiosClient from './axiosClient';
import { AxiosRequestConfig } from 'axios';

interface ApiConfig extends AxiosRequestConfig {
  headers?: {
    'Content-Type': string;
    [key: string]: string;
  };
}

const api = {
  get: <T>(url: string, config?: ApiConfig) => 
    axiosClient.get<T>(url, config),
  
  post: <T>(url: string, data?: unknown, config?: ApiConfig) => 
    axiosClient.post<T>(url, data, config),
  
  patch: <T>(url: string, data: unknown, config?: ApiConfig) => 
    axiosClient.patch<T>(url, data, config),
  
  put: <T>(url: string, data?: unknown, config?: ApiConfig) => 
    axiosClient.put<T>(url, data, config),
  
  delete: <T>(url: string, config?: ApiConfig) => 
    axiosClient.delete<T>(url, config)
};

export const configHeader: ApiConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export default api;
