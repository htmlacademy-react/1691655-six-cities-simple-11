import { AuthorizationStatus } from '../consts';
import { store } from '../store';
import { NormalizedOffers, Offer } from './offer-type';
import { Review } from './review-type';

export type AppData = {
  offers: NormalizedOffers;
  nearOffers: Offer[];
  reviews: Review[];
  isOffersLoading: boolean;
  hasError: boolean;
  isReviewPosted: boolean | undefined;
}

export type AppProcess = {
  city: string;
  sortType: string;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
}

export type State = ReturnType<typeof store.getState >;

export type AppDispatch = typeof store.dispatch;
