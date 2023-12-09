export type FilmInfoShort = {
  id: string;
  name: string;
  previewImage: string;
  genre: string;
  previewVideoLink: string;
}


export type FilmInfoDetail = {
  id: string;
  name: string;
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
  genre: string;
  released: number;
  isFavorite?: boolean;
}
