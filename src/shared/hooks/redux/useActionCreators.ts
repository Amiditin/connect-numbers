import { useMemo } from 'react';
import { type ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';

import { useAppDispatch } from './useAppDispatch';

export const useActionCreators = (actions: ActionCreatorsMapObject) => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
};

// * Хук предпочтительно использовать когда импортируется один экшен,
// * который внутри компонента много где используется
// * Пример использования:
/*
? import { sliceActions } from '@/redux/slice';
? import { useActionCreators } from '@/shared/hooks'

? const Component: React.FC = () => {
* отпадает надобность в импортирование useAppDispatch
? const actions = useActionCreators(sliceActions);

? const handleChange = () => {
    * вместо:
    * dispatch(sliceActions.getData())
    * dispatch(sliceActions.deleteData())
    * более читаемый синтаксис
?   actions.getData();
?   actions.updateData();
? };

? return null;
?};
*/
