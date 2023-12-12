import {useEffect, useState, Fragment} from 'react';
import {FilmInfoDetail} from '../types/film';
import {Review} from '../types/review.ts';
import {api} from '../store';


const fetchReviews = async (filmId: string) => {
  const {data: reviews} = await api.get<Review[]>(`/comments/${filmId}`);
  return reviews;
};


const getTextRating = (rating: number) => {
  if (rating < 3){
    return 'Bad';
  }
  if (rating < 5){
    return 'Normal';
  }
  if (rating < 8){
    return 'Good';
  }
  if (rating < 9){
    return 'Very good';
  }
  return 'Awesome';
};


export function MovieTabs(film: FilmInfoDetail) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    fetchReviews(film.id).then((reviewList) => setReviews(reviewList));
  }, [film]);

  const tabs = [
    {
      name: 'Overview',
      children: (
        <>
          <div className="film-rating">
            <div className="film-rating__score">{film.rating}</div>
            <p className="film-rating__meta">
              <span className="film-rating__level">{getTextRating(film.rating)}</span>
              <span className="film-rating__count">{film.scoresCount} ratings</span>
            </p>
          </div>
          <div className="film-card__text">
            <p>{film.description}</p>
            <p className="film-card__director"><strong>Director: {film.director}</strong></p>
            <p className="film-card__starring"><strong>Starring: {film.starring.join(', ')}</strong></p>
          </div>
        </>
      ),
    },
    {
      name: 'Details',
      children: (
        <div className="film-card__text film-card__row">
          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Director</strong>
              <span className="film-card__details-value">{film.director}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Starring</strong>
              <span className="film-card__details-value">
                {film.starring.map((star) => <Fragment key={star}>{star}<br/></Fragment>)}
              </span>
            </p>
          </div>


          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Run Time</strong>
              <span className="film-card__details-value">{Math.trunc(film.runTime / 60)}h {film.runTime % 60}m</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Genre</strong>
              <span className="film-card__details-value">{film.genre}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Released</strong>
              <span className="film-card__details-value">{film.released}</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      name: 'Reviews',
      children: (
        <div className="film-card__reviews film-card__row">
          <div className="film-card__reviews-col">
            {
              reviews.map((review) => (
                <div key={review.id} className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">{review.comment}</p>

                    <footer className="review__details">
                      <cite className="review__author">{review.user}</cite>
                      <time className="review__date" dateTime={review.date}>
                        {review.date.substring(0, 10)}
                      </time>
                    </footer>
                  </blockquote>

                  <div className="review__rating">{review.rating}</div>
                </div>
              ))
            }
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="film-card__wrap film-card__translate-top">
      <div className="film-card__info">
        <div className="film-card__poster film-card__poster--big">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
        <div className="film-card__desc">
          <nav className="film-nav film-card__nav">
            <ul className="film-nav__list">
              {tabs.map((navItem, index) =>
                (
                  <li
                    onClick={() => setActiveTabIndex(index)}
                    key={navItem.name}
                    className={`film-nav__item ${index === activeTabIndex ? 'film-nav__item--active' : ''}`}
                  >
                    <span style={{cursor: 'pointer'}} role='button' className="film-nav__link">{navItem.name}</span>
                  </li>
                )
              )}
            </ul>
          </nav>
          {tabs[activeTabIndex].children}
        </div>
      </div>
    </div>
  );
}
