const AuthEndpoint = {
  REFRESH_TOKEN: '/v1/auth/refresh-token',
  LOGIN: '/v1/auth/login',
  LOGOUT: '/v1/auth/logout',
  REGISTER: '/v1/auth/register',
  RESEND_VERIFY_LINK: '/v1/auth/two-step-verification/email',

  // GET_PUBLISH_TOURNAMENTS: '/v1/tournaments',
  // CREATE_LEAGUE: '/v1/tournaments',
  // GET_LEAGUE_BY_ID: '/v1/tournaments',
  LEAGUE_SERVICES: '/v1/tournaments',
  SEARCH_LEAGUE_BY_NAME: '/v1/tournaments/searcher',
  GET_KNOCKOUT_SCHEDULE_TREE: '/v1/schedule/tree',

  TEAM_TEMPLATE_SERVICES: '/v1/team-templates',
  TEAM_SERVICES: '/v1/teams',

  GET_ALL_MY_LEAGUES: '/v1/user/created-tournaments',
  GET_ALL_MY_REGISTERED_TEAMS: '/v1/user/registered-teams',
};

export default AuthEndpoint;
