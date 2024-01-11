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

export const createNewTemplate = async (data) => {
  try {
    const response = await request.private.post(
      `${AuthEndpoint.TEAM_TEMPLATE_SERVICES}`,
      data,
    );

    return response;
  } catch (err) {
    return err.response;
  }
};

export const getTemplateInfosByName = async (templateName) => {
  try {
    const response = await request.private.get(
      `${AuthEndpoint.TEAM_TEMPLATE_SERVICES}/${templateName}`,
    );

    return response;
  } catch (err) {
    return err.response;
  }
};

export const getTeamInfosByTeamID = async (teamID) => {
  try {
    const response = await request.private.get(
      `${AuthEndpoint.TEAM_SERVICES}/${teamID}`,
    );

    return response;
  } catch (err) {
    return err.response;
  }
};

export const editTeamPlayersInfos = async (teamID, newInfos) => {
  try {
    const response = await request.private.patch(
      `${AuthEndpoint.TEAM_SERVICES}/${teamID}`,
      { members: newInfos },
    );

    return response;
  } catch (err) {
    return err.response;
  }
};
