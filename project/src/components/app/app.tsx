import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks';
import LayoutScreen from '../../pages/layout-sreen/layout-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';


function App(): JSX.Element {
  const isLoginPage = false;
  const isOffersDataLoading = useAppSelector((state) => state.isOffersLoading);

  if (isOffersDataLoading) {
    return (
      <LoginScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<LayoutScreen isLoginPage={isLoginPage }/>}
        >
          <Route
            index
            element={<MainScreen />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Offer}
            element={<PropertyScreen />}
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
