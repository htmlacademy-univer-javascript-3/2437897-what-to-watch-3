import {PromoFilm} from '../types/film.ts';
import {useAppDispatch, useAppSelector} from '../hooks';
import {useNavigate} from 'react-router-dom';
import {getAuthorizationState} from '../store/user-process/selectors.ts';
import {AuthorizationStatus} from '../types/auth.ts';
import {setFavoriteFilm} from '../store/api-action.ts';
import {
  getFavoriteFilms,
  getIsFavoriteFilmUpdating,
} from '../store/film-process/selectors.ts';

export function FavoriteButton({film} : {film: PromoFilm}){
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationState = useAppSelector(getAuthorizationState);
  const isFavoriteFilmUpdating = useAppSelector(getIsFavoriteFilmUpdating);
  const favoriteFilms = useAppSelector(getFavoriteFilms);

  const onClick = () => {
    if (authorizationState !== AuthorizationStatus.Authorized) {
      navigate('/login');
    }
    dispatch(setFavoriteFilm({filmId: film.id, status: !film.isFavorite}));
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={onClick} disabled={isFavoriteFilmUpdating}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={film.isFavorite ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );
}
