const AuthEndpoint = {
  REFRESH_TOKEN: '/v1/auth/refresh-token',
  LOGIN: '/v1/auth/login',
  LOGOUT: '/v1/auth/logout',
  REGISTER: '/v1/auth/register',
  RESEND_VERIFY_LINK: '/v1/auth/two-step-verification/email',

  CREATE_LEAGUE: '/v1/tournaments',
  GET_ALL_MY_LEAGUES: '/v1/user/created-tournaments',
  GET_LEAGUE_BY_ID: '/v1/tournaments',
};

export default AuthEndpoint;
