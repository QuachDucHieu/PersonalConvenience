import { API_ENDPOINTS } from '@/utils/constants';
import { httpClient } from '@/utils/http';
import { Message, Conversation, SendMessageDto } from '@/types/chat.types';

export class ChatService {
    static async sendMessage(data: SendMessageDto): Promise<Message> {
        const formData = new FormData();
        formData.append('receiverId', data.receiverId.toString());
        formData.append('content', data.content);
        if (data.file) {
            formData.append('file', data.file);
        }

        return httpClient<Message>(API_ENDPOINTS.CHAT.SEND, {
            method: 'POST',
            body: formData,
        });
    }

    static async getConversation(otherUserId: number): Promise<Message[]> {
        return httpClient<Message[]>(API_ENDPOINTS.CHAT.GET_CONVERSATION(otherUserId), {
            method: 'GET',
        });
    }

    static async getUserConversations(): Promise<Conversation[]> {
        return httpClient<Conversation[]>(API_ENDPOINTS.CHAT.CONVERSATIONS, {
            method: 'GET',
        });
    }

    static async markAsRead(messageId: number): Promise<void> {
        return httpClient(API_ENDPOINTS.CHAT.MARK_AS_READ(messageId), {
            method: 'POST',
        });
    }
} 