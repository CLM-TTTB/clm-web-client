import * as request from '~/utils/request';
import AuthEndpoint from '~/endpoints/authEndpoints';
import sessionStorage from '~/utils/sessionStorage';
import localStorage from '~/utils/localStorage';
import StorageKey from '~/constants/storageKeys';
import axios from 'axios';
import AppProperty from '~/constants/appProperties';

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

export const logout = async () => {
  try {
    const rememberMe = await localStorage.getItem(StorageKey.REMEMBER_ME);
    const refreshToken = rememberMe
      ? localStorage.getItem(StorageKey.REFRESH_TOKEN)
      : sessionStorage.getItem(StorageKey.REFRESH_TOKEN);

    console.log('Refresh token: ' + refreshToken);
    const response = await axios.post(
      AppProperty.CLM_API_URL + AuthEndpoint.LOGOUT,
      null,
      {
        headers: { Authorization: 'Bearer ' + refreshToken },
      },
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const resendVerificationLink = async () => {
  const resendVeriLinkToken = await localStorage.getItem(
    StorageKey.RESEND_VERI_LINK_TOKEN,
  );
  console.log(resendVeriLinkToken);

  if (!resendVeriLinkToken) {
    console.log('Resend verification link token does not exist!!');
    return;
  }

  try {
    const response = axios.post(
      AppProperty.CLM_API_URL + AuthEndpoint.RESEND_VERIFY_LINK,
      null,
      {
        headers: { Authorization: 'Bearer ' + resendVeriLinkToken },
      },
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const updateUserProfile = async (userName, userPhoneNum) => {
  try {
    const response = await request.private.patch('/v1/user/change-profile', {
      name: userName,
      phoneNo: userPhoneNum,
    });
    return response;
  } catch (err) {
    console.log('Error from authSer.js: ' + err.response.status);
    return err.response;
  }
};
