import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../hooks/index';
import {State} from './reducer';
import {AxiosInstance} from 'axios';
import {setFilmListLoadingStatus, updateFilmList} from './action';
import {FilmInfoShort} from '../types/film';

export enum APIRoute {
  Films = '/films',
}

export const fetchFilmList = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchQuestions',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmListLoadingStatus(true));
    const {data} = await api.get<FilmInfoShort[]>(APIRoute.Films);
    dispatch(updateFilmList(data));
    dispatch(setFilmListLoadingStatus(false));
  },
);
