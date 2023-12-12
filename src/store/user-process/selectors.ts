import {NameSpace} from '../namespace';
import {State} from '../index.ts';

export const getAuthorizationState = (state: State) => state[NameSpace.User].authorizationStatus;
export const getUser = (state: State) => state[NameSpace.User].user;
