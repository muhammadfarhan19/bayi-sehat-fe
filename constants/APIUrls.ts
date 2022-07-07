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
  POST_USER_UPDATE_PROFILE: config.apiHost + '/user/update-profile',
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
  GET_UNIT_KERJA_LIST_DIREKTORAT: config.apiHost + '/unit-kerja/list/direktorat',
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

export const ArsipDigitalAPI = {
  GET_ARSIP_DIGITAL_LIST: config.apiHost + '/arsip-digital/list',
  GET_ARSIP_DIGITAL_VIEW: config.apiHost + '/arsip-digital/view',
  POST_ARSIP_DIGITAL_DELETE: config.apiHost + '/arsip-digital/delete',
  POST_ARSIP_DIGITAL_INSERT: config.apiHost + '/arsip-digital/insert',
  POST_ARSIP_DIGITAL_UPDATE: config.apiHost + '/arsip-digital/update',
};

export const MasterAPI = {
  GET_JENIS_JABATAN_LIST: config.apiHost + '/master/jenis-jabatan',
  GET_MASTER_JENIS_BERKAS: config.apiHost + '/master/jenis-berkas',
};

export const DocumentAPI = {
  POST_DOCUMENT_UPLOAD: config.apiHost + '/document/upload',
  GET_DOCUMENT: config.apiHost + '/document/:uuid',
};

export const RiwayatDiklatAPI = {
  GET_RIWAYAT_DIKLAT_LIST: config.apiHost + '/diklat/list',
  GET_RIWAYAT_DIKLAT_DETAIL: config.apiHost + '/diklat/detail',
  POST_RIWAYAT_DIKLAT_DELETE: config.apiHost + '/diklat/delete',
  POST_RIWAYAT_DIKLAT_INSERT: config.apiHost + '/diklat/insert',
  POST_RIWAYAT_DIKLAT_UPDATE: config.apiHost + '/diklat/update',
};

export const RiwayatPendidikanAPI = {
  GET_RIWAYAT_PENDIDIKAN_LIST: config.apiHost + '/pendidikan/list',
  GET_RIWAYAT_PENDIDIKAN_DETAIL: config.apiHost + '/pendidikan/detail',
  POST_RIWAYAT_PENDIDIKAN_DELETE: config.apiHost + '/pendidikan/delete',
  POST_RIWAYAT_PENDIDIKAN_INSERT: config.apiHost + '/pendidikan/insert',
  POST_RIWAYAT_PENDIDIKAN_UPDATE: config.apiHost + '/pendidikan/update',
};

export const RekapDinasAPI = {
  GET_DINAS_PEGAWAI_AVAILABILITY: config.apiHost + '/dinas/pegawai/availability',
  GET_DINAS_PEGAWAI_GETDINAS: config.apiHost + '/dinas/pegawai/get-dinas',
  GET_DINAS_LIST: config.apiHost + '/dinas/list',
  POST_DINAS_INSERT: config.apiHost + '/dinas/insert',
  GET_DINAS_DETAIL: config.apiHost + '/dinas/detail',
  POST_DINAS_UPDATE: config.apiHost + '/dinas/update',
};
