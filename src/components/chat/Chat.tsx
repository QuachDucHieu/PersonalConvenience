'use client';
import { useState, useEffect, useRef } from 'react';
import { Card, Input, Button, List, Avatar, Typography, Upload, message } from 'antd';
import { SendOutlined, PaperClipOutlined, UserOutlined } from '@ant-design/icons';
import { ChatService } from '@/services/chat.service';
import { Message, Conversation, SendMessageDto } from '@/types/chat.types';
import { User } from '@/types/users.type';

const { TextArea } = Input;
const { Title } = Typography;

interface ChatProps {
    currentUser: User;
    otherUser: User;
}

const Chat = ({ currentUser, otherUser }: ChatProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        fetchMessages();
        scrollToBottom();
    }, [otherUser.id]);

    const fetchMessages = async () => {
        try {
            const data = await ChatService.getConversation(otherUser.id);
            setMessages(data);
        } catch (error) {
            message.error('Không thể tải tin nhắn');
        }
    };

    const handleSend = async () => {
        if (!inputMessage.trim() && !file) return;

        setLoading(true);
        try {
            const messageDto: SendMessageDto = {
                receiverId: otherUser.id,
                content: inputMessage,
                file: file || undefined,
            };

            const newMessage = await ChatService.sendMessage(messageDto);
            setMessages([...messages, newMessage]);
            setInputMessage('');
            setFile(null);
        } catch (error) {
            message.error('Không thể gửi tin nhắn');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="chat-container" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
            <div className="chat-header" style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                <Title level={4} style={{ margin: 0 }}>
                    {otherUser.name}
                </Title>
            </div>

            <div className="chat-messages" style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
                <List
                    dataSource={messages}
                    renderItem={(msg) => (
                        <List.Item style={{ 
                            justifyContent: msg.senderId === currentUser.id ? 'flex-end' : 'flex-start' 
                        }}>
                            <div style={{
                                maxWidth: '70%',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                backgroundColor: msg.senderId === currentUser.id ? '#1890ff' : '#f0f0f0',
                                color: msg.senderId === currentUser.id ? 'white' : 'black',
                            }}>
                                {msg.content}
                            </div>
                        </List.Item>
                    )}
                />
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input" style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Upload
                        beforeUpload={(file) => {
                            setFile(file);
                            return false;
                        }}
                        showUploadList={false}
                    >
                        <Button icon={<PaperClipOutlined />} />
                    </Upload>
                    <TextArea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        autoSize={{ minRows: 1, maxRows: 4 }}
                        onPressEnter={(e) => {
                            if (!e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                    <Button 
                        type="primary" 
                        icon={<SendOutlined />} 
                        onClick={handleSend}
                        loading={loading}
                    />
                </div>
            </div>
        </Card>
    );
};

export default Chat; 