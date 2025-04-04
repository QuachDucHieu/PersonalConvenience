import { ApiProperty } from '@nestjs/swagger';
import { Message } from './message.entity';

export class Conversation {
  @ApiProperty({
    example: 1,
    description: 'ID của cuộc trò chuyện',
  })
  id: number;

  @ApiProperty({
    example: {
      id: 2,
      name: 'Nguyễn Văn B',
      avatar: 'https://example.com/avatar.jpg',
    },
    description: 'Thông tin người dùng',
  })
  user: {
    id: number;
    name: string;
    avatar?: string;
  };

  @ApiProperty({
    example: {
      id: 10,
      content: 'Xin chào!',
      senderId: 2,
      receiverId: 1,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    },
    description: 'Tin nhắn cuối cùng',
    required: false,
  })
  lastMessage?: Message;

  @ApiProperty({
    example: 3,
    description: 'Số tin nhắn chưa đọc',
  })
  unreadCount: number;
} 