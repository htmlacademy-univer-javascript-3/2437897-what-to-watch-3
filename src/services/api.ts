import axios, {AxiosInstance} from 'axios';
import {getToken} from './token.ts';


const BACKEND_URL = 'https://13.design.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

export const getAPIClient = (): AxiosInstance => (
  axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'X-Token': getToken(),
    }
  })
);
