import { Offer } from '../../types/offer-type';
import CardScreen from '../../pages/card-screen/card-screen';
import { useCallback } from 'react';

type OfferListScreenProps = {
  className: string;
  offers: Offer[];
  setActiveOffer: (arg0: Offer | undefined) => void;
}

function OffersListScreen (props: OfferListScreenProps):JSX.Element {
  const { className, offers, setActiveOffer } = props;
  const handleClick = useCallback((currentOffer: Offer | undefined) => setActiveOffer(currentOffer), [setActiveOffer]);

  return (
    <div className={`${className} places__list`}>
      {
        offers &&
          offers.map((offer) => (
            <CardScreen
              key={offer.id}
              className={className === 'near-places__list' ?
                'near-places__card' :
                'cities__card'}
              offer={offer}
              setActiveOffer={ handleClick }
            />
          ))
      }
    </div>
  );
}

export default OffersListScreen;
