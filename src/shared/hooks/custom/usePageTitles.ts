import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import type { TRoutes } from '@/router';

const generalPageTitle = 'Тест Связи Чисел';

export const usePageTitles = (routes: TRoutes) => {
  const location = useLocation();

  useEffect(() => {
    const route = Object.values(routes).find((item) => item.path === location.pathname);

    document.title = `${generalPageTitle} - ${route?.pageTitle || 404}`;
  }, [location]);
};
