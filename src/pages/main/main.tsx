import {GenreList} from '../../components/genre-list';
import {Header} from '../../components/header.tsx';
import {api} from "../../store";
import {PromoFilm} from "../../types/film.ts";
import {useEffect, useState} from "react";
import {LoadingScreen} from "../loading-screen/loading-screen.tsx";
import {PlayFilmButton} from '../../components/play-film-button.tsx';
import {FavoriteButton} from '../../components/favorite-button.tsx';

const fetchPromoFilm = async () => {
  const {data: promoFilm} = await api.get<PromoFilm>(`/promo`);
  return promoFilm;
};

function MainPage(){
  const [selectedFilm, setSelectedFilm]= useState<PromoFilm>();

  useEffect(() => {
    fetchPromoFilm().then(promoFilm => setSelectedFilm(promoFilm));
  }, []);

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
                <span className="film-card__year">{selectedFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayFilmButton filmId={selectedFilm.id}/>
                <FavoriteButton filmId={selectedFilm.id}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList/>
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


