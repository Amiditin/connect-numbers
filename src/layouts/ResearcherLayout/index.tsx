import { useMemo } from 'react';
import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, type MenuProps } from 'antd';
import { UserOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';

import { routes } from '@/router';
import { MainLogo } from '@/shared/assets/images';

import styles from './ResearcherLayout.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

interface IBreadcrumbItem {
  label: string;
  icon: JSX.Element;
}

const { Content, Header } = Layout;

const breadcrumbMap: Record<string, IBreadcrumbItem> = {
  profile: {
    label: 'Профиль',
    icon: <UserOutlined />,
  },
  patients: {
    label: 'Пациенты',
    icon: <TeamOutlined />,
  },
  patientProfile: {
    label: 'Профиль пациента',
    icon: <UserOutlined />,
  },
};

export const ResearcherLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        label: 'Профиль',
        key: 'profile',
        onClick: () => navigate(routes.profile.path),
      },
      {
        label: 'Пациенты',
        key: 'patients',
        onClick: () => navigate(routes.patients.path),
      },
    ],
    [navigate],
  );

  // TODO: обновить Breadcrumbs под antd v5.3 https://ant.design/components/breadcrumb#/home/user
  const renderBreadcrumbItemContent = (): React.ReactNode => {
    const curPathname = location.pathname.split('/');

    if (curPathname.length > 2 && curPathname[1] === 'patients') {
      return (
        <>
          <Breadcrumb.Item
            className={styles.breadcrumb}
            onClick={() => navigate(routes.patients.path)}>
            {breadcrumbMap.patients.icon}
            <span>{breadcrumbMap.patients.label}</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {breadcrumbMap.patientProfile.icon}
            <span>{breadcrumbMap.patientProfile.label}</span>
          </Breadcrumb.Item>
        </>
      );
    }

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
            <HomeOutlined onClick={() => navigate(routes.home.path)} />
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
