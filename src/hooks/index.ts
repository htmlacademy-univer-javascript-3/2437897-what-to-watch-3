import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {State} from '../store/reducer';
import {AppDispatch} from '../store/index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
