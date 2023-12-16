import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../hooks/index';
import {AxiosInstance} from 'axios';
import {authorizeUser, logOut} from './action';
import {FavoriteFilm, FilmInfoDetail, FilmInfoShort} from '../types/film';
import {AuthData, UserData} from '../types/auth.ts';
import {setFilmListLoadingStatus, updateFilmList} from './film-process/film-process';
import {State} from './index.ts';

export enum APIRoute {
  Films = '/films',
  Login = '/login'
}

export const fetchFilmList = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilmList',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmListLoadingStatus(true));
    const {data} = await api.get<FilmInfoShort[]>(APIRoute.Films);
    dispatch(updateFilmList(data));
    dispatch(setFilmListLoadingStatus(false));
  },
);


export const fetchFilmDetail = createAsyncThunk<FilmInfoDetail, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilmDetail',
  async (filmId, {extra: api}) => {
    const {data} = await api.get<FilmInfoDetail>(`${APIRoute.Films}/${filmId}`);
    return data;
  },
);

export const setFavoriteFilm = createAsyncThunk<FavoriteFilm, { filmId: string; status : boolean }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/setFavoriteFilm',
  async ({filmId, status}, {extra: api}) => {
    const {data} = await api.post<FavoriteFilm>(`favorite/${filmId}/${Number(status)}`);
    return data;
  },
);

export const fetchFavoriteFilms = createAsyncThunk<FilmInfoShort[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteFilms',
  async (_args, {extra: api}) => {
    const {data} = await api.get<FilmInfoShort[]>('favorite');

    return data;
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
