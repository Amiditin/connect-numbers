import { useMemo } from 'react';
import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, type MenuProps } from 'antd';
import { HomeOutlined, TeamOutlined, PartitionOutlined } from '@ant-design/icons';

import { routes } from '@/router';
import { MainLogo } from '@/shared/assets/images';
import { useAppDispatch } from '@/shared/hooks';
import { authActions } from '@/redux/auth';

import styles from './AdminLayout.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

interface IBreadcrumbItem {
  label: string;
  icon: JSX.Element;
}

const { Content, Header } = Layout;

const breadcrumbMap: Record<string, IBreadcrumbItem> = {
  organizations: {
    label: 'Организации',
    icon: <PartitionOutlined />,
  },
  researchers: {
    label: 'Исследователи',
    icon: <TeamOutlined />,
  },
};

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        label: 'Организации',
        key: 'organizations',
        onClick: () => navigate(routes.organizations.path),
      },
      {
        label: 'Исследователи',
        key: 'researchers',
        onClick: () => navigate(routes.researchers.path),
      },
      {
        label: 'Выйти',
        key: 'exit',
        onClick: () => dispatch(authActions.logout()),
      },
    ],
    [dispatch, navigate],
  );

  // TODO: обновить Breadcrumbs под antd v5.3 https://ant.design/components/breadcrumb#/home/user
  const renderBreadcrumbItemContent = (): React.ReactNode => {
    const curPathname = location.pathname.split('/');
    let breadcrumbItem: React.ReactNode = null;

    Object.keys(breadcrumbMap).some((key) => {
      if (key === curPathname[2]) {
        breadcrumbItem = (
          <Breadcrumb.Item>
            {breadcrumbMap[key].icon}
            <span>{breadcrumbMap[key].label}</span>
          </Breadcrumb.Item>
        );

        return true;
      }

      return false;
    });

    return breadcrumbItem;
  };

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.header_content}>
          <img className={styles.logo} src={MainLogo} alt="Logo" />
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
            <HomeOutlined />
          </Breadcrumb.Item>
          {renderBreadcrumbItemContent()}
        </Breadcrumb>
        <Content className={styles.content}>
          <Outlet />
          <ScrollRestoration />
        </Content>
      </Layout>
    </Layout>
  );
};
