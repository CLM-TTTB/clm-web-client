import publicRequest from './publicRequest';
import localStorage from '~/utils/localStorage';
import sessionStorage from '~/utils/sessionStorage';
import AuthEndpoint from '~/endpoints/authEndpoints';
import StorageKey from '~/constants/storageKeys';

const refreshTokenFn = async () => {
  const rememberMe = localStorage.getItem(StorageKey.REMEMBER_ME);

  const refreshToken = rememberMe
    ? localStorage.getItem(StorageKey.REFRESH_TOKEN)
    : sessionStorage.getItem(StorageKey.REFRESH_TOKEN);

  if (!refreshToken) {
    return null;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  try {
    const response = await publicRequest.post(
      AuthEndpoint.REFRESH_TOKEN,
      null,
      config,
    );

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;

    if (response.status > 200 && response.status < 300) {
      if (rememberMe) {
        localStorage.setItem(StorageKey.REFRESH_TOKEN, newRefreshToken);
        localStorage.setItem(StorageKey.ACCESS_TOKEN, newAccessToken);
      } else {
        sessionStorage.setItem(StorageKey.REFRESH_TOKEN, newRefreshToken);
        sessionStorage.setItem(StorageKey.ACCESS_TOKEN, newAccessToken);
      }
      return newAccessToken;
    }
    return null;
  } catch (error) {
    if (rememberMe) {
      localStorage.removeItem(StorageKey.REFRESH_TOKEN);
      localStorage.removeItem(StorageKey.ACCESS_TOKEN);
    } else {
      sessionStorage.removeItem(StorageKey.REFRESH_TOKEN);
      sessionStorage.removeItem(StorageKey.ACCESS_TOKEN);
    }
    return null;
  }
};

export default refreshTokenFn;
