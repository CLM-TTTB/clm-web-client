import * as request from '~/utils/request';
import AuthEndpoint from '~/endpoints/authEndpoints';
import localStorage from '~/utils/localStorage';
import StorageKey from '~/constants/storageKeys';
import axios from 'axios';
import AppProperty from '~/constants/appProperties';

export const createLeague = async (data) => {
  try {
    const response = await request.private.post(
      AuthEndpoint.CREATE_LEAGUE,
      data,
    );
    return response;
  } catch (err) {
    return err.response;
  }
};
