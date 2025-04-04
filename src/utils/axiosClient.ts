import Cookies from 'js-cookie';
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const AUTHENTICATION_ERROR_STATUS = 401;
const NOT_FOUND_STATUS = 404;

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosClient = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('token');
    
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        'X-Secret-Key': process.env.NEXT_PUBLIC_JWT_SECRET || 'duahauhihi',
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === AUTHENTICATION_ERROR_STATUS) {
      Cookies.remove('token');
      window.location.href = '/login';
      return Promise.reject(new Error('Unauthorized'));
    }
    if (response.data.code === NOT_FOUND_STATUS) {
      window.location.href = '/404';
      return Promise.reject(new Error('Not Found'));
    }
    return response;
  },
  (error) => {
    if (error?.status === AUTHENTICATION_ERROR_STATUS) {
      Cookies.remove('token');
      window.location.href = '/login';
      return Promise.reject(new Error('Unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default axiosClient;