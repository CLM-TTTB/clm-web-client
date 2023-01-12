import axios from 'axios';
import refreshTokenFn from './refreshToken';
import AppProperty from '~/constants/appProperties';
import HttpStatus from '~/constants/httpStatusCode';
import localStorage from '~/utils/localStorage';
import sessionStorage from '~/utils/sessionStorage';
import StorageKey from '~/constants/storageKeys';
import history from '~/utils/navigateSite';
import { toast } from 'react-toastify';

axios.defaults.baseURL = AppProperty.CLM_API_URL;

axios.interceptors.request.use(
  async (config) => {
    const rememberMe = localStorage.getItem(StorageKey.REMEMBER_ME);

    const accessToken = rememberMe
      ? localStorage.getItem(StorageKey.ACCESS_TOKEN)
      : sessionStorage.getItem(StorageKey.ACCESS_TOKEN);

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error?.config;
    if (error?.response?.status === HttpStatus.UNAUTHORIZED && !config?.sent) {
      config.sent = true;
      const newAccessToken = await refreshTokenFn();

      if (newAccessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        return axios(config);
      }
      //logout without sending the refresh token back to server
      // toast.warn('Session expired. Please login again.');
      // history.navigate('/login');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

const privateRequest = axios;

export default privateRequest;
