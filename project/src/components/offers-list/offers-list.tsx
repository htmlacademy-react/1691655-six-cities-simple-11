import { Offer } from '../../types/offer-type';
import CardScreen from '../card-screen/card-screen';
import { useCallback } from 'react';

type OfferListProps = {
  className: string;
  offers: Offer[];
  setActiveOffer: (arg0: Offer | undefined) => void;
}

function OffersList (props: OfferListProps):JSX.Element {
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

export default OffersList;
