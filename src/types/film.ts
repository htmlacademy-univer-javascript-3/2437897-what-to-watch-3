export interface FilmBase {
  id: string;
  name: string;
  genre: string;
}

export interface FilmInfoShort extends FilmBase {
  previewImage: string;
  previewVideoLink: string;
}

export interface FavoriteFilm extends FilmInfoShort {
  isFavorite: boolean;
}

export interface PromoFilm extends FavoriteFilm {
  posterImage: string;
  backgroundImage: string;
  videoLink: string;
  released: number;
}

export interface FilmInfoDetail extends PromoFilm {
  backgroundColor: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
}
