import {FilmList} from '../../components/film-list';
import {Link} from 'react-router-dom';
import {Header} from '../../components/header.tsx';
import {useEffect, useState} from 'react';
import {FilmInfoShort} from '../../types/film.ts';
import {LoadingScreen} from '../loading-screen/loading-screen.tsx';
import {fetchFavouriteFilms} from '../../services/api.ts';

export function MyListPage(){
  const [favoriteFilms, setFavoriteFilms] = useState<FilmInfoShort[] | undefined>(undefined);

  useEffect(() => {
    fetchFavouriteFilms().then((films) => setFavoriteFilms(films));
  }, []);

  if (favoriteFilms === undefined){
    return <LoadingScreen/>;
  }

  return (
    <div className="user-page">
      <Header extraStyle={'user-page__head'} />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmList films={favoriteFilms}/>
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
  );

}
