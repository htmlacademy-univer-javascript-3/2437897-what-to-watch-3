import MainPage, {MainPageProps} from './pages/main/main.tsx';
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import {SignInPage} from './pages/sign-in/sign-in';
import {MyListPage} from './pages/my-list/my-list';
import {MoviePage} from './pages/movie/movie';
import {ReviewPage} from './pages/review/review';
import {Player} from './pages/player/player';
import {NotFoundPage} from './pages/not-found/not-found';


function AuthRequired({isAuthorized} : { isAuthorized: boolean }){
  return (
    <>
      {/*eslint-disable-next-line*/}
      {isAuthorized ? <Outlet/> : <SignInPage/>}
    </>
  );
}

function App(props: MainPageProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<MainPage {...props}/>}/>
          <Route path='login' element={<SignInPage/>}/>
          <Route element={<AuthRequired isAuthorized={false}/>}>
            <Route path='mylist' element={<MyListPage/>}/>
          </Route>
          <Route path='films/'>
            <Route path=':id/' element={<MoviePage/>}>
              <Route path='review' element={<ReviewPage/>}/>
            </Route>
          </Route>
          <Route path='player/:id' element={<Player/>}/>
        </Route>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
