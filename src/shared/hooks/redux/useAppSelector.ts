import { useSelector, TypedUseSelectorHook } from 'react-redux';

import type { TRootState } from '@/redux/types';

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
