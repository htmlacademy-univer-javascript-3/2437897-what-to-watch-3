import { useState, SyntheticEvent, Fragment } from 'react';
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
  const [isFormValid, setIsFormValid] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const setReview = (newReview: NewReview) => {
    const isReviewValid = validateReview(newReview);
    _setReview(newReview);
    setIsFormValid(isReviewValid);
    if (!isReviewValid){
      setErrorText('Заполните все поля формы правильно');
      return;
    }
    setErrorText(undefined);
  };

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsUploading(true);
    postComment(filmId, review.comment, review.rating)
      .then(() => navigate(`/films/${filmId}`))
      .catch((e) => {
        // eslint-disable-next-line
        setErrorText(e.response?.data?.details[0]?.messages[0] || 'Server error');
      })
      .finally(() => setIsUploading(false));
  };
  return (
    <div className='add-review'>
      <form action="#" className="add-review__form" onSubmit={onSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {
              Array.from({length: maxRating}, () => false).map((_, idx: number) => {
                const formRatingValue = maxRating - idx;
                return (
                  <Fragment key={formRatingValue}>
                    <input
                      disabled={isUploading}
                      className="rating__input"
                      id={`star-${formRatingValue}`}
                      type="radio"
                      name="rating"
                      value={formRatingValue}
                      onChange={() => setReview({...review, rating: formRatingValue})}
                    />
                    <label className="rating__label" htmlFor={`star-${formRatingValue}`}>Rating {formRatingValue}</label>
                  </Fragment>
                );
              }
              )
            }
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            disabled={isUploading}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={review.comment}
            onChange={(e) => setReview({...review, comment: e.target.value})}
          />
          <p style={{color: 'red', marginLeft: '20px'}}>{errorText}</p>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={isUploading || !isFormValid}>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}
