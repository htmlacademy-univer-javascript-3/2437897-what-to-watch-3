import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';
import {FilmInfoDetail, FilmInfoShort} from '../../types/film';
import {fetchFavoriteFilms, fetchFilmDetail, setFavoriteFilm} from '../api-action.ts';


export const ALL_GENRES = 'All genres';

export type FilmProcess = {
  selectedGenre: string;
  selectedFilm: FilmInfoDetail | undefined;
  isFilmDetailLoading: boolean;
  genreFilms: FilmInfoShort[];
  allFilms: FilmInfoShort[];
  favoriteFilms: FilmInfoShort[];
  isFilmListLoading: boolean;
  isFavoriteFilmUpdating: boolean;
}

const initialState: FilmProcess = {
  selectedGenre: ALL_GENRES,
  selectedFilm: undefined,
  isFilmDetailLoading: false,
  genreFilms: [],
  allFilms: [],
  favoriteFilms: [],
  isFilmListLoading: true,
  isFavoriteFilmUpdating: false,
};

export const filmsProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    updateFilmList: (state, action: PayloadAction<FilmInfoShort[]>) => {
      state.allFilms = action.payload;
      state.genreFilms = action.payload;
    },
    setFilmListLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isFilmListLoading = action.payload;
    },
    selectGenre: (state, action: PayloadAction<string>) => {
      const newGenre = action.payload;
      state.selectedGenre = newGenre;

      if (newGenre === ALL_GENRES) {
        state.genreFilms = state.allFilms;
        return;
      }
      state.genreFilms = state.allFilms.filter((film) => film.genre === newGenre);
    }
  },
  extraReducers: function (builder){
    builder
      .addCase(fetchFilmDetail.pending, (state) => {
        state.isFilmDetailLoading = true;
      })
      .addCase(fetchFilmDetail.fulfilled, (state, action) => {
        state.selectedFilm = action.payload;
        state.isFilmDetailLoading = false;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(setFavoriteFilm.pending, (state) => {
        state.isFavoriteFilmUpdating = true;
      })
      .addCase(setFavoriteFilm.fulfilled, (state, action) => {
        state.isFavoriteFilmUpdating = false;
        const film = action.payload;
        if (film.isFavorite){
          state.favoriteFilms.push(film);
        } else {
          state.favoriteFilms = state.favoriteFilms.filter((f) => f.id !== film.id);
        }
        if (state.selectedFilm?.id === film.id) {
          state.selectedFilm.isFavorite = film.isFavorite;
        }
      });
  }
});

export const {updateFilmList, setFilmListLoadingStatus, selectGenre} = filmsProcess.actions;
