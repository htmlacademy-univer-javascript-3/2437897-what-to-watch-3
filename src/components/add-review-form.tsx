import { useState, SyntheticEvent } from 'react';
import {api} from '../store';
import {NewReview, Review} from '../types/review.ts';
import {useNavigate} from 'react-router-dom';

const postComment = async (filmId: string, comment: string, rating: number) => {
  const response = await api.post<Review>(`/comments/${filmId}`, { comment, rating });
  return response.data;
};

const validateReview = (review: NewReview) => {
  if (!review){
    return false;
  }
  if (review.comment.length < 50 || review.comment.length > 400){
    return false;
  }
  return review.rating > 0 && review.rating <= 10;
};

export function AddReviewForm({filmId}: {filmId: string}) {
  const maxRating = 10;
  const navigate = useNavigate();
  const [review, _setReview] = useState<NewReview>({comment: '', rating: 0});
  const [errorText, setErrorText] = useState<string>();
  const [isPostButtonActive, setIsPostButtonActive] = useState(false);

  const setReview = (newReview: NewReview) => {
    _setReview(newReview);
    if (!validateReview(review)){
      setErrorText('Заполните все поля формы правильно');
      return;
    }
    setIsPostButtonActive(true);
    setErrorText(undefined);
  };

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsPostButtonActive(false);
    postComment(filmId, review.comment, review.rating)
      .then(() => navigate(`/films/${filmId}`))
      .catch((e) => {
        // eslint-disable-next-line
        setErrorText(e.response?.data?.details[0]?.messages[0] || 'Server error');
      })
      .finally(() => setIsPostButtonActive(true));
  };
  return (
    <form action="#" className="add-review__form" onSubmit={onSubmit}>
      <div className="rating">
        <p>{review.rating}</p>
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
                    onChange={() => setReview({...review, rating: formRatingValue})}
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
          value={review.comment}
          onChange={(e) => setReview({...review, comment: e.target.value})}
        />
        <p style={{color: 'red', marginLeft: '20px'}}>{errorText}</p>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!isPostButtonActive}>Post</button>
        </div>
      </div>
    </form>
  );
}
