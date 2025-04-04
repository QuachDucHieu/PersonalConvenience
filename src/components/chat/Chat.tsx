'use client';
import { useState, useEffect, useRef } from 'react';
import { Input, Button, Upload, message, Card, Avatar, Spin } from 'antd';
import { SendOutlined, PaperClipOutlined, UserOutlined } from '@ant-design/icons';
import { ChatService } from '@/services/chat.service';
import { Message } from '@/types/chat.types';
import { UsersListResponse } from '@/types/users.type';
import { socketService } from '@/services/socket.service';
import styles from './Chat.module.scss';
import classNames from 'classnames/bind';
import type { UploadChangeParam } from 'antd/es/upload';

const cx = classNames.bind(styles);

interface ChatProps {
  currentUser: UsersListResponse | null;
  otherUser: UsersListResponse | null;
}

const Chat = ({ currentUser, otherUser }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Kết nối socket khi component mount
    socketService.connect();

    // Đăng ký lắng nghe tin nhắn mới
    const unsubscribe = socketService.onNewMessage((newMessage) => {
      if (newMessage.senderId === otherUser?.id || newMessage.receiverId === otherUser?.id) {
        setMessages(prev => [...prev, newMessage]);
        scrollToBottom();
      }
    });

    // Cleanup khi component unmount
    return () => {
      unsubscribe();
      socketService.disconnect();
    };
  }, [otherUser?.id]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!otherUser?.id) return;
      
      setLoading(true);
      try {
        const data = await ChatService.getConversation(otherUser.id);
        setMessages(data || []);
        scrollToBottom();
      } catch (error: unknown) {
        console.log(error)
        message.error('Không thể tải tin nhắn');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [otherUser?.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !file) return;
    if (!otherUser?.id) return;

    try {
      // Gửi tin nhắn qua socket
      socketService.sendMessage({
        receiverId: otherUser.id,
        content: inputMessage,
        file: file || undefined
      });

      // Reset input
      setInputMessage('');
      setFile(null);
    } catch (error: unknown) {
        console.log(error)
      message.error('Không thể gửi tin nhắn');
    }
  };

  const handleFileChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      setFile(info.file.originFileObj);
    }
  };

  if (!otherUser) {
    return <div>Vui lòng chọn người dùng để chat</div>;
  }

  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar icon=<UserOutlined/> />
          <span>{otherUser.name}</span>
        </div>
      }
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ height: 'calc(100% - 57px)', display: 'flex', flexDirection: 'column', padding: 0 }}
    >
      <div className={cx('chat-messages')} style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        height: 'calc(100% - 80px)' // 80px là chiều cao của footer
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin />
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.senderId === currentUser?.id ? 'flex-end' : 'flex-start',
                maxWidth: '70%'
              }}
            >
              <Card
                size="small"
                style={{
                  backgroundColor: msg.senderId === currentUser?.id ? '#1890ff' : '#f0f0f0',
                  color: msg.senderId === currentUser?.id ? 'white' : 'black'
                }}
              >
                {msg.content}
                {msg.file && (
                  <div style={{ marginTop: '8px' }}>
                    <a href={msg.file} target="_blank" rel="noopener noreferrer">
                      Xem file đính kèm
                    </a>
                  </div>
                )}
              </Card>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={cx('chat-input')} style={{ padding: '16px', borderTop: '1px solid #f0f0f0', height: '80px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleFileChange}
          >
            <Button icon={<PaperClipOutlined />} />
          </Upload>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onPressEnter={handleSendMessage}
            placeholder="Nhập tin nhắn..."
          />
          <Button 
            type="primary" 
            icon={<SendOutlined />} 
            onClick={handleSendMessage}
          />
        </div>
        {file && (
          <div style={{ marginTop: '8px', fontSize: '12px' }}>
            File đã chọn: {file.name}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Chat; 