import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Header } from '@/components';

export const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </>
  );
};
