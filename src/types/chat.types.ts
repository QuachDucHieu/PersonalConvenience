export interface Message {
    id: number;
    content: string;
    senderId: number;
    receiverId: number;
    createdAt: string;
    isRead: boolean;
}

export interface Conversation {
    id: number;
    otherUserId: number;
    otherUserName: string;
    lastMessage?: string;
    lastMessageTime?: string;
    unreadCount: number;
}

export interface SendMessageDto {
    receiverId: number;
    content: string;
    file?: File;
} 