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
  POST_USER_UPDATE_DATA_DIRI_PEGAWAI: config.apiHost + '/user/update-data-diri-pegawai',
};

export const RbacAPI = {
  GET_RBAC_GET_USER_ROLES: config.apiHost + '/rbac/get-user-roles',
  GET_RBAC_RESOURCE_GET_CHILDREN: config.apiHost + '/rbac-resource-get-children',
  GET_RBAC_RESOURCE_GET_PARENT: config.apiHost + '/rbac-resource-get-parent',
  POST_RBAC_AUTHORIZE: config.apiHost + '/rbac/authorize',
  POST_RBAC_BULK_AUTHORIZE: config.apiHost + '/rbac/bulk-authorize',
  //Admin-Role
  GET_RBAC_USER_ADMIN_LIST: config.apiHost + '/rbac/admin/user-list',
  GET_RBAC_USER_ADMIN_ROLES: config.apiHost + '/rbac/role/admin-roles',
  POST_RBAC_SET_USER_ROLES: config.apiHost + '/rbac/set-user-role',
  POST_RBAC_REMOVE_USER_ROLES: config.apiHost + '/rbac/remove-user-role',
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
  POST_JABATAN_DELETE: config.apiHost + '/jabatan/delete',
  POST_JABATAN_UPDATE: config.apiHost + '/jabatan/update',
  GET_RIWAYAT_JABATAN: config.apiHost + '/riwayat-jabatan/list',
  UPDATE_JABATAN: config.apiHost + '/jabatan/update-jabatan-pegawai',
  POST_RIWAYAT_JABATAN_DELETE: config.apiHost + '/riwayat-jabatan/delete',
  POST_RIWAYAT_JABATAN_UPDATE: config.apiHost + '/riwayat-jabatan/update',
  POST_JABATAN_INSERT: config.apiHost + '/jabatan/insert',
};

