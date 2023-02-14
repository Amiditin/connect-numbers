import { useMemo } from 'react';
import { Navigate, Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, type MenuProps } from 'antd';
import { UserOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';

import { useAppSelector } from '@/shared/hooks';
import { routes } from '@/router';
import { getIsAuth } from '@/redux/auth';

import styles from './MainLayout.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

interface IBreadcrumbItem {
  label: string;
  icon: JSX.Element;
}

const { Content, Header } = Layout;

const breadcrumbMap: Partial<Record<string, IBreadcrumbItem>> = {
  profile: {
    label: 'Профиль',
    icon: <UserOutlined />,
  },
  patients: {
    label: 'Пациенты',
    icon: <TeamOutlined />,
  },
};

export const MainLayout: React.FC = () => {
  const isAuthUser = useAppSelector(getIsAuth);

  if (!isAuthUser) {
    return <Navigate to={routes.auth.login} />;
  }

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        label: 'Профиль',
        key: 'profile',
        onClick: () => navigate(routes.profile),
      },
      {
        label: 'Пациенты',
        key: 'patients',
        onClick: () => navigate(routes.patients),
      },
    ],
    [],
  );

  const renderBreadcrumbItemContent = (): React.ReactNode => {
    const curPathname = location.pathname.slice(1);

    for (const key in breadcrumbMap) {
      if (key === curPathname) {
        return (
          <>
            {breadcrumbMap[key]?.icon}
            <span>{breadcrumbMap[key]?.label}</span>
          </>
        );
      }
    }

    return null;
  };

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.header_content}>
          <img
            className={styles.logo}
            src="/src/shared/assets/images/logo.svg"
            alt="Logo"
            onClick={() => navigate(routes.home)}
          />
          <Menu
            className={styles.menu}
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname.slice(1)]}
            items={menuItems}
          />
        </div>
      </Header>
      <Layout className={styles.layout}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <HomeOutlined onClick={() => navigate(routes.home)} />
          </Breadcrumb.Item>
          <Breadcrumb.Item>{renderBreadcrumbItemContent()}</Breadcrumb.Item>
        </Breadcrumb>
        <Content className={styles.content}>
          <Outlet />
          <ScrollRestoration />
        </Content>
      </Layout>
    </Layout>
  );
};
