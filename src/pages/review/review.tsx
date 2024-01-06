import {Link, useParams} from 'react-router-dom';
import {NotFoundPage} from '../not-found/not-found';
import {FilmInfoShort} from '../../types/film';
import {AddReviewForm} from '../../components/add-review-form';
import {Header} from '../../components/header.tsx';

export function ReviewPage({films}: {films: FilmInfoShort[]}){
  const {id} = useParams();
  const film = films.find((f) => f.id === id);

  if (!film){
    return <NotFoundPage/>;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.previewImage} alt={film.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={'#'} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>
        </Header>
        <div className="film-card__poster film-card__poster--small">
          <img src={film.previewImage} alt={film.name} width="218" height="327" />
        </div>
      </div>
      <AddReviewForm filmId={film.id}/>
    </section>
  );
}
