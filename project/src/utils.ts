import { SortingType } from './consts';
import { Offer } from './types/offer-type';
import { Review } from './types/review-type';

export const getRatingInProcent = (rating:number) => {
  const result = Math.round(rating) * 20;

  return `${result}%`;
};

export const normalizeArray = (array: Array<Offer>): {[id: string]: Offer} =>
  array.reduce((result, element) => (
    {
      ...result,
      [element.id]: element
    }
  ), {});

const sortPriceStartHigh = (offer1: Offer, offer2: Offer) => {
  const {price: priceOne} = offer1;
  const {price: priceTwo} = offer2;

  return (priceOne < priceTwo) ? 1 : -1;
};

const sortPriceStartLow = (offer1: Offer, offer2: Offer) => {
  const {price: priceOne} = offer1;
  const {price: priceTwo} = offer2;

  return (priceOne > priceTwo) ? 1 : -1;
};

const sortByRating = (offer1: Offer, offer2: Offer) => {
  const {rating: ratingOne} = offer1;
  const {rating: ratingTwo} = offer2;

  return (ratingOne < ratingTwo) ? 1 : -1;
};

export const getSortingFunc = (sortType: string) => {
  switch(sortType) {
    case SortingType.LowToHighPrice:
      return sortPriceStartLow;
    case SortingType.HighToLowPrice:
      return sortPriceStartHigh;
    case SortingType.TopRatedFirst:
      return sortByRating;
    default:
      return () => 1;
  }
};

export const sortTwoReviewsByDate = (reviewOne: Review, reviewTwo: Review) => {
  const dateOne = new Date(reviewOne.date).getTime();
  const dateTwo = new Date(reviewTwo.date).getTime();

  return dateOne < dateTwo ? 1 : -1;
};
