import {Link, useParams} from 'react-router-dom';
import {NotFoundPage} from '../not-found/not-found';
import {AddReviewForm} from '../../components/add-review-form';
import {Header} from '../../components/header.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getSelectedFilm} from '../../store/film-process/selectors.ts';
import {useEffect} from 'react';
import {fetchFilmDetail} from '../../store/api-action.ts';

export function ReviewPage(){
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getSelectedFilm);

  useEffect(() => {
    if (!id){
      return;
    }
    dispatch(fetchFilmDetail(id));
  }, [id, dispatch]);

  if (!film){
    return <NotFoundPage/>;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={'/review'} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>
        </Header>
        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>
      <AddReviewForm filmId={film.id}/>
    </section>
  );
}
