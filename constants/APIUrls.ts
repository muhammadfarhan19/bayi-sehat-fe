import config from '../utils/Config';

export const AuthAPI = {
  GET_AUTH_INFO: config.apiHost + '/auth/info',
  POST_AUTH_LOGIN: config.apiHost + '/auth/login',
  POST_AUTH_LOGOUT: config.apiHost + '/auth/logout',
  POST_AUTH_REFRESH: config.apiHost + '/auth/refresh',
};

export const UserAPI = {
  GET_USER_PERSONAL_PEGAWAI: config.apiHost + '/user/personal-pegawai',
  GET_USER_PROFILE: config.apiHost + '/user/profile',
  PUT_USER_PASSWORD: config.apiHost + '/user/password',
};

export const RbacAPI = {
  GET_RBAC_GET_USER_ROLES: config.apiHost + '/rbac/get-user-roles',
  GET_RBAC_RESOURCE_GET_CHILDREN: config.apiHost + '/rbac-resource-get-children',
  GET_RBAC_RESOURCE_GET_PARENT: config.apiHost + '/rbac-resource-get-parent',
  POST_RBAC_AUTHORIZE: config.apiHost + '/rbac/authorize',
  POST_RBAC_BULK_AUTHORIZE: config.apiHost + '/rbac/bulk-authorize',
};

export const UnitKerjaAPI = {
  POST_UNIT_KERJA_INSERT: config.apiHost + '/unit-kerja/insert',
};

export const StatisticAPI = {
  GET_STATISTIC_FIND: config.apiHost + '/statistic/find',
};

export const JabatanAPI = {
  GET_JABATAN_DETAIL: config.apiHost + '/jabatan/detail',
  GET_JABATAN: config.apiHost + '/jabatan/list',
};

export const KepegawaianAPI = {
  GET_PEGAWAI_LIST: config.apiHost + '/pegawai/list',
};

export const PetaAPI = {
  GET_PETA: config.apiHost + '/jabatan/peta/list',
  POST_JABATAN_KEBUTUHAN: config.apiHost + '/jabatan/kebutuhan/update',
};
