export enum AuthorizationStatus {
  Authorized = 'AUTH',
  AuthRequired = 'AUTH_REQUIRED',
  Unknown = 'UNKNOWN',
}

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  name: string;
  avatarUrl: string;
  email: string;
  token: string;
}

