import config from '../utils/Config';

export const UserAPI = {
  POST_AUTH_INFO: config.apiHost + '/auth/info',
  POST_AUTH_LOGIN: config.apiHost + '/auth/login',
  POST_AUTH_REFRESH: config.apiHost + '/auth/refresh',
  POST_AUTH_LOGOUT: config.apiHost + '/auth/logout',
};
