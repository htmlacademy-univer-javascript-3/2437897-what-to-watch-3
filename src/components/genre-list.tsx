import {useAppDispatch, useAppSelector} from '../hooks/index';
import {ALL_GENRES, selectGenre} from '../store/film-process/film-process';
import {getAllFilms, getGenre, getGenreFilms} from '../store/film-process/selectors';
import {FilmList} from './film-list.tsx';


export function GenreList() {
  const GENRE_COUNT_LIMIT = 10;
  const dispatch = useAppDispatch();
  const selectedGenre = useAppSelector(getGenre);
  const films = useAppSelector(getGenreFilms);

  const allFilms = useAppSelector(getAllFilms);
  const uniqueGenres = [ALL_GENRES, ...new Set(allFilms.map((film) => film.genre))].slice(0, GENRE_COUNT_LIMIT);

  return (
    <>
      <ul className="catalog__genres-list">
        {
          uniqueGenres.map((genre) => (
            <li
              key={genre}
              className={`catalog__genres-item ${genre === selectedGenre ? 'catalog__genres-item--active' : ''}`}
            >
              <a type={'button'} className="catalog__genres-link" onClick={() => dispatch(selectGenre(genre))}>
                {genre}
              </a>
            </li>
          ))
        }
      </ul>
      <FilmList key={selectedGenre} films={films}/>
    </>
  );
}
