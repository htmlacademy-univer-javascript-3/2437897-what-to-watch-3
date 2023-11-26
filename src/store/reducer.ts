import {FilmInfoShort} from '../types/film';
import {createReducer} from '@reduxjs/toolkit';
import {setFilmsCount, selectGenre, updateFilmList, setFilmListLoadingStatus} from './action';

export const ALL_GENRES = 'All genres';
export const FILMS_BATCH_SIZE = 8;

export type State = {
  selectedGenre: string;
  genreFilms: FilmInfoShort[];
  allFilms: FilmInfoShort[];
  filmsCount: number;
  isFilmListLoading: boolean;
}

const initialState: State = {
  selectedGenre: ALL_GENRES,
  genreFilms: [],
  allFilms: [],
  filmsCount: FILMS_BATCH_SIZE,
  isFilmListLoading: true,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateFilmList, (state, action) => {
      state.allFilms = action.payload;
      state.genreFilms = action.payload;
    })
    .addCase(setFilmListLoadingStatus, (state, action) => {
      state.isFilmListLoading = action.payload;
    })
    .addCase(selectGenre, (state, action) => {
      const newGenre = action.payload.genre;
      state.selectedGenre = newGenre;

      if (newGenre === ALL_GENRES){
        state.genreFilms = state.allFilms;
        return;
      }
      state.genreFilms = state.allFilms.filter((film) => film.genre === newGenre);

    })
    .addCase(setFilmsCount, (state, action) => {
      state.filmsCount = action.payload;
    });
});

