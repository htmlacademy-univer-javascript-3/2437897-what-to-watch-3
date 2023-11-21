import {FilmInfo} from '../types/film';
import {films} from '../mocks/film';
import {createReducer} from '@reduxjs/toolkit';
import {setFilmsCount, selectGenre} from './action';

export const ALL_GENRES = 'All genres';
export const FILMS_BATCH_SIZE = 8;

export type State = {
  selectedGenre: string;
  genreFilms: FilmInfo[];
  allFilms: FilmInfo[];
  filmsCount: number;
}

const initialState: State = {
  selectedGenre: ALL_GENRES,
  genreFilms: films,
  allFilms: films,
  filmsCount: FILMS_BATCH_SIZE,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
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

