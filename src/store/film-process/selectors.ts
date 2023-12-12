import {NameSpace} from '../namespace';
import {State} from '../index.ts';

export const getGenre = (state: State) => state[NameSpace.Film].selectedGenre;
export const getAllFilms = (state: State) => state[NameSpace.Film].allFilms;
export const getIsFilmsLoading = (state: State) => state[NameSpace.Film].isFilmListLoading;
export const getGenreFilms = (state: State) => state[NameSpace.Film].genreFilms;
