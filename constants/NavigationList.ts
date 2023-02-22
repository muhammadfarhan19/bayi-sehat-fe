import { Navigation } from '../components/shared/MainLayout/NavigationProps';

const PUBLIC = 0;
export const NavigationId = {
  ADMIN: 16,
  BERANDA: 15,
  KEPEGAWAIAN: 6,
  KEUANGAN: 14,
  KEPANGKATAN: 17,
  DINAS: 152,
  DATA_PEGAWAI: 114,
  MENU_PEGAWAI: 126,
  PENINGKATAN_KOMPETENSI: 115,
  DAFTAR_JABATAN: 116,
  PETA_JABATAN: 117,
  REKAP_DINAS: 118,
  DATA_DINAS: 119,
  KEHADIRAN: 120,
  LOG_HARIAN: 121,
  SHIFT: 122,
  LIBUR_RAMADHAN: 123,
  ROLE_USER: 124,
};

export const UserNavigationList: Navigation[] = [
  { name: 'Biodata', href: '/pegawai/biodata', id: PUBLIC },
  { name: 'Ubah Foto Profil', href: '#', id: PUBLIC },
  { name: 'Ubah Kata Sandi', href: '/changepassword', id: PUBLIC },
  { name: 'Keluar', href: '/logout', id: PUBLIC },
];

export const NavigationList: Navigation[] = [
  {
    id: PUBLIC,
    name: 'Beranda',
    childMenu: [
      {
        id: PUBLIC,
        name: 'Homepage',
        href: '/',
        selectedHref: ['/kepegawaian/rekap-dinas/detail'],
      },
      {
        id: PUBLIC,
        name: 'Data Pegawai',
        childMenu: [
          {
            id: PUBLIC,
            name: 'Biodata',
            href: '/pegawai/biodata',
          },
          {
            id: PUBLIC,
            name: 'Peningkatan Kompetensi',
            href: '/peningkatankompetensi',
          },
        ],
      },
      {
        id: PUBLIC,
        name: 'Kehadiran',
        childMenu: [
          {
            id: PUBLIC,
            name: 'Rekap Kehadiran',
            href: '/rekap-kehadiran',
          },
          {
            id: PUBLIC,
            name: 'Klaim Kehadiran',
            href: '/kehadiran',
          },
          {
            id: PUBLIC,
            name: 'Klaim Cuti',
            href: '/cuti',
          },
          {
            id: PUBLIC,
            name: 'Log Harian',
            href: '/log-harian',
          },
        ],
      },
    ],
  },
  {
    id: NavigationId.KEPEGAWAIAN,
    name: 'Kepegawaian',
    childMenu: [
      {
        id: NavigationId.KEPEGAWAIAN,
        name: 'Dashboard',
        href: '/kepegawaian',
      },
      {
        id: NavigationId.MENU_PEGAWAI,
        name: 'Pegawai',
        childMenu: [
          {
            id: NavigationId.DATA_PEGAWAI,
            name: 'Data Pegawai',
            href: '/kepegawaian/data-pegawai',
          },
          {
            id: NavigationId.PENINGKATAN_KOMPETENSI,
            name: 'Peningkatan Kompetensi',
            href: '/kepegawaian/peningkatan-kompetensi',
          },
          {
            id: NavigationId.DAFTAR_JABATAN,
            name: 'Daftar Jabatan',
            href: '/kepegawaian/daftar-jabatan',
          },
          {
            id: NavigationId.PETA_JABATAN,
            name: 'Peta Jabatan',
            href: '/kepegawaian/peta-jabatan',
          },
        ],
      },
      // {
      //   id: NavigationId.KEPEGAWAIAN,
      //   name: 'Kepangkatan',
      //   href: '/kepegawaian/kepangkatan',
      // },
      {
        id: NavigationId.REKAP_DINAS,
        name: 'Dinas',
        childMenu: [
          {
            id: NavigationId.REKAP_DINAS,
            name: 'Rekap Dinas',
            href: '/kepegawaian/rekap-dinas',
          },
          {
            id: NavigationId.DATA_DINAS,
            name: 'Data Dinas Pegawai',
            href: '/dinas/pegawai',
            selectedHref: ['/dinas/pegawai/detail'],
          },
        ],
      },
      {
        id: NavigationId.KEHADIRAN,
        name: 'Kehadiran',
        childMenu: [
          {
            id: NavigationId.KEHADIRAN,
            name: 'Rekap Kehadiran',
            href: '/kepegawaian/rekap-kehadiran',
          },
          {
            id: NavigationId.KEHADIRAN,
            name: 'Klaim Kehadiran',
            href: '/kepegawaian/kehadiran',
          },
          {
            id: NavigationId.KEHADIRAN,
            name: 'Klaim Cuti',
            href: '/kepegawaian/cuti',
          },
          {
            id: NavigationId.LOG_HARIAN,
            name: 'Log Harian',
            href: '/kepegawaian/log-harian',
          },
          {
            id: NavigationId.SHIFT,
            name: 'Shift',
            href: '/kepegawaian/shift',
          },
        ],
      },
      {
        id: NavigationId.LIBUR_RAMADHAN,
        name: 'Data Master',
        childMenu: [
          {
            id: NavigationId.LIBUR_RAMADHAN,
            name: 'Hari Libur dan Ramadhan',
            href: '/master/libur',
          },
          {
            id: NavigationId.ROLE_USER,
            name: 'Role User',
            href: '/master/role-user',
          },
        ],
      },
    ],
  },
  {
    id: NavigationId.KEUANGAN,
    name: 'Keuangan',
    childMenu: [
      {
        id: NavigationId.KEUANGAN,
        name: 'Pembayaran',
        href: '/keuangan/daftar-dinas',
      },
    ],
  },
];
