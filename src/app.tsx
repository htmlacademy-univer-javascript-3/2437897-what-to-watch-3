import MainPage from './pages/main/main.tsx';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import {SignInPage} from './pages/sign-in/sign-in';
import {MyListPage} from './pages/my-list/my-list';
import {MoviePage} from './pages/movie/movie';
import {ReviewPage} from './pages/review/review';
import {Player} from './pages/player/player';
import {NotFoundPage} from './pages/not-found/not-found';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './hooks/index';
import {LoadingScreen} from './pages/loading-screen/loading-screen';
import {fetchFavoriteFilms, fetchFilmList, verifyAuthorized} from './store/api-action';
import {AuthorizationStatus} from './types/auth.ts';
import {getIsFilmsLoading} from './store/film-process/selectors';
import {getAuthorizationState} from './store/user-process/selectors';


function AuthRequired({authorizationStatus} : { authorizationStatus: AuthorizationStatus }){
  return (
    <>
      {/*eslint-disable-next-line*/}
      {authorizationStatus === AuthorizationStatus.Authorized ? <Outlet/> : <SignInPage/>}
    </>
  );
}


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyAuthorized());
    dispatch(fetchFilmList());
    dispatch(fetchFavoriteFilms());
  }, [dispatch]);

  const authorizationStatus = useAppSelector(getAuthorizationState);
  const isFilmListLoading = useAppSelector(getIsFilmsLoading);
  if (authorizationStatus === AuthorizationStatus.Unknown || isFilmListLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<MainPage/>}/>
          <Route path='login' element={<SignInPage/>}/>
          <Route element={<AuthRequired authorizationStatus={authorizationStatus}/>}>
            <Route path='mylist' element={<MyListPage/>}/>
          </Route>
          <Route path='films/'>
            <Route path=':id/review' element={<ReviewPage/>}/>
            <Route path=':id/' element={<MoviePage/>}/>
          </Route>
          <Route path='player/:id' element={<Player/>}/>
        </Route>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
