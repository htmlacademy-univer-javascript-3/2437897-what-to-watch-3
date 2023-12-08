import {FilmList} from '../../components/film-list';
import {FilmInfoShort} from '../../types/film';
import {Link} from 'react-router-dom';
import {Header} from '../../components/header.tsx';

export function MyListPage({films}: {films: FilmInfoShort[]}){
  return (
    <div className="user-page">
      <Header extraStyle={'user-page__head'} />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmList films={films}/>
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
