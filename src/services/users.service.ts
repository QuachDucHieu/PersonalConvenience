import { API_ENDPOINTS } from '@/utils/constants';
import { httpClient } from '@/utils/http';
import {UsersListResponse} from '@/types/users.type';
export class UsersService {
    static async getList(): Promise<UsersListResponse[]> {
        try {
            const response = await httpClient<UsersListResponse[]>(API_ENDPOINTS.USERS.GETLISTUSERS, {
                method: 'GET',
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id: number): Promise<UsersListResponse> {
        try {
            const response = await httpClient<UsersListResponse>(`${API_ENDPOINTS.USERS.GETLISTUSERS}/${id}`, {
                method: 'GET',
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
}