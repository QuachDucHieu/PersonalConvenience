'use client';
import { Table, Button, message } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { UsersListResponse } from '@/types/users.type';
import { UsersService } from '@/services/users.service';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Users = () => {

    const [users, setUsers] = useState<UsersListResponse[]>([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await UsersService.getList();
            setUsers(data);
        } catch (error: any) {
            console.error('Error fetching users:', error);
            message.error('Không thể tải danh sách người dùng');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleMessage = (user: UsersListResponse) => {
        // Xử lý logic nhắn tin ở đây
        message.info(`Nhắn tin với ${user.name}`);
        router.push(`/chat/${user.id}`);
    }

    const columns: ColumnsType<UsersListResponse> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: 120,
            render: (_, record) => (
                <Button 
                    type="primary" 
                    icon={<MessageOutlined />}
                    onClick={() => handleMessage(record)}
                >
                    Nhắn tin
                </Button>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            loading={loading}
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Tổng số ${total} người dùng`,
            }}
        />
    );
}

export default Users;