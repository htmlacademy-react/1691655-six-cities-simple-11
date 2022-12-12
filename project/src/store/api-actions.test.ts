import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { ApiRoutes } from '../consts';
import { checkAuthAction, fetchAllOffersAction, logoutAction } from './api-actions';
import { makeFakeOffer } from '../utils/mock';

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

  // it('should dispatch ')
  it('it should dispatch Logout when delete /logout', async () => {
    const store = mockStore();

    mockAPI
      .onGet(ApiRoutes.Logout)
      .reply(204);

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
