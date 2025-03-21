'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, Divider, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { AuthService } from '@/services/auth.service';
import { LoginCredentials } from '@/types/auth.types';
import styles from '@/styles/components/auth/LoginForm.module.css';
import Link from 'next/link';

const { Title, Text } = Typography;

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: LoginCredentials) => {
    setIsLoading(true);
    try {
      await AuthService.login(values);
      router.push('/');
      router.refresh();
    } catch (err) {
      message.error(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card 
        className={`${styles.form} ${styles.formWrapper}`}
        styles={{
          body: {
            padding: '40px',
          }
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className={styles.logoWrapper}>
            <Image
              src="/assets/auth/shield_icon.jpg"
              alt="Security Shield"
              width={50}
              height={50}
              priority
              unoptimized={true}
            />
          </div>
          <Title level={2} style={{ margin: '16px 0 8px', fontSize: '28px' }}>
            Đăng nhập
          </Title>
          <Text type="secondary">
            Chào mừng bạn quay trở lại
          </Text>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <div style={{ textAlign: 'right', marginBottom: 24 }}>
            <Link href="/forgot-password">
              Quên mật khẩu?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <Divider plain>Hoặc</Divider>

          <Button 
            block 
            icon={<GoogleOutlined />}
            onClick={() => {/* Xử lý đăng nhập Google */}}
            style={{ marginBottom: 24 }}
          >
            Đăng nhập với Google
          </Button>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              Chưa có tài khoản? <Link href="/register">Đăng ký ngay</Link>
            </Text>
          </div>
        </Form>
      </Card>

      <div className={styles.decorationLeft}>
        <Image
          src="/assets/auth/secure-login.svg"
          alt="Secure Login"
          width={100}
          height={100}
          priority
        />
      </div>
      
      <div className={styles.decorationRight}>
        <Image
          src="/assets/auth/data-protection.svg"
          alt="Data Protection"
          width={100}
          height={100}
          priority
        />
      </div>
    </div>
  );
} 

export default LoginForm;