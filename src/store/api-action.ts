import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../hooks/index';
import {State} from './reducer';
import {AxiosInstance} from 'axios';
import {authorizeUser, logOut, setFilmListLoadingStatus, updateFilmList} from './action';
import {FilmInfoShort} from '../types/film';
import {AuthData, UserData} from '../types/auth.ts';

export enum APIRoute {
  Films = '/films',
  Login = '/login'
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

export const verifyAuthorized = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: user} = await api.get<UserData>(APIRoute.Login);
      dispatch(authorizeUser(user));
    } catch {
      dispatch(logOut());
    }
  },
);
export const login = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: user} = await api.post<UserData>(APIRoute.Login, {email, password});
    dispatch(authorizeUser(user));
  },
);
