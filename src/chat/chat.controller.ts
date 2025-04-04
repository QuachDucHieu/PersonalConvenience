import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { SendMessageDto } from './dto/send-message.dto';
import { Message } from './entities/message.entity';
import { Conversation } from './entities/conversation.entity';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  @ApiOperation({ summary: 'Gửi tin nhắn' })
  @ApiBody({ type: SendMessageDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Tin nhắn đã được gửi thành công', 
    type: Message 
  })
  async sendMessage(@Body() sendMessageDto: SendMessageDto, @Req() req) {
    return this.chatService.sendMessage(sendMessageDto, req.user.id);
  }

  @Get('conversations')
  @ApiOperation({ summary: 'Lấy danh sách cuộc trò chuyện' })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách cuộc trò chuyện', 
    type: [Conversation] 
  })
  async getConversations(@Req() req) {
    return this.chatService.getConversations(req.user.id);
  }

  @Get('conversation/:userId')
  @ApiOperation({ summary: 'Lấy tin nhắn của cuộc trò chuyện với người dùng' })
  @ApiParam({ name: 'userId', description: 'ID của người dùng', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách tin nhắn', 
    type: [Message] 
  })
  async getConversation(@Param('userId') userId: number, @Req() req) {
    return this.chatService.getConversation(req.user.id, userId);
  }

  @Post('read/:messageId')
  @ApiOperation({ summary: 'Đánh dấu tin nhắn đã đọc' })
  @ApiParam({ name: 'messageId', description: 'ID của tin nhắn', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Tin nhắn đã được đánh dấu là đã đọc' 
  })
  async markAsRead(@Param('messageId') messageId: number, @Req() req) {
    return this.chatService.markAsRead(messageId, req.user.id);
  }
} 