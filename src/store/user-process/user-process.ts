import {AuthorizationStatus, UserData} from '../../types/auth';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';
import {authorizeUser, logOut} from '../action';
import {dropToken, saveToken} from '../../services/token';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | undefined;
}

const initialState : UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: function (builder){
    builder
      .addCase(authorizeUser, (state, action) => {
        const user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Authorized;
        saveToken(user.token);
        state.user = user;
      })
      .addCase(logOut, (state) => {
        state.authorizationStatus = AuthorizationStatus.AuthRequired;
        dropToken();
      });
  }
});
