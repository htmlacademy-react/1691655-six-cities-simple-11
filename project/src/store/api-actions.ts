import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer-type';
import { ApiRoutes } from '../consts';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { ResponseUserData } from '../types/response-user-data';
import { Review } from '../types/review-type';

export const fetchAllOffersAction = createAsyncThunk<Offer[], undefined, {
  state: State;
  extra: AxiosInstance;
}> (
  'data/loadAllOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(ApiRoutes.Offers);

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<string, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}> (
  'user/checkAuth',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.get<ResponseUserData>(ApiRoutes.Login);

    return data.email;
  }
);

export const fetchNearOffersAction = createAsyncThunk<Offer[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}> (
  'data/loadNearOffers',
  async (id: number, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${ApiRoutes.Offers}/${id}/nearby`);

    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Review[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}> (
  'data/loadReviews',
  async (id:number, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${ApiRoutes.Reviews}/${id}`);

    return data;
  }
);

export const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}> (
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(ApiRoutes.Login, {email, password});

    saveToken(data.token);

    return data.email;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}> (
  'user/logout',
  async (_args, {dispatch, extra: api}) => {
    await api.delete(ApiRoutes.Logout);
    dropToken();
  }
);

export const postReviewAction = createAsyncThunk<Review[], {
  hotelId: number;
  comment: string;
  rating: number;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}> (
  'reviews/postReview',
  async ({hotelId, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<Review[]>(`${ApiRoutes.Reviews}/${hotelId}`, {comment, rating});

    return data;
  }
);
