import {Layout} from 'antd';
import { Outlet } from 'react-router';
import Siderbar from '../../components/sidebar/sidebar';
import UserHeader from '../../components/header/UserHeader';
import {type IMenuItem} from '../../config/menu-item';
const {Content} = Layout;

const UserLayout= ({menu}: Readonly<{menu: Array<IMenuItem>}>) => {
  return (
    <Layout className="h-screen font-poppins!">
    <Siderbar menu={menu}/>
      <Layout>
        <UserHeader/>
        <Content
        className='bg-gray-50'
          style={{
            padding: 24,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default UserLayout; 