import { useNavigate, Outlet } from 'react-router-dom';

import { useAppSelector, usePageTitles } from '@/shared/hooks';
import { getAuth } from '@/redux/auth';
import { routes } from '@/router';
import { useEffect } from 'react';

export const MainLayout: React.FC = () => {
  const auth = useAppSelector(getAuth);
  const navigate = useNavigate();
  usePageTitles(routes);

  useEffect(() => {
    if (!auth.isAuth) {
      navigate(routes.authLogin.path);
      return;
    }

    if (auth.isAuth === true && auth.user?.email === 'admin@admin.ru') {
      navigate(routes.adminRoot.path);
      return;
    }

    navigate(routes.profile.path);
  }, [auth]);

  return <Outlet />;
};
