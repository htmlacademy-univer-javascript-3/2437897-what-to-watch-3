import {createAction} from '@reduxjs/toolkit';
import {FilmInfoShort} from '../types/film';
import {UserData} from '../types/auth.ts';

export const selectGenre = createAction<{genre: string}>('films/selectGenre');

export const setFilmListLoadingStatus = createAction<boolean>('data/setFilmListLoadingStatus');
export const updateFilmList = createAction<FilmInfoShort[]>('films/updateFilmList');
export const setFilmsCount = createAction<number>('films/filmsCount');

export const authorizeUser = createAction<UserData>('user/authorize');

export const logOut = createAction('user/logOut');
