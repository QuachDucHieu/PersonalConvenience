import { API_ENDPOINTS } from '@/utils/constants';
import api, { configHeader} from '@/utils/api';
import { Message, Conversation, SendMessageDto } from '@/types/chat.types';

export class ChatService {
    static async sendMessage(data: SendMessageDto): Promise<Message> {
        try {
            const formData = new FormData();
            formData.append('receiverId', data.receiverId.toString());
            formData.append('content', data.content);
            formData.append('receiverId', '1');
            if (data.file) {
                formData.append('file', data.file);
            }
            return (await api.post<Message>(API_ENDPOINTS.CHAT.SEND, formData, configHeader)).data;
        } catch (err: unknown) {
            console.log('err', err);
            throw err;
        }
    }

    static async getConversation(otherUserId: number): Promise<Message[] | null> {
        // return httpClient<Message[]>(API_ENDPOINTS.CHAT.GET_CONVERSATION(otherUserId), {
        //     method: 'GET',
        // });

        return (await api.get<Message[]>(API_ENDPOINTS.CHAT.GET_CONVERSATION(otherUserId))).data;
    }

    static async getListConversations(): Promise<Conversation[]> {
        // return httpClient<Conversation[]>(API_ENDPOINTS.CHAT.CONVERSATIONS, {
        //     method: 'GET',
        // });
        return (await api.get<Conversation[]>(API_ENDPOINTS.CHAT.CONVERSATIONS)).data;
    }

    static async markAsRead(messageId: number): Promise<void> {
        // return httpClient(API_ENDPOINTS.CHAT.MARK_AS_READ(messageId), {
        //     method: 'POST',
        // });
        return (await api.post<void>(API_ENDPOINTS.CHAT.MARK_AS_READ(messageId))).data;
    }
} 