import {useAppDispatch, useAppSelector} from '../hooks/index';
import {ALL_GENRES, selectGenre} from '../store/film-process/film-process';
import {getAllFilms, getGenre} from '../store/film-process/selectors';


export function GenreList() {
  const dispatch = useAppDispatch();
  const selectedGenre = useAppSelector(getGenre);

  const allFilms = useAppSelector(getAllFilms);
  const uniqueGenres = [ALL_GENRES, ...new Set(allFilms.map((film) => film.genre))];

  return (
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
  );
}
