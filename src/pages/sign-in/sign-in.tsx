import {Link, Navigate} from 'react-router-dom';
import {Header} from '../../components/header.tsx';
import {FormEvent, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {login} from '../../store/api-action.ts';
import {AuthorizationStatus} from '../../types/auth.ts';

export function SignInPage(){
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/;
  const [errorText, setErrorText] = useState<string>();

  if (authStatus === AuthorizationStatus.Authorized){
    return <Navigate to='/'/>;
  }

  const handleLogin = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email === undefined || password === undefined) {
      setErrorText('Заполните все необходимые поля');
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorText('Введите правильный email');
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorText('Пароль должен состоять как минимум из одной буквы и цифры.');
      return;
    }

    dispatch(
      login({login: email, password: password})
    );
  };

  return (
    <div className="user-page">
      <Header extraStyle={'user-page__head'}/>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleLogin}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                ref={emailRef}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                ref={passwordRef}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          {errorText && <p style={{color: 'red'}}>{errorText}</p>}
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <Link to={'/'} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
