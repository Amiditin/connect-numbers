import { createBrowserRouter } from 'react-router-dom';

import { MainLayout, MainErrorBoundary } from '@/layouts';
import { HomePage, NotFoundPage } from '@/pages';
import { routes } from './routes';

export const router = createBrowserRouter([
  {
    path: routes.root,
    element: <MainLayout />,
    errorElement: <MainErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: routes.notFound,
        element: <NotFoundPage />,
      },
    ],
  },
]);
