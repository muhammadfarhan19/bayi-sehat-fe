import config from '../utils/Config';

export const AuthAPI = {
  GET_AUTH_INFO: config.apiHost + '/auth/info',
  POST_AUTH_LOGIN: config.apiHost + '/auth/login',
  POST_AUTH_REFRESH: config.apiHost + '/auth/refresh',
  POST_AUTH_LOGOUT: config.apiHost + '/auth/logout',
};

export const UserAPI = {
  GET_USER_PROFILE: config.apiHost + '/user/profile',
  PUT_USER_PASSWORD: config.apiHost + '/user/password',
  GET_USER_PERSONAL_PEGAWAI: config.apiHost + '/user/personal-pegawai',
};

export const RbacAPI = {
  POST_RBAC_AUTHORIZE: config.apiHost + '/rbac/authorize',
  POST_RBAC_BULK_AUTHORIZE: config.apiHost + '/rbac/bulk-authorize',
  GET_RBAC_GET_USER_ROLES: config.apiHost + '/rbac/get-user-roles',
  GET_RBAC_RESOURCE_GET_PARENT: config.apiHost + '/rbac-resource-get-parent',
  GET_RBAC_RESOURCE_GET_CHILDREN: config.apiHost + '/rbac-resource-get-children',
};

export const UnitKerjaAPI = {
  POST_UNIT_KERJA_INSERT: config.apiHost + '/unit-kerja/insert',
};