export const KepegawaianAPI = {
  GET_PEGAWAI_LIST: config.apiHost + '/pegawai/list',
  POST_PEGAWAI_INSERT: config.apiHost + '/pegawai/insert',
  POST_PEGAWAI_KARPEG_UPDATE: config.apiHost + '/pegawai/karpeg/update',
  GET_DINAS_PEGAWAI_KALENDER: config.apiHost + '/dinas/pegawai/kalender',
  GET_DINAS_PEGAWAI_KALENDER_V2: config.apiHost + '/dinas/pegawai/kalender/v2',
  GET_PEGAWAI_STATISTIC_LIST: config.apiHost + '/pegawai/statistic/list',
  GET_PEGAWAI_PRESENSI_SUMMARY: config.apiHost + '/presensi-pegawai/summary',
  GET_PEGAWAI_PEGAWAI_EKSTERNAL: config.apiHost + '/user/external/list',
  GET_CALENDAR_PEGAWAI: config.apiHost + '/dinas/kalender/summary',
  POST_STATUS_KEPEGAWAIAN: config.apiHost + '/pegawai/update-status-kepegawaian',
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
  GET_PENDIDIKAN_ELIGIBLE_JENJANG: config.apiHost + '/pendidikan/eligible_jenjang',
  GET_MASTER_JENIS_KP: config.apiHost + '/master/jenis-kp',
  GET_MASTER_JENIS_GOLONGAN: config.apiHost + '/master/golongan',
  GET_MASTER_HOTEL: config.apiHost + '/master/hotel/list',
  GET_BANK_LIST: config.apiHost + '/master/bank',
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

export const GolonganAPI = {
  GET_RIWAYAT_GOLONGAN_LIST: config.apiHost + '/riwayat-golongan/list',
  UPDATE_SURAT_KEPUTUSAN: config.apiHost + '/riwayat-golongan/update-surat-keputusan',
  UPDATE_RIWAYAT_GOLONGAN: config.apiHost + '/riwayat-golongan/update',
  DELETE_RIWAYAT_GOLONGAN: config.apiHost + '/riwayat-golongan/delete',
  INSERT_RIWAYAT_GOLONGAN: config.apiHost + '/riwayat-golongan/insert',
};

export const RekapDinasAPI = {
  GET_DINAS_PEGAWAI_AVAILABILITY: config.apiHost + '/dinas/pegawai/availability',
  GET_DINAS_PEGAWAI_GETDINAS: config.apiHost + '/dinas/pegawai/get-dinas',
  GET_DINAS_LIST: config.apiHost + '/dinas/list',
  POST_DINAS_INSERT: config.apiHost + '/dinas/insert',
  GET_DINAS_DETAIL: config.apiHost + '/dinas/detail',
  POST_DINAS_UPDATE: config.apiHost + '/dinas/update',
  GET_DINAS_PEGAWAI_REKAP: config.apiHost + '/dinas/pegawai/rekap',
  POST_DINAS_DELETE: config.apiHost + '/dinas/delete',
  GET_DINAS_PEGAWAI: config.apiHost + '/dinas/pegawai/statistic',
  GET_DINAS_PEGAWAI_SCHEDULE: config.apiHost + '/dinas/pegawai/schedule',
  GET_DINAS_PEGAWAI_UPCOMING: config.apiHost + '/dinas/pegawai/upcoming',
};

export const KepangkatanAPI = {
  GET_KEPANGKATAN_LIST: config.apiHost + '/kepangkatan/list',
};

export const RiwayatPenghargaan = {
  GET_RIWAYAT_PENGHARGAAN_LIST: config.apiHost + '/riwayat-penghargaan/list',
  POST_RIWAYAT_PENGHARGAAN_INSERT: config.apiHost + '/riwayat-penghargaan/insert',
  GET_RIWAYAT_PENGHARGAAN_DETAIl: config.apiHost + '/riwayat-penghargaan/detail',
  POST_RIWAYAT_PENGHARGAAN_UPDATE: config.apiHost + '/riwayat-penghargaan/update',
  POST_RIWAYAT_PENGHARGAAN_DELETE: config.apiHost + '/riwayat-penghargaan/delete',
};

export const RiwayatBelajarAPI = {
  GET_RIWAYAT_BELAJAR_LIST: config.apiHost + '/riwayat-belajar/list',
  POST_RIWAYAT_BELAJAR_INSERT: config.apiHost + '/riwayat-belajar/insert',
  GET_RIWAYAT_BELAJAR_DETAIl: config.apiHost + '/riwayat-belajar/detail',
  POST_RIWAYAT_BELAJAR_UPDATE: config.apiHost + '/riwayat-belajar/update',
  POST_RIWAYAT_BELAJAR_DELETE: config.apiHost + '/riwayat-belajar/delete',
  POST_RIWAYAT_BELAJAR_STATISTIC_LIST: config.apiHost + '/riwayat-belajar/statistic/list',
};

export const UserProfileAPI = {
  USER_PHOTO: config.apiHost + '/user/foto',
  GET_USER_DOC_PHOTO: config.apiHost + '/document',
};

export const RiwayatKeluargaAPI = {
  POST_RIWAYAT_KELUARGA_INSERT: config.apiHost + '/riwayat-keluarga/insert',
  POST_RIWAYAT_KELUARGA_UPDATE: config.apiHost + '/riwayat-keluarga/update',
  POST_RIWAYAT_KELUARGA_DELETE: config.apiHost + '/riwayat-keluarga/delete',
  POST_RIWAYAT_KELUARGA_DETAIL: config.apiHost + '/riwayat-keluarga/detail',
  GET_RIWAYAT_KELUARGA_LIST: config.apiHost + '/riwayat-keluarga/list',
};

export const RiwayatAnakAPI = {
  POST_RIWAYAT_ANAK_INSERT: config.apiHost + '/anak-pegawai/insert',
  POST_RIWAYAT_ANAK_DELETE: config.apiHost + '/anak-pegawai/delete',
  GET_RIWAYAT_ANAK_LIST: config.apiHost + '/anak-pegawai/list',
};

export const RiwayatKGBAPI = {
  GET_RIWAYAT_KGB_LIST: config.apiHost + '/riwayat-kgb/list',
  GET_RIWAYAT_KGB_DETAIL: config.apiHost + '/riwayat-kgb/detail',
  POST_RIWAYAT_KGB_INSERT: config.apiHost + '/riwayat-kgb/insert',
  POST_RIWAYAT_KGB_DELETE: config.apiHost + '/riwayat-kgb/delete',
  POST_RIWAYAT_KGB_UPDATE: config.apiHost + '/riwayat-kgb/update',
};

export const RiwayatSKPAPI = {
  GET_RIWAYAT_SKP_LIST: config.apiHost + '/riwayat-skp/list',
  GET_RIWAYAT_SKP_LIST_V2: config.apiHost + '/riwayat-skp-new/list',
  POST_RIWAYAT_SKP_INSERT: config.apiHost + '/riwayat-skp/insert',
  POST_RIWAYAT_SKP_V2: config.apiHost + '/riwayat-skp-new/insert',
  PUT_RIWAYAT_SKP_V2: config.apiHost + '/riwayat-skp-new/update',
  POST_RIWAYAT_SKP_UPDATE: config.apiHost + '/riwayat-skp/update',
  POST_RIWAYAT_SKP_DELETE: config.apiHost + '/riwayat-skp/delete',
  POST_RIWAYAT_SKP_DELETE_V2: config.apiHost + '/riwayat-skp-new/delete',
};

export const RiwayatPengangkatanPekerjaan = {
  POST_RIWAYAT_PENGANGKATAN_DELETE: config.apiHost + '/riwayat-pengangkatan-perkerjaan/delete',
  GET_RIWAYAT_PENGANGKATAN_DETAIL: config.apiHost + '/riwayat-pengangkatan-perkerjaan/detail',
  GET_RIWAYAT_PENGANGKATAN_LIST: config.apiHost + '/riwayat-pengangkatan-perkerjaan/list',
  POST_RIWAYAT_PENGANGKATAN_INSERT: config.apiHost + '/riwayat-pengangkatan-perkerjaan/insert',
  POST_RIWAYAT_PENGANGKATAN_UPDATE: config.apiHost + '/riwayat-pengangkatan-perkerjaan/update',
};

export const KlaimKehadiranList = {
  GET_KLAIM_KEHADIRAN_LIST: config.apiHost + '/klaim-kehadiran/list',
  /**
   * @deprecated https://trello.com/c/mIgFlBDc
   **/
  GET_KUOTA_KEHADIRAN_SUBMIT: config.apiHost + '/klaim-kehadiran/stat-pengajuan',
  POST_KLAIM_KEHADIRAN_POST: config.apiHost + '/klaim-kehadiran/insert',
  POST_KLAIM_KEHADIRAN_UPDATE: config.apiHost + '/klaim-kehadiran/update',
  GET_KLAIM_KEHADIRAN_INFO: config.apiHost + '/klaim-kehadiran/info',
};

export const LogHarianAPI = {
  GET_LOG_HARIAN_MONTH: config.apiHost + '/dailylog/list/month',
  GET_LOG_HARIAN_WEEK: config.apiHost + '/dailylog/list/week',
  GET_LOG_HARIAN_LIS_WEEK_V2: config.apiHost + '/dailylog/list/week/v2',
  POST_LOG_HARIAN_DELETE: config.apiHost + '/dailylog/delete',
  POST_LOG_HARIAN_INSERT: config.apiHost + '/dailylog/insert',
  POST_LOG_HARIAN_UPDATE: config.apiHost + '/dailylog/update',
  GET_LOG_HARIAN_PEGAWAI: config.apiHost + '/dailylog/pegawai/statistic',
};

export const PresensiAPI = {
  PRESENSI_SHIFT_DATE_LIST: config.apiHost + '/presensi-shift-date/list',
  PRESENSI_SHIFT_DATE_INSERT: config.apiHost + '/presensi-shift-date/insert',
  PRESENSI_SHIFT_DATE_UPDATE: config.apiHost + '/presensi-shift-date/update',
  PRESENSI_SHIFT_DATE_DELETE: config.apiHost + '/presensi-shift-date/delete',
  PRESENSI_SHIFT_LIST: config.apiHost + '/presensi-shift/list',
};

export const PeningkatanKompAPI = {
  GET_PENINGKATAN_KOMP_LIST: config.apiHost + '/peningkatan-kompetensi/list',
  GET_PENINGKATAN_KOMP_DETAIL: config.apiHost + '/peningkatan-kompetensi/detail',
  POST_PENINGKATAN_KOMP_INSERT: config.apiHost + '/peningkatan-kompetensi/insert-per-peg',
  POST_PENINGKATAN_KOMP_UPDATE: config.apiHost + '/peningkatan-kompetensi/update',
  POST_PENINGKATAN_KOMP_DELETE: config.apiHost + '/peningkatan-kompetensi/delete',
  POST_PENINGKATAN_KOMP_INSERT_MODAL: config.apiHost + '/peningkatan-kompetensi/insert',
};

export const PresensiShiftPegawaiAPI = {
  PRESENSI_SHIFT_PEGAWAI_LIST: config.apiHost + '/presensi-shift-pegawai/list',
  PRESENSI_SHIFT_PEGAWAI_INSERT: config.apiHost + '/presensi-shift-pegawai/insert',
  PRESENSI_SHIFT_PEGAWAI_UPDATE: config.apiHost + '/presensi-shift-pegawai/update',
  PRESENSI_SHIFT_PEGAWAI_DELETE: config.apiHost + '/presensi-shift-pegawai/delete',
  PRESENSI_SHIFT_PEGAWAI_BULK: config.apiHost + '/presensi-shift-pegawai/bulk-insert',
};

export const KeuanganDinasAPI = {
  GET_DETAIL_PEMBAYARAN: config.apiHost + '/dinas/list-detail-data-pembayaran',
  GET_TEMPLATE_PEMBAYARAN: config.apiHost + '/dinas/download/template-pembayaran',
  // POST_DATA_PEMBAYARAN: config.apiHost + '/dinas/upload-data-pembayaran',
  GET_TANGGAL_PEMBAYARAN: config.apiHost + '/dinas/tanggal-pembayaran',
  POST_DATA_PEMBAYARAN: config.apiHost + '/dinas/insert-data-pembayaran',
  POST_BUKTI_BAYAR: config.apiHost + '/dinas/buktibayar',
  POST_BUKTI_TANGGUNGJAWAB: config.apiHost + '/dinas/buktitanggungjawab',
  POST_UPDATE_STATUS_PEMBAYARAN: config.apiHost + '/dinas/update-status-pembayaran',
  GET_PEFORMA_PEGAWAI: config.apiHost + '/dinas/performa/summary',
};

export const CutiAPI = {
  POST_CUTI: config.apiHost + '/cuti/insert',
  PUT_CUTI: config.apiHost + '/cuti/update',
  GET_CUTI_LIST: config.apiHost + '/cuti/list',
  GET_CUTI_QUOTA: config.apiHost + '/cuti/stat-pengajuan',
};
