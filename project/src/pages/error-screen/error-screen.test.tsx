import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import ErrorScreen from './error-screen';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Component: ErrorScreen', () => {
  it('should render corretly', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ErrorScreen />
      </Provider>
    );

    expect(screen.getByText(/Не удалось загрузить предложения/i)).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Попробовать ещё раз');
  });

  it('should fetch offers when button clicked', async() => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <ErrorScreen />
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('data/loadAllOffers/pending');
  });
});
