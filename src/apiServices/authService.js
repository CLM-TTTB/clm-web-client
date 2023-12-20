import * as request from '~/utils/request';
import AuthEndpoint from '~/endpoints/authEndpoints';
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

export const logout = async () => {};

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
