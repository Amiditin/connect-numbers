import { Navigate } from 'react-router-dom';

import { routes } from '@/router';

export const HomePage: React.FC = () => {
  return <Navigate to={routes.profile.path} />;
};
