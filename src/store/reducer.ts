import {FilmInfo} from '../types/film';
import {films} from '../mocks/film';
import {createReducer} from '@reduxjs/toolkit';
import {selectGenre} from './action';

export const ALL_GENRES = 'All genres';

export type State = {
  selectedGenre: string;
  genreFilms: FilmInfo[];
  allFilms: FilmInfo[];
}

const initialState: State = {
  selectedGenre: ALL_GENRES,
  genreFilms: films,
  allFilms: films,
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

    });
});

