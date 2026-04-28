import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axiosClient from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
const response = await axiosClient.post('/Auth/login', {
  username: values.username, 
  password: values.password  
});
      
      localStorage.setItem('token', response.data.token);
      message.success('Đăng nhập thành công, chào bạn!');
      navigate('/projects'); 
    } catch (error) {
      console.error("Lỗi đăng nhập:", error); 
      message.error('Tài khoản hoặc mật khẩu không đúng rồi!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Title level={2}>Brycen Demo</Title>
          <p>Hệ thống quản lý dự án - Ngọc Ánh</p>
        </div>
        <Form name="login" onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Mời bạn nhập Username!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Username (admin)" size="large" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password (123456)" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;