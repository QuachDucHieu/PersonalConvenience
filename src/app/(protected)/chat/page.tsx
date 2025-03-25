'use client';
import { useState } from 'react';
import { Row, Col } from 'antd';
import Chat from '@/components/chat/Chat';
import ConversationsList from '@/components/chat/ConversationsList';
import { User } from '@/types/users.type';

export default function ChatPage() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    // TODO: Lấy thông tin user hiện tại từ context hoặc state management
    const currentUser: User = {
        id: 1,
        name: 'Current User',
        email: 'current@example.com',
        phone: '1234567890'
    };

    return (
        <Row style={{ height: '100vh' }}>
            <Col span={6} style={{ borderRight: '1px solid #f0f0f0' }}>
                <ConversationsList
                    onSelectConversation={(userId) => {
                        // TODO: Fetch user details by ID
                        setSelectedUser({
                            id: userId,
                            name: 'Selected User',
                            email: 'selected@example.com',
                            phone: '0987654321'
                        });
                    }}
                    selectedUserId={selectedUser?.id}
                />
            </Col>
            <Col span={18}>
                {selectedUser ? (
                    <Chat currentUser={currentUser} otherUser={selectedUser} />
                ) : (
                    <div style={{ 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}>
                        Chọn một cuộc trò chuyện để bắt đầu
                    </div>
                )}
            </Col>
        </Row>
    );
} 