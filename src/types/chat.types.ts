export interface Message {
    id: number;
    content: string;
    senderId: number;
    receiverId: number;
    file?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Conversation {
    id: number;
    otherUser : {
        id: number;
        name: string;
        email?: string;
    };
    // lastMessage?: Message;
    unreadCount: number;
    createdAt: string;
    updatedAt: string;
    latestMessage: {
        content: string;
        createdAt: string;
        fileUrl?: string;
        id: number;
        senderId: number
    }
}

export interface SendMessageDto {
    receiverId: number;
    content: string;
    file?: File;
}

export interface SocketMessage {
    id: number;
    content: string;
    senderId: number;
    receiverId: number;
    file?: string;
    createdAt: string;
    updatedAt: string;
} 