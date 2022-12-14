import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { ApiRoutes } from '../consts';
import { checkAuthAction, fetchAllOffersAction, loginAction, logoutAction } from './api-actions';
import { makeFakeOffer } from '../utils/mock';
import { AuthData } from '../types/auth-data';

describe ('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is "auth" when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(ApiRoutes.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('should dispatch load offers when GET /offers', async () => {
    const mockOffers = makeFakeOffer();
    const store = mockStore();

    mockAPI
      .onGet(ApiRoutes.Offers)
      .reply(200, mockOffers);

    await store.dispatch(fetchAllOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchAllOffersAction.pending.type,
      fetchAllOffersAction.fulfilled.type,
    ]);
  });

  it('should dispatch Authorization when POST /login', async () => {
    const fakerUser: AuthData = {login: 'vettrov78@mail.ru', password: '12345'};

    mockAPI
      .onPost(ApiRoutes.Login)
      .reply(200, {token: 'secret'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakerUser));

    const actions = store.getActions().map(({type}) => type);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('my-token', 'secret');

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type,
    ]);

  });

  it('should dispatch Logout when delete /logout', async () => {
    mockAPI
      .onDelete(ApiRoutes.Logout)
      .reply(204);

    const store = mockStore();

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('my-token');
  });
});
