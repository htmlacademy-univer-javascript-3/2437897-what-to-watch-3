interface FilmInfoBase {
  id: string;
  name: string;
  genre: string;
}

export interface FilmInfoShort extends FilmInfoBase {
  previewImage: string;
  previewVideoLink: string;
}

export interface PromoFilm extends FilmInfoBase {
  posterImage: string;
  backgroundImage: string;
  videoLink: string;
  released: number;
  isFavourite?: boolean;
}


export interface FilmInfoDetail extends PromoFilm {
  backgroundColor: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  isFavorite?: boolean;
}
