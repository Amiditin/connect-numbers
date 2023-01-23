import { useMemo, useState } from 'react';
import { Navigate, Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, type MenuProps } from 'antd';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';

import { useAppSelector } from '@/shared/hooks';
import { routes } from '@/router';
import { getIsAuth } from '@/redux/auth';

import styles from './MainLayout.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

const { Content, Sider } = Layout;

export const MainLayout: React.FC = () => {
  const isAuthUser = useAppSelector(getIsAuth);

  if (!isAuthUser) {
    return <Navigate to={routes.auth.login} />;
  }

  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        label: 'Главная',
        key: 'home',
        icon: <HomeOutlined />,
        onClick: () => navigate(routes.home),
      },
      {
        label: 'Профиль',
        key: 'profile',
        icon: <UserOutlined />,
        onClick: () => navigate(routes.profile),
      },
    ],
    [],
  );

  return (
    <Layout>
      <Sider
        className={styles.sider}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <Menu
          className={styles.menu}
          theme="dark"
          selectedKeys={[location.pathname.slice(1) || 'home']}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Content className={styles.content}>
        <Outlet />
        <ScrollRestoration />
      </Content>
    </Layout>
  );
};
