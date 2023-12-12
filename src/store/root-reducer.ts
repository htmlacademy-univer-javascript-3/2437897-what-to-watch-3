import {NameSpace} from './namespace';
import {combineReducers} from '@reduxjs/toolkit';
import {userProcess} from './user-process/user-process';
import {filmsProcess} from './film-process/film-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Film]: filmsProcess.reducer,
});
