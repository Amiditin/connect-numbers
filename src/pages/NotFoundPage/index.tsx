import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

import { routes } from '@/router/routes';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <Result
      className={styles.box}
      status="404"
      title="404"
      subTitle="Страница не найдена. Попробуйте найти то, что вам нужно, с главной страницы."
      extra={
        <Link to={routes.home.path}>
          <Button type="primary">На главную</Button>
        </Link>
      }
    />
  );
};
