import * as request from '~/utils/request';
import AuthEndpoint from '~/endpoints/authEndpoints';
import localStorage from '~/utils/localStorage';
import StorageKey from '~/constants/storageKeys';

//PRIVATE SERVICES
export const createLeague = async (data) => {
  try {
    const response = await request.private.post(
      AuthEndpoint.LEAGUE_SERVICES,
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
      `${AuthEndpoint.LEAGUE_SERVICES}/${id}`,
    );

    return response;
  } catch (err) {
    return err.response;
  }
};

export const getTeamsInLeagueByID = async (leagueID) => {
  try {
    const response = await request.private.get(
      `${AuthEndpoint.LEAGUE_SERVICES}/${leagueID}/teams`,
    );

    return response;
  } catch (err) {
    return err.response;
  }
};

//PUBLIC SERVICE
export const getPublishLeagueByPage = async (currentPage) => {
  try {
    const response = await request.public.get(
      `${AuthEndpoint.LEAGUE_SERVICES}?page=${currentPage}&size=12&visibility=PUBLISH`,
    );

    return response;
  } catch (err) {
    return err.response;
  }
};

export const sortLeagueByName = async () => {
  try {
    const response = await request.public.get(
      `${AuthEndpoint.LEAGUE_SERVICES}?size=21&sort=name,ASC&visibility=PUBLISH`,
    );

    return response;
  } catch (err) {
    return err.response;
  }
};

export const sortLeague = async (sortBy, isDESC) => {
  const order = isDESC ? 'DESC' : 'ASC';
  try {
    const response = await request.public.get(
      `${AuthEndpoint.LEAGUE_SERVICES}?size=21&sort=${sortBy},${order}&visibility=PUBLISH`,
    );

    return response;
  } catch (err) {
    return err.response;
  }
};

export const searchLeagueByName = async (searchTerm) => {
  try {
    const response = await request.public.get(
      `${AuthEndpoint.SEARCH_LEAGUE_BY_NAME}?q=${searchTerm}`,
    );

    return response;
  } catch (err) {
    return err.response;
  }
};

export const getRegisteredTeamByID = async (leagueID) => {
  try {
    const response = await request.public.get(
      `${AuthEndpoint.LEAGUE_SERVICES}/${leagueID}/teams`,
    );

    return response;
  } catch (err) {
    return err.response;
  }
};
