'use client';
import { useEffect, useState } from 'react';
import { Card, List, Avatar, Typography, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { UsersService } from '@/services/users.service';
import { UsersListResponse } from '@/types/users.type';

const { Title } = Typography;

export default function ChatListPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UsersListResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await UsersService.getList();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Danh sách chat</Title>
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(user) => (
            <List.Item 
              style={{ cursor: 'pointer' }}
              onClick={() => router.push(`/chat/${user.id}`)}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={user.name}
                description={user.email}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
} 