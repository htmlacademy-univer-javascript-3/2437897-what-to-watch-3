import {useState} from 'react';
import {FilmInfo} from '../types/film';


export function MovieTabs(props: FilmInfo) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = [
    {
      name: 'Overview',
      children: (
        <>
          <div className="film-rating">
            <div className="film-rating__score">8,9</div>
            <p className="film-rating__meta">
              <span className="film-rating__level">Very good</span>
              <span className="film-rating__count">240 ratings</span>
            </p>
          </div>
          <div className="film-card__text">
            <p>In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustaves friend and protege.</p>
            <p>Gustave prides himself on providing first-class service to the hotels guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustaves lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.</p>
            <p className="film-card__director"><strong>Director: Wes Anderson</strong></p>
            <p className="film-card__starring"><strong>Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other</strong></p>
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
              <span className="film-card__details-value">Wes Anderson</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Starring</strong>
              <span className="film-card__details-value">
                Bill Murray, <br/>
                Edward Norton, <br/>
                Jude Law, <br/>
                Willem Dafoe, <br/>
                Saoirse Ronan, <br/>
                Tony Revoloru, <br/>
                Tilda Swinton, <br/>
                Tom Wilkinson, <br/>
                Owen Wilkinson, <br/>
                Adrien Brody, <br/>
                Ralph Fiennes, <br/>
                Jeff Goldblum
              </span>
            </p>
          </div>


          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Run Time</strong>
              <span className="film-card__details-value">1h 39m</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Genre</strong>
              <span className="film-card__details-value">{props.genre}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Released</strong>
              <span className="film-card__details-value">{props.releaseAt.getFullYear()}</span>
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
              [
                {
                  id: '00162512-6dca-4ed3-ab1a-075cbd5c57f4',
                  text: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the directors funniest and most exquisitely designed films in years.',
                  author: 'Kate Muir',
                  reviewDate: new Date(),
                  rating: '8,9',
                },
              ].map((review) => (
                <div key={review.id} className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">{review.text}</p>

                    <footer className="review__details">
                      <cite className="review__author">{review.author}</cite>
                      <time className="review__date" dateTime={review.reviewDate.toISOString().substring(0, 10)}>
                        {review.reviewDate.toLocaleTimeString()}
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
          <img src={props.imagePath} alt={props.name} width="218" height="327" />
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
