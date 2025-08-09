import { Navigate, Outlet } from 'react-router';
import { Layout } from 'antd';
import Siderbar from '../../components/sidebar/sidebar';
import UserHeader from '../../components/header/UserHeader';
import { type IMenuItem } from '../../config/menu-item';
import { useAuth } from '../../context/auth.context';
import { toast } from 'sonner';
import type { UserRoles } from '../../config/constant';
import { useState, useEffect } from 'react';
import { Content } from 'antd/es/layout/layout';

const UserLayout = ({ menu, role }: Readonly<{ menu: Array<IMenuItem>, role: UserRoles }>) => {
  const { loggedInUser } = useAuth();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [navigateTo, setNavigateTo] = useState<string | null>(null);

  useEffect(() => {
    if (shouldNavigate && navigateTo) {
      // navigation will be triggered by rendering <Navigate />
    }
  }, [shouldNavigate, navigateTo]);

  if (loggedInUser) {
    if (loggedInUser.role === role) {
      return (
        <Layout className="h-screen">
          <Siderbar menu={menu} />
          <Layout>
            <UserHeader />
            <Content className="flex-1 min-h-0 overflow-y-auto">
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      );
    } else {
      if (!shouldNavigate) {
        toast.warning('Access Denied', {
          description: 'You do not have permission to access the requested page.',
        });
        setTimeout(() => {
          setNavigateTo('/' + loggedInUser.role);
          setShouldNavigate(true);
        }, 100);
      }
      if (shouldNavigate && navigateTo) {
        return <Navigate to={navigateTo} />;
      }
      return null;
    }
  }
};

export default UserLayout;