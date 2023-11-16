import {useAppDispatch, useAppSelector} from '../hooks/index';
import {selectGenre} from '../store/action';
import {ALL_GENRES} from '../store/reducer';


export function GenreList() {
  const dispatch = useAppDispatch();
  const selectedGenre = useAppSelector((state) => state.selectedGenre);

  const allFilms = useAppSelector((state) => state.allFilms);
  const uniqueGenres = [ALL_GENRES, ...new Set(allFilms.map((film) => film.genre))];

  return (
    <ul className="catalog__genres-list">
      {
        uniqueGenres.map((genre) => (
          <li
            key={genre}
            className={`catalog__genres-item ${genre === selectedGenre ? 'catalog__genres-item--active' : ''}`}
          >
            <a type={'button'} className="catalog__genres-link" onClick={() => dispatch(selectGenre({genre}))}>
              {genre}
            </a>
          </li>
        ))
      }
    </ul>
  );
}
