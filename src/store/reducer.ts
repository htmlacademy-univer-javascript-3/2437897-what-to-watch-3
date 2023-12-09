import {FilmInfoShort} from '../types/film';
import {createReducer} from '@reduxjs/toolkit';
import {
  authorizeUser,
  logOut,
  selectGenre,
  setFilmListLoadingStatus,
  setFilmsCount,
  updateFilmList
} from './action';
import {AuthorizationStatus, UserData} from '../types/auth.ts';
import {dropToken, saveToken} from '../services/token.ts';

export const ALL_GENRES = 'All genres';
export const FILMS_BATCH_SIZE = 8;

export type State = {
  selectedGenre: string;
  genreFilms: FilmInfoShort[];
  allFilms: FilmInfoShort[];
  filmsCount: number;
  isFilmListLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | undefined;
}

const initialState: State = {
  selectedGenre: ALL_GENRES,
  genreFilms: [],
  allFilms: [],
  filmsCount: FILMS_BATCH_SIZE,
  isFilmListLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
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
    })
    .addCase(authorizeUser, (state, action) => {
      const user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Authorized;
      saveToken(user.token);
      state.user = user;
    })
    .addCase(logOut, (state) => {
      state.authorizationStatus = AuthorizationStatus.AuthRequired;
      dropToken();
    });
});

