import {useAppSelector} from '../hooks';
import {useNavigate} from 'react-router-dom';
import {getAuthorizationState} from '../store/user-process/selectors.ts';
import {AuthorizationStatus} from '../types/auth.ts';
import {useEffect, useState} from "react";
import {api} from "../store";
import {FavoriteFilm} from "../types/film.ts";
import {fetchFavouriteFilms} from "../services/api.ts";

const changeFavoriteFilmStatus = async (filmId: string, status: boolean) => {
  const {data} = await api.post<FavoriteFilm>(`favorite/${filmId}/${Number(status)}`);
  return data;
};

export function FavoriteButton({filmId} : {filmId: string}){
  const DEFAULT_FILMS_COUNT = 0;
  const navigate = useNavigate();
  const authorizationState = useAppSelector(getAuthorizationState);
  const [isFavoriteFilmUpdating, setIsFavouriteFilmUpdating] = useState(false);
  const [favoriteFilmsCount, setFavouriteFilmsCount] = useState<number>(DEFAULT_FILMS_COUNT);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (authorizationState !== AuthorizationStatus.Authorized){
      setFavouriteFilmsCount(DEFAULT_FILMS_COUNT);
      setIsFavourite(false);
      return;
    }

    fetchFavouriteFilms().then(films => {
      setFavouriteFilmsCount(films.length);
      setIsFavourite(films.find(f => f.id === filmId) !== undefined)
    });
  }, [authorizationState]);

  const onClick = () => {
    if (authorizationState !== AuthorizationStatus.Authorized) {
      navigate('/login');
    }
    setIsFavouriteFilmUpdating(true);
    const newStatus = !isFavourite;
    changeFavoriteFilmStatus(filmId, newStatus).then(() => setIsFavouriteFilmUpdating(false));
    setIsFavourite(newStatus);
    const delta = newStatus ? 1 : -1;
    setFavouriteFilmsCount(favoriteFilmsCount + delta);
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={onClick} disabled={isFavoriteFilmUpdating}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={isFavourite ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoriteFilmsCount}</span>
    </button>
  );
}
