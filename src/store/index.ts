import {configureStore} from '@reduxjs/toolkit';
import {getAPIClient} from '../services/api';
import {rootReducer} from './root-reducer';

export const api = getAPIClient();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type State = ReturnType<typeof store.getState>;
