import { useEffect } from 'react'; 
import { Table, Tag, Space, Typography, Layout, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchProjects } from '../redux/projectSlice'; 

const { Header, Content } = Layout;
const { Title } = Typography;

const ProjectPage = () => {
  const dispatch = useDispatch(); 
  
  const { list: projects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects())
      .unwrap()
      .catch((error) => {
        console.error("Lỗi lấy dự án từ Redux:", error);
        message.error('Không lấy được danh sách dự án!');
      });
  }, [dispatch]);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên Dự Án', dataIndex: 'name', key: 'name' },
    { 
      title: 'Trạng Thái', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'volcano'}>
          {(status || 'N/A').toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a href="#edit">Sửa</a>
          <a href="#delete" style={{ color: 'red' }}>Xóa</a>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 20px', display: 'flex', alignItems: 'center' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>Quản Lý Dự Án - Brycen</Title>
      </Header>
      <Content style={{ padding: '24px' }}>
        <div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
          <Table 
            columns={columns} 
            dataSource={projects} 
            rowKey="id" 
            loading={loading} 
          />
        </div>
      </Content>
    </Layout>
  );
};

export default ProjectPage;