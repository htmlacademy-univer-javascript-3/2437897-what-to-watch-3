import { useState, SyntheticEvent } from 'react';


export function AddReviewForm() {
  const maxRating = 10;
  const [rating, setRating] = useState(-1);
  const [reviewText, setReviewText] = useState('');

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <form action="#" className="add-review__form" onSubmit={onSubmit}>
      <div className="rating">
        <p>{rating}</p>
        <div className="rating__stars">
          {
            Array.from({length: maxRating}, () => false).map((_, idx: number) => {
              const formRatingValue = maxRating - idx;
              return (
                <div key={formRatingValue}>
                  <input
                    className="rating__input"
                    id={`star-${formRatingValue}`}
                    type="radio"
                    name="rating"
                    value={formRatingValue}
                    onChange={() => setRating(formRatingValue)}
                  />
                  <label className="rating__label" htmlFor={`star-${formRatingValue}`}>Rating {formRatingValue}</label>
                </div>
              );
            }
            )
          }
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
}
