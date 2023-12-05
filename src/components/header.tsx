import {Link} from 'react-router-dom';
import {ReactNode} from 'react';
import {useAppSelector} from '../hooks';
import {AuthorizationStatus} from '../types/auth.ts';

export type HeaderProps = {
  extraStyle?: string;
  children?: ReactNode;
};

export function Header({extraStyle = '', children = undefined}: HeaderProps){
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  return (
    <header className={`page-header ${extraStyle}`}>
      <div className="logo">
        <Link to={'/'} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      {children}
      {
        authorizationStatus === AuthorizationStatus.AuthRequired ? (
          <div className="user-block">
            <Link to={'/login'} className="user-block__link">Sign in</Link>
          </div>
        ) : (
          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        )
      }
    </header>
  );
}
