import React, { FormEvent, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, CITIES_WITH_COORDINATES } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { changeCity } from '../../store/app-process/app-process';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthData } from '../../types/auth-data';

function LoginScreen ():JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthorizationStatus);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null && regex.test(passwordRef.current.value)) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[a-zA-Z])(?!.*[^ a-zA-Z0-9]).*$/;
  const handlePasswordChange = () => {
    if (passwordRef.current) {
      !regex.test(passwordRef.current.value)
        ? passwordRef.current.setCustomValidity('Введите правильный пароль')
        : passwordRef.current.setCustomValidity('');
    }
  };

  const randomCity = CITIES_WITH_COORDINATES[Math.floor(Math.random() * CITIES_WITH_COORDINATES.length)];
  const handleRandomCityClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    dispatch(changeCity({city: (evt.target as HTMLElement).innerText}));
    navigate(AppRoute.Root);
  };

  useEffect(() => {
    let isLogin = true;

    if (isLogin && authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }

    return () => {
      isLogin = false;
    };
  }, [authStatus, navigate]);

  const passwordHintStyle = {
    marginTop: '-15px',
    marginBottom: '30px',
    color: 'red',
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to='/'>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  onChange={handlePasswordChange}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <div
                  className='place-card__type'
                  style={passwordHintStyle}
                >
                  Пароль должен состоять минимум из одной буквы и цифры (буквы латинские)
                </div>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to='/'
                onClick={handleRandomCityClick}
              >
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;

