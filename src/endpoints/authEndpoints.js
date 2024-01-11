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
  GET_ALL_MY_LEAGUES: '/v1/user/created-tournaments',
  SEARCH_LEAGUE_BY_NAME: '/v1/tournaments/searcher',

  TEAM_TEMPLATE_SERVICES: '/v1/team-templates',
  TEAM_SERVICES: '/v1/teams',
};

export default AuthEndpoint;
