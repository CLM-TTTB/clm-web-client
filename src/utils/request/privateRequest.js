import axios from 'axios';
import refreshTokenFn from './refreshToken';
import AppProperty from '~/constants/appProperties';
import HttpStatus from '~/constants/httpStatusCode';
import localStorage from '~/utils/localStorage';
import LocalStorageKey from '~/constants/localStorageKeys';

axios.defaults.baseURL = AppProperty.CLM_API_URL;

axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
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
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

const privateRequest = axios;

export default privateRequest;
