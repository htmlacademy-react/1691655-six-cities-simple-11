import { memo } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import { fetchNearOffersAction } from '../../store/api-actions';
import { Offer } from '../../types/offer-type';
import { getRatingInProcent } from '../../utils';

type CardScreenProps = {
  className: string;
  offer: Offer;
  setActiveOffer: (offer: Offer | undefined) => void;
 }

function CardScreen(props: CardScreenProps): JSX.Element {
  const {className, offer, setActiveOffer} = props;

  const handleClick = () => {
    store.dispatch(fetchNearOffersAction(offer.id));
  };

  return (
    <Link
      to={`/offer/${offer.id}`}
      onClick={ handleClick }
    >
      <article
        onMouseOver={ () => setActiveOffer(offer) }
        onMouseLeave={ () => setActiveOffer(undefined) }
        className={`${className} place-card`}
      >
        {
          offer.isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        }
        <div className="cities__image-wrapper place-card__image-wrapper">
          <img className="place-card__image" src={offer.images[0]} width="260" height="200" alt="Place" />
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{offer.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>

          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: getRatingInProcent(offer.rating || 100)}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            {offer.title}
          </h2>
          <p className="place-card__type">{offer.type}</p>
        </div>
      </article>
    </Link>
  );
}

export default memo(CardScreen);
