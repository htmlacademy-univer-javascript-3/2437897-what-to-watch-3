import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import {films} from './mocks/film';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App films={films} selectedFilm={films[0]}/>
  </React.StrictMode>
);
