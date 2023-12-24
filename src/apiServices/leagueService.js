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

export const getAllMyLeagues = async () => {
  try {
    const response = await request.private.get(AuthEndpoint.GET_ALL_MY_LEAGUES);

    return response;
  } catch (err) {
    return err.response;
  }
};

export const getLeagueByID = async (id) => {
  try {
    const response = await request.private.get(
      `${AuthEndpoint.GET_LEAGUE_BY_ID}/${id}`,
    );

    return response;
  } catch (err) {
    return err.response;
  }
};
