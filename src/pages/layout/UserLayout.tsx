import { Layout } from 'antd';
import { Outlet } from 'react-router';
import Siderbar from '../../components/sidebar/sidebar';
import UserHeader from '../../components/header/UserHeader';
import { type IMenuItem } from '../../config/menu-item';
import { ArrowDownOutlined, ArrowUpOutlined, DollarCircleFilled, DollarCircleOutlined, OrderedListOutlined, ProductFilled, UserSwitchOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, List } from 'antd';
import { Content } from 'antd/es/layout/layout';
import NotificationDemo from '../../components/Notification';


const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

const UserLayout = ({ menu }: Readonly<{ menu: Array<IMenuItem> }>) => {
  return (
    <Layout className="h-screen">
      <Siderbar menu={menu} />
      <Layout>
        <UserHeader />
        <Content
          className='bg-gray-50'
          style={{
            padding: 24,
          }}
        >
          <div justify-content="space-between">
            <Row gutter={15} className='mb-5'>
              <Col span={4}>
                <Card variant="borderless" className='hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer'>
                  <Statistic
                    className='font-semibold font-sans text-lg text-gray-700'
                    title="Total Sales"
                    value={2500000}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<DollarCircleFilled
                      className='gap-5' />}

                  />
                </Card>
                <NotificationDemo />
              </Col>
              <Col span={4}>
                <Card variant="borderless">
                  <Statistic
                    className='font-semibold font-sans text-lg text-gray-700'
                    title="Total Orders"
                    value={1240}
                    valueStyle={{ color: '#2593fc' }}
                    prefix={<OrderedListOutlined />}
                  />
                </Card>
              </Col>
              <Col span={4}>
                <Card variant="borderless">
                  <Statistic
                    className='font-semibold font-sans text-lg text-gray-700'
                    title="Total Customers"
                    value={1240}
                    valueStyle={{ color: '#78dfff' }}
                    prefix={<UserSwitchOutlined />}
                  />
                </Card>
              </Col>
              <Col span={4}>
                <Card variant="borderless">
                  <Statistic
                    className='font-semibold font-sans text-lg text-gray-700'
                    title="Total Products"
                    value={1240}
                    valueStyle={{ color: '#6f42c1' }}
                    prefix={<ProductFilled />}
                  />
                </Card>
              </Col>
            </Row>
          </div>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.title}>Card content</Card>
              </List.Item>
            )}
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default UserLayout; 