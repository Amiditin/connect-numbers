import { useDispatch } from 'react-redux';

import type { TAppDispatch } from '@/redux/types';

export const useAppDispatch = useDispatch<TAppDispatch>;
