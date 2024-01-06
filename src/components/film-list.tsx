import {FilmCard} from './film-card';
import {FilmInfoShort} from '../types/film';
import {useState} from 'react';

const FILMS_BATCH_SIZE = 8;

export function FilmList({films, maxCount = undefined}: { films: FilmInfoShort[]; maxCount?: number }) {
  const [filmsCount, setFilmsCount] = useState(FILMS_BATCH_SIZE);
  maxCount = Math.min(maxCount || films.length, films.length);
  return (
    <>
      <div className="catalog__films-list">
        {
          films.slice(0, Math.min(filmsCount, maxCount)).map((film) => <FilmCard key={film.id} {...film} />)
        }
      </div>
      {
        filmsCount < maxCount && (
          <div className="catalog__more">
            <button
              className="catalog__button"
              type="button"
              onClick={() => setFilmsCount(filmsCount + FILMS_BATCH_SIZE)}
            >
              Show more
            </button>
          </div>
        )
      }
    </>
  );
}
