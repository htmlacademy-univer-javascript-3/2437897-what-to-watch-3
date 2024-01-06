import {Link, useParams} from 'react-router-dom';
import {NotFoundPage} from '../not-found/not-found';
import {FilmInfoShort} from '../../types/film';
import {FilmList} from '../../components/film-list';
import {MovieTabs} from '../../components/movie-tabs.tsx';
import {Header} from '../../components/header.tsx';
import {useEffect, useState} from 'react';
import {APIRoute, fetchFilmDetail} from '../../store/api-action.ts';
import {api} from '../../store';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../types/auth.ts';
import {getAuthorizationState} from '../../store/user-process/selectors';
import {getSelectedFilm, isFilmDetailLoading} from '../../store/film-process/selectors.ts';
import {LoadingScreen} from '../loading-screen/loading-screen.tsx';
import {PlayFilmButton} from '../../components/play-film-button.tsx';
import {FavoriteButton} from '../../components/favorite-button.tsx';

const fetchSimilarMovies = async (filmId: string) => {
  const {data: similarFilms} = await api.get<FilmInfoShort[]>(`${APIRoute.Films}/${filmId}/similar`);
  return similarFilms;
};
const SIMILAR_FILMS_MAX_COUNT = 4;

export function MoviePage(){
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getSelectedFilm);
  const isFilmLoading = useAppSelector(isFilmDetailLoading);
  const [sameFilms, setSameFilms] = useState<FilmInfoShort[]>([]);
  const authorizationStatus = useAppSelector(getAuthorizationState);

  useEffect(() => {
    if (!id){
      return;
    }
    dispatch(fetchFilmDetail(id));
    fetchSimilarMovies(id).then((similarFilms) => setSameFilms(similarFilms));
  }, [id, dispatch]);

  if (isFilmLoading){
    return <LoadingScreen/>;
  }

  if (!film){
    return <NotFoundPage/>;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header extraStyle={'film-card__head'} />
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>
              <div className="film-card__buttons">
                <PlayFilmButton filmId={film.id}/>
                <FavoriteButton filmId={film.id}/>
                {authorizationStatus === AuthorizationStatus.Authorized &&
                  <Link to={`/films/${film.id}/review`} className="btn film-card__button">
                    Add review
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>
        <MovieTabs {...film} />
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={sameFilms} maxCount={SIMILAR_FILMS_MAX_COUNT}/>
        </section>
        <footer className="page-footer">
          <div className="logo">
            <Link to={'/'} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
