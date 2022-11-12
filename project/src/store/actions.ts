import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offer-type';

export const openCloseSorting = createAction('interface/openCloseSorting');

export const changeCity = createAction<{city: string}>('offers/changeCity');

export const changeSortType = createAction<{type: string}>('offers/sortByType');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');
