import {createAction} from '@reduxjs/toolkit';
import {FilmInfoShort} from '../types/film';

export const selectGenre = createAction<{genre: string}>('films/selectGenre');

export const setFilmListLoadingStatus = createAction<boolean>('data/setFilmListLoadingStatus');
export const updateFilmList = createAction<FilmInfoShort[]>('films/updateFilmList');
export const setFilmsCount = createAction<number>('films/filmsCount');
