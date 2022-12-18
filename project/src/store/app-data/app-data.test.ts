import { NormalizedOffers } from '../../types/offer-type';
import { normalizeArray } from '../../utils';
import { makeFakeOffer } from '../../utils/mock';
import { fetchAllOffersAction } from '../api-actions';
import { appData } from './app-data';

const offers = [makeFakeOffer()];
const normalizedOffers: NormalizedOffers = normalizeArray(offers);

describe('Reducer: app-data', () => {
  it('without additional parameters should return initial state', () => {
    expect(appData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({offers: {}, isOffersLoading: false, hasError: false, nearOffers: [], reviews: []});
  });

  it('should update offers with loaded offers', () => {
    const state = {offers: {}, isOffersLoading: false, hasError: false, nearOffers: [], reviews: [], isReviewPosted: false,};

    expect(appData.reducer(state, {type: fetchAllOffersAction.fulfilled.type, payload: offers}))
      .toEqual({offers: normalizedOffers, isOffersLoading: false, hasError: false, nearOffers: [], reviews: []});
  });

  it('should set hasError flag if server is unavailable', () => {
    const state = {offers: {}, isOffersLoading: false, hasError: false, nearOffers: [], reviews: [], isReviewPosted: false,};

    expect(appData.reducer(state, {type: fetchAllOffersAction.rejected.type}))
      .toEqual({offers: {}, isOffersLoading: false, hasError: true, nearOffers: [], reviews: []});
  });
});
