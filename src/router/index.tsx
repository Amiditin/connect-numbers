import { createBrowserRouter } from 'react-router-dom';

import { MainLayout, MainErrorBoundary } from '@/layouts';
import { Home, NotFound } from '@/pages';
import { routes } from './routes';

export const router = createBrowserRouter([
  {
    path: routes.root,
    element: <MainLayout />,
    errorElement: <MainErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: routes.notFound, element: <NotFound /> },
    ],
  },
]);
