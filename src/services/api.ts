import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getToken} from './token.ts';
import {toast} from 'react-toastify';
import {StatusCodes} from 'http-status-codes';
import {api} from '../store';
import {FilmInfoShort} from '../types/film.ts';


const BACKEND_URL = 'https://13.design.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

type DetailMessageType = {
  type: string;
  message: string;
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.INTERNAL_SERVER_ERROR]: true,
  [StatusCodes.SERVICE_UNAVAILABLE]: true,
};
const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

export const getAPIClient = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }

      return config;
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);
        toast.warn(detailMessage.message);
      }

      throw error;
    }
  );

  return axiosInstance;
};

export const fetchFavouriteFilms = async () => {
  const {data} = await api.get<FilmInfoShort[]>('favorite');
  return data;
};

