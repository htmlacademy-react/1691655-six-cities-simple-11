import { NameSpace } from '../../consts';
import { NormalizedOffers, Offer } from '../../types/offer-type';
import { Review } from '../../types/review-type';
import { State } from '../../types/state';
import { sortTwoReviewsByDate } from '../../utils';

export const getOffers = (state: State): NormalizedOffers => state[NameSpace.Data].offers;

export const getDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersLoading;

export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].hasError;

export const getNearOffers = (state: State): Offer[] => state[NameSpace.Data].nearOffers;

export const getReviews = (state: State): Review[] => [...state[NameSpace.Data].reviews].sort(sortTwoReviewsByDate);

export const getReviewPostStatus = (state: State): boolean | undefined => state[NameSpace.Data].isReviewPosted;
