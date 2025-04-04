'use client';
import { useEffect, useState } from 'react';import { Row, Col, Spin } from 'antd';
import Chat from '@/components/chat/Chat';
import ConversationsList from '@/components/chat/ConversationsList';
import { UsersListResponse } from '@/types/users.type';
import styles from './Chat.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'next/navigation';
import { UsersService } from '@/services/users.service';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const ChatPage = () => {
    // TODO: Lấy thông tin user hiện tại từ context hoặc state management
    // const currentUser: UsersListResponse = {
    //     id: 1,
    //     name: 'Current User',
    //     email: 'current@example.com',
    //     phone: '1234567890'
    // };

    const params = useParams();
    const [user, setUser] = useState<UsersListResponse | null>(null);
    const [currentUser, setCurrentUser] = useState<UsersListResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, [params.userId]);

    useEffect(() => {
        const user = Cookies.get('user');
        if(user) setCurrentUser(JSON.parse(user));
    }, [])

    const fetchUser = async () => {
        console.log('params', params);
        try {
            const userId = params.userId as string;
            if(!userId) return;
            const userData = await UsersService.getById(parseInt(userId));
            setUser(userData);
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
        </div>
        );
    }

    const onChangeUser = async (id: number) => {
        try {
            const userData = await UsersService.getById(id);
            setUser(userData);
            // Cập nhật URL với userId mới
            window.history.pushState({}, '', `/chat/${id}`);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    return (
        <Row className={cx('chat-page')}>
            <Col span={6} style={{ borderRight: '1px solid #f0f0f0', height: '100%' }}>
                <ConversationsList
                    onSelectConversation={onChangeUser}
                    selectedUserId={user?.id}
                />
            </Col>
            <Col span={18} style={{ height: '100%'}}>
                {user ? (
                    <Chat currentUser={currentUser} otherUser={user} />
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

export default ChatPage;