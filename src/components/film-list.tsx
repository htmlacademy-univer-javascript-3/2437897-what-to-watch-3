import {FilmCard} from './film-card';
import {useState} from 'react';
import {FilmInfoShort} from '../types/film';
import {useAppSelector} from '../hooks/index';
import {useDispatch} from 'react-redux';
import {setFilmsCount} from '../store/action';
import {FILMS_BATCH_SIZE} from '../store/reducer';

export function FilmList({films}: { films: FilmInfoShort[] }) {
  const [, setHoveredFilm] = useState<FilmInfoShort | undefined>();
  const filmsCount = useAppSelector((state) => state.filmsCount);
  const dispatch = useDispatch();

  return (
    <>
      <div className="catalog__films-list">
        {
          films.slice(0, filmsCount).map((film) =>
            (
              <FilmCard
                key={film.id}
                {...film}
                onMouseEnter={() => setHoveredFilm(film)}
                onMouseLeave={() => setHoveredFilm(undefined)}
              />
            )
          )
        }
      </div>
      {
        filmsCount < films.length && (
          <div className="catalog__more">
            <button
              className="catalog__button"
              type="button"
              onClick={() => dispatch(setFilmsCount(filmsCount + FILMS_BATCH_SIZE))}
            >
              Show more
            </button>
          </div>
        )
      }
    </>
  );
}
