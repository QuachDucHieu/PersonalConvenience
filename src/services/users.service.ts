import { API_ENDPOINTS } from '@/utils/constants';
import api from '@/utils/api';
import { UsersListResponse } from '@/types/users.type';

export class UsersService {
    static async getList(): Promise<UsersListResponse[]> {
        try {
            const response = await api.get<UsersListResponse[]>(API_ENDPOINTS.USERS.GETLISTUSERS);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id: number): Promise<UsersListResponse> {
        try {
            const response = await api.get<UsersListResponse>(API_ENDPOINTS.USERS.FINDBYID(id));
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}