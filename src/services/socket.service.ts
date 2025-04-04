import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { SocketMessage } from '@/types/chat.types';

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private messageHandlers: ((message: SocketMessage) => void)[] = [];

  private constructor() {
    // Private constructor để đảm bảo singleton pattern
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect() {
    if (this.socket) return;

    const token = Cookies.get('token');
    if (!token) {
      console.error('Không tìm thấy token để kết nối socket');
      return;
    }

    this.socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', {
      auth: {
        token
      },
      transports: ['websocket', 'polling'],
      path: '/socket.io',
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Đang kết nối đến Socket.IO server:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');

    this.socket.on('connect', () => {
      console.log('Đã kết nối socket thành công');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Lỗi kết nối socket:', error);
    });

    this.socket.on('newMessage', (message: SocketMessage) => {
      console.log('Tin nhắn mới:', message);
      this.messageHandlers.forEach(handler => handler(message));
    });

    this.socket.on('disconnect', () => {
      console.log('Đã ngắt kết nối socket');
    });

    this.socket.on('error', (error: Error) => {
      console.error('Lỗi socket:', error);
    });
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public sendMessage(data: { receiverId: number, content: string, file?: File }) {
    console.log('dataSend', data);
    if (!this.socket) {
      console.error('Socket chưa được kết nối');
      return;
    }

    this.socket.emit('sendMessage', data);
  }

  public onNewMessage(handler: (message: SocketMessage) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }
}

export const socketService = SocketService.getInstance(); 