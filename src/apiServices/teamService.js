import * as request from '~/utils/request';
import AuthEndpoint from '~/endpoints/authEndpoints';
import localStorage from '~/utils/localStorage';
import StorageKey from '~/constants/storageKeys';

export const getAllMyTeamTemplates = async (getNameOnly) => {
  try {
    const response = await request.private.get(
      `${AuthEndpoint.TEAM_TEMPLATE_SERVICES}?nameOnly=${getNameOnly}`,
    );

    return response;
  } catch (err) {
    return err.response;
  }
};
