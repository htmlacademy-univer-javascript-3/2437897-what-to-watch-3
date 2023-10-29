import {FilmCard} from './film-card';
import {useState} from 'react';
import {FilmInfo} from '../types/film';

export function FilmList({films}: { films: FilmInfo[] }) {
  const [hoveredFilm, setHoveredFilm] = useState<FilmInfo | undefined>();

  return (
    <div className="catalog__films-list">
      {
        films.map((film) =>
          (
            <FilmCard
              key={film.id}
              {...film}
              onMouseOver={() => setHoveredFilm(film)}
              onMouseLeave={() => setHoveredFilm(undefined)}
            />
          )
        )
      }
      <p>{hoveredFilm?.name}</p>
    </div>
  );
}
