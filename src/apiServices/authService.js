import * as request from '~/utils/request';
import AuthEndpoint from '~/endpoints/authEndpoints';
import HttpStatus from '~/constants/httpStatusCode';
import localStorage from '~/utils/localStorage';
import LocalStorageKey from '~/constants/localStorageKeys';

export const login = async (data) => {
  try {
    const response = await request.public.post(AuthEndpoint.LOGIN, data);
    if (response.status === HttpStatus.OK) {
      const { refreshToken, accessToken, ...userInfos } = response.data;
      localStorage.setItem(LocalStorageKey.USER_INFOS, userInfos);
      localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, refreshToken);
      localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, accessToken);
    }
    return response.status;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const logout = async () => {};
