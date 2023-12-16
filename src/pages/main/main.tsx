import {FilmList} from '../../components/film-list';
import {GenreList} from '../../components/genre-list';
import {useAppSelector} from '../../hooks/index';
import {Header} from '../../components/header.tsx';
import {getGenreFilms, getSelectedFilm} from '../../store/film-process/selectors';
import {PlayFilmButton} from '../../components/play-film-button.tsx';
import {LoadingScreen} from '../loading-screen/loading-screen.tsx';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchFilmDetail} from '../../store/api-action.ts';
import {FavoriteButton} from '../../components/favorite-button.tsx';

function MainPage(){
  const dispatch = useDispatch();
  const films = useAppSelector(getGenreFilms);
  const selectedFilm = useAppSelector(getSelectedFilm);

  useEffect(() => {
    if (!selectedFilm && films.length > 0){
      dispatch(fetchFilmDetail(films[0].id));
    }
  }, [dispatch, selectedFilm, films]);

  if (!selectedFilm){
    return <LoadingScreen/>;
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={selectedFilm.backgroundImage} alt={selectedFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <Header extraStyle={'film-card__head'}/>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={selectedFilm.posterImage} alt={selectedFilm.name} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{selectedFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{selectedFilm.genre}</span>
                <span className="film-card__year">{new Date().getFullYear()}</span>
              </p>

              <div className="film-card__buttons">
                <PlayFilmButton filmId={selectedFilm.id}/>
                <FavoriteButton film={selectedFilm}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList/>
          <FilmList films={films}/>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainPage;


