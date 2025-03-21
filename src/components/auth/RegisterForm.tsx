'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, Divider, Card, Typography, message, theme } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { AuthService } from '@/services/auth.service';
import { RegisterCredentials } from '@/types/auth.types';
import styles from '@/styles/components/auth/LoginForm.module.css';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const handleSubmit = async (values: RegisterCredentials) => {
    setIsLoading(true);
    try {
      await AuthService.register(values);
      message.success('Đăng ký thành công!');
      router.push('/login');
      message.success('Đăng ký tài khoản thành công');
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
              src="/assets/auth/minimalist_icon.jpg"
              alt="Register Icon"
              width={80}
              height={80}
              priority
              style={{ borderRadius: '50%' }}
            />
          </div>
          <Title level={2} style={{ margin: '16px 0 8px', fontSize: '28px' }}>
            Đăng ký tài khoản
          </Title>
          <Text type="secondary">
            Điền thông tin để tạo tài khoản mới
          </Text>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Vui lòng nhập họ tên' },
              { max: 100, message: 'Họ tên không được quá 100 ký tự' }
            ]}
          >
            <Input
              prefix={<IdcardOutlined />}
              placeholder="Họ tên"
              style={{ backgroundColor: token.colorBgContainer }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
              { max: 100, message: 'Email không được quá 100 ký tự' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              style={{ backgroundColor: token.colorBgContainer }}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^[0-9]+$/, message: 'Số điện thoại chỉ được chứa số' },
              { max: 15, message: 'Số điện thoại không được quá 15 số' }
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Số điện thoại"
              style={{ backgroundColor: token.colorBgContainer }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
              { max: 20, message: 'Mật khẩu không được quá 20 ký tự' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu (6-20 ký tự)"
              style={{ backgroundColor: token.colorBgContainer }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '12px' }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
              style={{
                height: '45px',
                fontSize: '16px',
                background: token.colorPrimary,
              }}
            >
              Đăng ký
            </Button>
          </Form.Item>

          <Divider plain>Hoặc</Divider>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
            {/* <Link href="/register">Đăng ký ngay</Link> */}
              Đã có tài khoản? <Link href="/login" style={{ color: token.colorPrimary }}>Đăng nhập</Link>
            </Text>
          </div>
        </Form>
      </Card>

      <div className={styles.decorationLeft}>
        <Image
          src="/assets/auth/sign-up.svg"
          alt="Sign Up"
          width={100}
          height={100}
          priority
        />
      </div>
      
      <div className={styles.decorationRight}>
        <Image
          src="/assets/auth/welcome.svg"
          alt="Welcome"
          width={100}
          height={100}
          priority
        />
      </div>
    </div>
  );
}