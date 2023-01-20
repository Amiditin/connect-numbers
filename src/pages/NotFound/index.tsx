import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

import { routes } from '@/router/routes';

import styles from './NotFound.module.scss';

export const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <Result
        className={styles.box}
        status="404"
        title="404"
        subTitle="Страница не найдена. Попробуйте найти то, что вам нужно, с главной страницы."
        extra={
          <Link to={routes.home}>
            <Button type="primary">На главную</Button>
          </Link>
        }
      />
    </div>
  );
};
