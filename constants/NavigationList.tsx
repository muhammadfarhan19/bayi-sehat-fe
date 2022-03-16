import { Navigation } from '../components/shared/MainLayout/NavigationProps';

const UNKNOWN = 0;
export const NavigationId = {
  BERANDA: 1,
  KEPEGAWAIAN: 2,
  DATA_PEGAWAI: 3,
  DAFTAR_JABATAN: 4,
  PETA_JABATAN: 5,
};

export const UserNavigationList: Navigation[] = [
  { name: 'Biodata', href: '/biodata', id: UNKNOWN },
  { name: 'Ubah Kata Sandi', href: '/changepassword', id: UNKNOWN },
  { name: 'Keluar', href: '/logout', id: UNKNOWN },
];

export const NavigationList: Navigation[] = [
  {
    id: NavigationId.KEPEGAWAIAN,
    name: 'Beranda',
    href: '/kepegawaian',
  },
  {
    id: NavigationId.KEPEGAWAIAN,
    name: 'Kepegawaian',
    childMenu: [
      {
        id: NavigationId.DATA_PEGAWAI,
        name: 'Data Pegawai',
        href: '/kepegawaian/data-pegawai',
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
];
