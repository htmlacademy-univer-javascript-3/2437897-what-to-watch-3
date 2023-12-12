import {FilmCard} from './film-card';
import {FilmInfoShort} from '../types/film';
import {useState} from 'react';

const FILMS_BATCH_SIZE = 8;

export function FilmList({films}: { films: FilmInfoShort[] }) {
  const [filmsCount, setFilmsCount] = useState(FILMS_BATCH_SIZE);
  return (
    <>
      <div className="catalog__films-list">
        {
          films.slice(0, filmsCount).map((film) => <FilmCard key={film.id} {...film} />)
        }
      </div>
      {
        filmsCount < films.length && (
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
