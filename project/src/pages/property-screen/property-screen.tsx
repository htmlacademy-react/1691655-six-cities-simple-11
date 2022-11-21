import { useParams } from 'react-router';
import Map from '../../components/map/map';
import ReviewFormScreen from '../../components/review-form/review-form-screen';
import ReviewsListScreen from '../../components/reviews-list/reviews-list-screen';
import { reviews } from '../../mocks/reviews';
import { Offer } from '../../types/offer-type';
import { getRatingInProcent } from '../../utils';
import OffersListScreen from '../../components/offers-list/offers-list-screen';
import { store } from '../../store';
import { useAppSelector } from '../../hooks';
import { useEffect } from 'react';


function PropertyScreen (): JSX.Element {
  const {id} = useParams();

  const currentOffer: Offer | undefined = Object.values(store.getState().offers).find((offer) => offer.id === Number(id));
  const nearOffers: Offer[] = useAppSelector((state) =>
    Object.values(state.offers)
      .filter((offer) => offer.city.name === state.city && offer.id !== currentOffer?.id))
    .slice(0, 3);

  const root = document.getElementById('root') as HTMLElement;
  root.style.cssText = '';

  //При изменении текущего объекта страница скролится наверх
  useEffect(() => {
    window.scroll(0, 0);
  }, [currentOffer]);

  if (currentOffer) {
    return (
      <div className="page">
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {
                  currentOffer?.images.slice(0, 6).map((image) => (
                    <div
                      key={`image-${image}`}
                      className="property__image-wrapper"
                    >
                      <img className="property__image" src={image} alt="Studio" />
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {
                  currentOffer?.isPremium &&
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                }
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {
                      currentOffer?.title
                    }
                  </h1>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: getRatingInProcent(currentOffer?.rating || 100)}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">
                    {
                      currentOffer?.rating
                    }
                  </span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {currentOffer?.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {`${currentOffer?.bedrooms || ''} bedrooms`}
                  </li>
                  <li className="property__feature property__feature--adults">
                    {`Max ${currentOffer?.maxAdults || 0} adults`}
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{currentOffer?.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {
                      currentOffer?.goods.map((good) => (
                        <li
                          key={`good-${good}`}
                          className="property__inside-item"
                        >
                          {good}
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={currentOffer?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {currentOffer?.host.name}
                    </span>
                    {currentOffer?.host.isPro && <span className="property__user-status">Pro</span>}
                  </div>
                  <div className="property__description">
                    {currentOffer?.description}
                  </div>
                </div>
                <section className="property__reviews reviews">

                  <ReviewsListScreen reviews={reviews} />

                  <ReviewFormScreen />

                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map offers={[...nearOffers, currentOffer]} city={currentOffer.city.location} selectedPoint={currentOffer}></Map>
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>

              <OffersListScreen className='near-places__list' offers={nearOffers} setActiveOffer={() => void 0} />

            </section>
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div className="page"></div>
    );
  }
}

export default PropertyScreen;
