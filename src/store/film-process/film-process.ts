import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';
import {FilmInfoDetail, FilmInfoShort} from '../../types/film';
import {fetchFilmDetail} from '../api-action.ts';


export const ALL_GENRES = 'All genres';

export type FilmProcess = {
  selectedGenre: string;
  selectedFilm: FilmInfoDetail | undefined;
  isFilmDetailLoading: boolean;
  genreFilms: FilmInfoShort[];
  allFilms: FilmInfoShort[];
  isFilmListLoading: boolean;
}

const initialState: FilmProcess = {
  selectedGenre: ALL_GENRES,
  selectedFilm: undefined,
  isFilmDetailLoading: false,
  genreFilms: [],
  allFilms: [],
  isFilmListLoading: true,
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
      });
  }
});

export const {updateFilmList, setFilmListLoadingStatus, selectGenre} = filmsProcess.actions;
