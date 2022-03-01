import { Navigation } from '../components/MainLayout/NavigationProps';

export const NavigationList: Navigation[] = [
  {
    name: 'Beranda',
    href: '/',
  },
  {
    name: 'Kepegawaian',
    childMenu: [
      {
        name: 'Data Pegawai',
        href: '/kepegawaian/data',
      },
      {
        name: 'Daftar Jabatan',
        href: '/kepegawaian/daftar',
      },
      {
        name: 'Peta Jabatan',
        href: '/kepegawaian/peta ',
      },
    ],
  },
];
