import {createAction} from '@reduxjs/toolkit';
import {FilmInfo} from '../types/film';

export const selectGenre = createAction<{genre: string}>('films/selectGenre');
export const updateFilmList = createAction<FilmInfo[]>('films/updateFilmList');
