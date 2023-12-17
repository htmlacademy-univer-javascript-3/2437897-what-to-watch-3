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

export interface FilmInfoDetail extends FilmBase {
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  released: number;
  isFavorite?: boolean;
}
