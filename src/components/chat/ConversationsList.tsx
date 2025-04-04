'use client';
import { useState, useEffect } from 'react';
import { List, Avatar, Typography, Badge, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Conversation } from '@/types/chat.types';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';
import styles from './Chat.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { getListConversations } from '@/store/chat/chat.action';
import { RootState, useAppDispatch } from '@/store/store';

const cx = classNames.bind(styles);

const { Text } = Typography;

interface ConversationsListProps {
    onSelectConversation: (userId: number) => void;
    selectedUserId?: number;
}

const ConversationsList = ({ onSelectConversation, selectedUserId }: ConversationsListProps) => {
    const dispatch = useAppDispatch();
    const { conversations, loading } = useSelector((state: RootState) => state.chat);

    useEffect(() => {
        timeago.register('vi', vi);
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        dispatch(getListConversations());
    };

    const formatMessageTime = (dateString: string) => {
        try {
            return timeago.format(new Date(dateString), 'vi');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return '';
        }
    };

    const headerItemConver = (data: Conversation) => {
        return (
            <div className={cx('header-item-conver')}>
                {data.otherUser.name}
                {data?.latestMessage?.createdAt && (
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        {formatMessageTime(data.latestMessage.createdAt)}
                    </Text>
                )}
            </div>
        )
    }

    return (
        <List
            loading={loading}
            dataSource={conversations || []}
            renderItem={(conv) => (
                <List.Item
                    onClick={() => onSelectConversation(conv.otherUser.id)}
                    style={{
                        cursor: 'pointer',
                        backgroundColor: selectedUserId === conv.otherUser.id ? '#f0f0f0' : 'white',
                        padding: '12px',
                    }}
                >
                    <List.Item.Meta
                        avatar={
                            <Badge count={conv.unreadCount}>
                                <Avatar icon={<UserOutlined />} />
                            </Badge>
                        }
                        title={headerItemConver(conv)}
                        description={
                            <Space direction="vertical" size={0}>
                                <Text ellipsis style={{ maxWidth: '200px' }}>
                                    {conv?.latestMessage.content}
                                </Text>
                            </Space>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default ConversationsList; 