import { Navigate, Outlet, ScrollRestoration } from 'react-router-dom';

import { Header } from '@/components';
import { routes } from '@/router';
import { useAppSelector } from '@/shared/hooks';
import { getIsAuth } from '@/redux/auth';

export const MainLayout: React.FC = () => {
  const isAuthUser = useAppSelector(getIsAuth);

  if (!isAuthUser) {
    return <Navigate to={routes.auth.login} />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </>
  );
};
