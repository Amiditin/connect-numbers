import { message, Popconfirm } from 'antd';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { resultsService } from '@/shared/api/services/results';

interface IDeleteResultProps {
  resultId: string;
  onSuccessRemove?: () => void;
}

export const DeleteResult: React.FC<IDeleteResultProps> = ({
  resultId,
  onSuccessRemove = () => undefined,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleDeleteResult = async () => {
    try {
      messageApi.open({ type: 'loading', content: 'Удаляем запись...', duration: 0 });

      await resultsService.remove({ id: resultId });

      message.success('Запись удалена!', 2);
      onSuccessRemove();
      messageApi.destroy();
    } catch (error) {
      messageApi.destroy();

      message.error('Запись не была удалена!', 2);
    }
  };

  return (
    <Popconfirm
      title="Удалить запись"
      description="Вы уверены, что хотите удалить эту запись?"
      okText="Удалить"
      okType="danger"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={handleDeleteResult}>
      {contextHolder}
      <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
    </Popconfirm>
  );
};
