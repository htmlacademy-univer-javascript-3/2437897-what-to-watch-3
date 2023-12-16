import {createAction} from '@reduxjs/toolkit';
import {UserData} from '../types/auth.ts';

export const authorizeUser = createAction<UserData>('user/authorize');
export const logOut = createAction('user/logOut');

