import {Link, useParams} from 'react-router-dom';
import {NotFoundPage} from '../not-found/not-found';
import {FilmInfoDetail, FilmInfoShort} from '../../types/film';
import {FilmList} from '../../components/film-list';
import {MovieTabs} from '../../components/movie-tabs.tsx';
import {Header} from '../../components/header.tsx';
import {useEffect, useState} from 'react';
import {APIRoute} from '../../store/api-action.ts';
import {api} from '../../store';
import {useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../types/auth.ts';
import {getAuthorizationState} from '../../store/user-process/selectors';


const fetchFilmDetails = async (filmId: string) => {
  const {data: filmDetail} = await api.get<FilmInfoDetail>(`${APIRoute.Films}/${filmId}`);
  return filmDetail;
};

const fetchSimilarMovies = async (filmId: string) => {
  const {data: similarFilms} = await api.get<FilmInfoShort[]>(`${APIRoute.Films}/${filmId}/similar`);
  return similarFilms;
};


export function MoviePage(){
  const {id} = useParams();
  const [film, setFilm] = useState<FilmInfoDetail>();
  const [sameFilms, setSameFilms] = useState<FilmInfoShort[]>([]);
  const authorizationStatus = useAppSelector(getAuthorizationState);

  useEffect(() => {
    if (!id){
      return;
    }
    fetchFilmDetails(id).then((filmDetail) => setFilm(filmDetail));
    fetchSimilarMovies(id).then((similarFilms) => setSameFilms(similarFilms));
  }, [id]);

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
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"/>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link
                  to={authorizationStatus === AuthorizationStatus.Authorized ? `/films/${film.id}/review` : '/login'}
                  className="btn film-card__button"
                >
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>
        <MovieTabs {...film} />
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={sameFilms}/>
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
