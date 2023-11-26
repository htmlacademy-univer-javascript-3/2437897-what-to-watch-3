import MainPage from './pages/main/main.tsx';
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import {SignInPage} from './pages/sign-in/sign-in';
import {MyListPage} from './pages/my-list/my-list';
import {MoviePage} from './pages/movie/movie';
import {ReviewPage} from './pages/review/review';
import {Player} from './pages/player/player';
import {NotFoundPage} from './pages/not-found/not-found';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './hooks/index';
import {LoadingScreen} from './pages/loading-screen/loading-screen';
import {fetchFilmList} from './store/api-action';


function AuthRequired({isAuthorized} : { isAuthorized: boolean }){
  return (
    <>
      {/*eslint-disable-next-line*/}
      {isAuthorized ? <Outlet/> : <SignInPage/>}
    </>
  );
}


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilmList());
  }, [dispatch]);

  const isFilmListLoading = useAppSelector((state) => state.isFilmListLoading);
  const films = useAppSelector((state) => state.allFilms);
  if (isFilmListLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<MainPage selectedFilm={films[0]}/>}/>
          <Route path='login' element={<SignInPage/>}/>
          <Route element={<AuthRequired isAuthorized={false}/>}>
            <Route path='mylist' element={<MyListPage films={films}/>}/>
          </Route>
          <Route path='films/'>
            <Route path=':id/review' element={<ReviewPage films={films}/>}/>
            <Route path=':id/' element={<MoviePage films={films}/>}/>
          </Route>
          <Route path='player/:id' element={<Player films={films}/>}/>
        </Route>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
