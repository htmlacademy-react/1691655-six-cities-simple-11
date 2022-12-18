import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { AppData } from '../../types/state';
import { normalizeArray } from '../../utils';
import { fetchAllOffersAction, fetchNearOffersAction, fetchReviewsAction, postReviewAction } from '../api-actions';

const initialState: AppData = {
  offers: {},
  nearOffers: [],
  reviews: [],
  isOffersLoading: false,
  hasError: false,
  isReviewPosted: undefined,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changePostStatus: (state, action: PayloadAction<boolean | undefined>) => {
      state.isReviewPosted = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllOffersAction.pending, (state) => {
        state.isOffersLoading = true;
        state.hasError = false;
      })
      .addCase(fetchAllOffersAction.fulfilled, (state, action) => {
        state.offers = normalizeArray(action.payload);
        state.isOffersLoading = false;
      })
      .addCase(fetchAllOffersAction.rejected, ((state) => {
        state.isOffersLoading = false;
        state.hasError = true;
      }))
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isReviewPosted = false;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewPosted = true;
      });
  }
});

export const {changePostStatus} = appData.actions;
