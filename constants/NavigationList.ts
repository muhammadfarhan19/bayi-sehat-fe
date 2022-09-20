import { Navigation } from '../components/shared/MainLayout/NavigationProps';

const PUBLIC = 0;
export const NavigationId = {
  ADMIN: 16,
  BERANDA: 15,
  KEPEGAWAIAN: 6,
  KEUANGAN: 14,
  KEPANGKATAN: 17,
};

export const UserNavigationList: Navigation[] = [
  { name: 'Biodata', href: '/', id: PUBLIC },
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
        name: 'Jadwal',
        href: '/',
      },
      {
        id: PUBLIC,
        name: 'Biodata',
        href: '/pegawai/biodata',
      },
      {
        id: PUBLIC,
        name: 'Kehadiran',
        childMenu: [
          {
            id: NavigationId.BERANDA,
            name: 'Klaim Kehadiran',
            href: '/kehadiran',
          },
          {
            id: NavigationId.BERANDA,
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
        id: NavigationId.KEPEGAWAIAN,
        name: 'Pegawai',
        childMenu: [
          {
            id: NavigationId.KEPEGAWAIAN,
            name: 'Data Pegawai',
            href: '/kepegawaian/data-pegawai',
          },
          {
            id: NavigationId.KEPEGAWAIAN,
            name: 'Daftar Jabatan',
            href: '/kepegawaian/daftar-jabatan',
          },
          {
            id: NavigationId.KEPEGAWAIAN,
            name: 'Peta Jabatan',
            href: '/kepegawaian/peta-jabatan',
          },
        ],
      },
      {
        id: NavigationId.KEPEGAWAIAN,
        name: 'Kepangkatan',
        href: '/kepegawaian/kepangkatan',
      },
      {
        id: NavigationId.KEPEGAWAIAN,
        name: 'Dinas',
        childMenu: [
          {
            id: NavigationId.KEPEGAWAIAN,
            name: 'Rekap Dinas',
            href: '/kepegawaian/rekap-dinas',
            selectedHref: ['/kepegawaian/rekap-dinas/detail'],
          },
          {
            id: NavigationId.KEPEGAWAIAN,
            name: 'Data Dinas Pegawai',
            href: '/dinas/pegawai',
            selectedHref: ['/dinas/pegawai/detail'],
          },
        ],
      },
      {
        id: NavigationId.KEPEGAWAIAN,
        name: 'Kehadiran',
        childMenu: [
          {
            id: NavigationId.KEPEGAWAIAN,
            name: 'Klaim Kehadiran',
            href: '/kepegawaian/kehadiran',
          },
          {
            id: NavigationId.KEPEGAWAIAN,
            name: 'Log Harian',
            href: '/kepegawaian/log-harian',
          },
        ],
      },
    ],
  },
];
