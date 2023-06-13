import { useRouteError } from 'react-router-dom';
import { Button, Result } from 'antd';

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Result
      status="error"
      title="Возникла непредвиденная ошибка"
      subTitle="Если она повторяется после перезагрузки окна браузера, пожалуйста, свяжитесь со службой технической поддержки"
      extra={
        <Button type="primary" onClick={() => window.location.reload()}>
          Обновить
        </Button>
      }
    />
  );
};
