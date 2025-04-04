export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`
  },
  USERS: {
    GETLISTUSERS: `${API_URL}/users`,
    FINDBYID: (id: number) => `${API_URL}/users/${id}`
  },
  CHAT: {
    SEND: `${API_URL}/chat/messages`,
    CONVERSATIONS: `${API_URL}/chat/conversations`,
    GET_CONVERSATION: (otherUserId: number) => `${API_URL}/chat/conversations/${otherUserId}/messages`,
    MARK_AS_READ: (messageId: number) => `${API_URL}/chat/messages/${messageId}/read`,
  }
} as const; 