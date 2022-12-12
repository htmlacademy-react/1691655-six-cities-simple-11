import { useAppSelector } from '../../hooks';
import { getReviews } from '../../store/app-data/selectors';
import { Review } from '../../types/review-type';
import { getRatingInProcent } from '../../utils';

type props = {
  reviews: Review[];
};

const getProperDate = (date: Date): string => {
  const properDateString = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return properDateString;
};

function ReviewsList ({reviews}: props):JSX.Element {
  const reviewsNumber = useAppSelector(getReviews).length;

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{ reviewsNumber }</span></h2>
      <ul className="reviews__list">
        {
          reviews &&
            reviews.slice(0, 10).map( (review) => (
              <li key={review.id} className="reviews__item">
                <div className="reviews__user user">
                  <div className="reviews__avatar-wrapper user__avatar-wrapper">
                    <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
                  </div>
                  <span className="reviews__user-name">
                    {review.user.name}
                  </span>
                  {review.user.isPro && <span className="reviews__user-name">Pro</span>}
                </div>
                <div className="reviews__info">
                  <div className="reviews__rating rating">
                    <div className="reviews__stars rating__stars">
                      <span style={{width: getRatingInProcent(review.rating || 100)}}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <p className="reviews__text">
                    {review.comment}
                  </p>
                  <time className="reviews__time" dateTime="2019-04-24">{ getProperDate(new Date(review.date)) }</time>
                </div>
              </li>)
            )
        }
      </ul>
    </>
  );
}

export default ReviewsList;
