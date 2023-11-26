import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {getAPIClient} from '../services/api';

export const api = getAPIClient();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
