import * as request from '~/utils/request';
import AuthEndpoint from '~/endpoints/authEndpoints';
import HttpStatus from '~/constants/httpStatusCode';
import localStorage from '~/utils/localStorage';
import LocalStorageKey from '~/constants/storageKeys';

export const login = async (data) => {
  try {
    const response = await request.public.post(AuthEndpoint.LOGIN, data);
    return response;
  } catch (err) {
    console.log('Error from authSer.js: ' + err.response.status);
    return err.response;
  }
};

export const signUp = async (data) => {
  try {
    console.log(data);
    const response = await request.public.post(AuthEndpoint.REGISTER, data);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const logout = async () => {};
