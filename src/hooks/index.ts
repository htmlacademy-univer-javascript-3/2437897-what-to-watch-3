import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {store, State} from '../store/index';

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
