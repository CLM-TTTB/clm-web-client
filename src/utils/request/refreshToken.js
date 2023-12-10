import publicRequest from './publicRequest';
import localStorage from '~/utils/localStorage';
import AuthEndpoint from '~/endpoints/authEndpoints';
import LocalStorageKey from '~/constants/localStorageKeys';

const refreshTokenFn = async () => {
  const refreshToken = localStorage.getItem(LocalStorageKey.REFRESH_TOKEN);
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

    const { newAccessToken, newRefreshToken } = response.data;
    localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, newRefreshToken);
    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, newAccessToken);
    return newAccessToken;
  } catch (error) {
    localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN);
    localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
    return null;
  }
};

export default refreshTokenFn;
