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
  REKAP_KEHADIRAN: 157,
  KLAIM_CUTI: 159,
  LOG_HARIAN: 121,
  SHIFT: 122,
  LIBUR_RAMADHAN: 123,
  ROLE_USER: 124,
  JADWAL_CUTI: 172,
  BACKDOOR_PRESENSI: 174,
  PETA_ORGANISASI: 170,
  PARENT_SIDE_MENU_DINAS: 153,
  PARENT_SIDE_MENU_PEGAWAI: 154,
  PARENT_SIDE_MENU_KEHADIRAN: 155,
  PARENT_SIDE_MENU_MASTER: 156,
  PARENT_SIDE_STRUKTUR_ORGANISASI: 168,
  PARENT_SIDE_MENU_REKAP_PRESENSI: 175,
};

export const UserNavigationList: Navigation[] = [
  { name: 'Biodata', href: '/pegawai/biodata', id: PUBLIC },
  { name: 'Ubah Foto Profil', href: '#', id: PUBLIC },
  { name: 'Ubah Kata Sandi', href: '/changepassword', id: PUBLIC },
  { name: 'Keluar', href: '/logout', id: PUBLIC },
];

// 153	Parent Side Menu Dinas
// 154	Parent Side Menu Pegawai
// 155	Parent Side Menu Kehadiran
// 156	Parent Side Menu Master

// 157	Side Menu Rekap Kehadiran
// 158	Resource Group - Side Menu Rekap Kehadiran
// 159	Side Menu Klaim Cuti
// 160	Resource Group - Side Menu Klaim Cuti

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
        id: NavigationId.PARENT_SIDE_MENU_DINAS,
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
        id: NavigationId.PARENT_SIDE_MENU_KEHADIRAN,
        name: 'Kehadiran',
        childMenu: [
          {
            id: NavigationId.REKAP_KEHADIRAN,
            name: 'Daftar Transaksi',
            href: '/kepegawaian/daftar-transaksi',
          },
          {
            id: NavigationId.REKAP_KEHADIRAN,
            name: 'Rekap Kehadiran',
            href: '/kepegawaian/rekap-kehadiran',
          },
          // {
          //   id: NavigationId.REKAP_KEHADIRAN,
          //   name: 'Rekap Presensi',
          //   href: '/kepegawaian/rekap-presensi',
          // },
          {
            id: NavigationId.JADWAL_CUTI,
            name: 'Jadwal Cuti',
            href: '/kepegawaian/jadwal-cuti',
          },
          {
            id: NavigationId.KEHADIRAN,
            name: 'Klaim Kehadiran',
            href: '/kepegawaian/kehadiran',
          },
          {
            id: NavigationId.BACKDOOR_PRESENSI,
            name: 'Backdoor',
            href: '/kepegawaian/backdoor',
          },
          {
            id: NavigationId.KLAIM_CUTI,
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
        id: NavigationId.PARENT_SIDE_STRUKTUR_ORGANISASI,
        name: 'Struktur Organisasi',
        childMenu: [
          {
            id: NavigationId.PETA_ORGANISASI,
            name: 'Peta Organisasi',
            href: '/struktur-organisasi/peta-organisasi',
          },
        ],
      },
      {
        id: NavigationId.PARENT_SIDE_MENU_MASTER,
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
