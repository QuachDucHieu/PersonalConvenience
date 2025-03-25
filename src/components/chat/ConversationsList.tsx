'use client';
import { useState, useEffect } from 'react';
import { List, Avatar, Typography, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ChatService } from '@/services/chat.service';
import { Conversation } from '@/types/chat.types';

const { Text } = Typography;

interface ConversationsListProps {
    onSelectConversation: (userId: number) => void;
    selectedUserId?: number;
}

const ConversationsList = ({ onSelectConversation, selectedUserId }: ConversationsListProps) => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        setLoading(true);
        try {
            const data = await ChatService.getUserConversations();
            setConversations(data);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <List
            loading={loading}
            dataSource={conversations}
            renderItem={(conv) => (
                <List.Item
                    onClick={() => onSelectConversation(conv.otherUserId)}
                    style={{
                        cursor: 'pointer',
                        backgroundColor: selectedUserId === conv.otherUserId ? '#f0f0f0' : 'white',
                        padding: '12px',
                    }}
                >
                    <List.Item.Meta
                        avatar={
                            <Badge count={conv.unreadCount}>
                                <Avatar icon={<UserOutlined />} />
                            </Badge>
                        }
                        title={conv.otherUserName}
                        description={
                            <Text ellipsis style={{ maxWidth: '200px' }}>
                                {/* {conv?.lastMessage} */}
                                message
                            </Text>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default ConversationsList; 