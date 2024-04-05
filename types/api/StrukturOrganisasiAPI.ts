import { Pagination, Status } from '../Common';

export interface GetStrukturReq {
  page: number;
  per_page: number;
  unit_kerja_id?: number;
}

export interface GetStrukturRes {
  status: Status;
  data: StrukturData;
}

export interface DeleteStrukturDataReq {
  jabatan_struktural_id?: number;
  pegawai_id?: number;
}
export interface DeleteStrukturDataRes {
  status: Status;
  data: string;
}

export interface PutStrukturDataReq {
  id: number;
  pegawai_id: number;
  divisi: string;
}

export interface PutStrukturDataRes {
  status: Status;
  data: string;
}
export interface PostStrukturDataReq {
  pegawai_id: number;
  jabatan_id: number;
  unit_kerja_id: number;
  divisi: string;
  role: number;
}

export interface PostStrukturDataRes {
  status: Status;
  data: string;
}
export interface PostDetailStrukturDataReq {
  jabatan_struktural_pegawai_id: number;
  pegawai_id: number;
  role: number;
}

export interface PostDetailStrukturDataRes {
  status: Status;
  data: string;
}

export interface StrukturData {
  list: {
    id: number;
    peg_id: number;
    nama: string;
    unit_kerja_id: number;
    unit_kerja_str: string;
    jabatan_id: number;
    jabatan_str: string;
    divisi: string;
  }[];
  pagination: Pagination;
}

export interface GetDetailStrukturReq {
  id?: number;
}

export interface GetDetailStrukturRes {
  status: Status;
  data: DetailStrukturData;
}

export interface DetailStrukturData {
  id: number;
  pegawai_id: number;
  name: string;
  divisi: string;
  list_anggota: ListAnggota[];
}

export interface ListAnggota {
  id: number;
  peg_id: number;
  nama: string;
  unit_kerja_id: number;
  unit_kerja_str: number;
  divisi: string;
  divisi_id: number;
}

export const siteMapContents = [
  [
    {
      title: 'Akun',
      contents: [
        {
          name: 'Paket Berlangganan Aktif',
          href: '/profile?tab=Paket%20Berlangganan%20Aktif',
        },
        {
          name: 'Riwayat Transaksi',
          href: '/profile?tab=Riwayat%20Transaksi',
        },
        {
          name: 'Manajemen Perangkat',
          href: '/profile?tab=Manajemen%20Perangkat',
        },
        {
          name: 'Refferal',
          href: '/profile?tab=Referral',
        },
        {
          name: 'Akun Saya',
          href: '/profile',
        },
        {
          name: 'Beli Paket',
          href: '/purchase',
        },
        {
          name: 'Input Voucher',
          href: '/voucher',
        },
        {
          name: 'Benefit Kupon',
          href: '/coupons',
        },
      ],
    },
    {
      title: 'Favorit',
      contents: [
        {
          name: 'Favorit Saya',
          href: '/my-list?tab=Favorit%20Saya',
        },
        {
          name: 'VOD dan Paket Dibeli',
          href: '/my-list?tab=VOD%20dan%20Paket%20Dibeli',
        },
        {
          name: 'Lanjutkan Menonton',
          href: '/my-list?tab=Lanjutkan%20Menonton',
        },
      ],
    },
    {
      title: 'Kredensial',
      contents: [
        {
          name: 'Masuk',
          href: '/login?type=signin',
        },
        {
          name: 'Daftar',
          href: '/login?type=signup',
        },
        {
          name: 'Ubah Profile',
          href: '/profile/settings',
        },
        {
          name: 'Ubah Personalisasi',
          href: '/personalization?isEdit=true',
        },
        {
          name: 'Kontrol Orang Tua',
          href: '/profile/settings',
        },
        {
          name: 'Ubah Password',
          href: '/profile/settings',
        },
        {
          name: 'Lupa Password',
          href: '/forgot-password',
        },
      ],
    },
  ],
  [
    {
      title: 'Tentang Cubmu',
      contents: [
        {
          name: 'Syarat dan Ketentuan',
          href: '/terms-conditions',
        },
        {
          name: 'Kebijakan Privasi',
          href: '/terms-conditions',
        },
        {
          name: 'Kontak Kami',
          href: '/contact-us',
        },
      ],
    },
    {
      title: 'Radio Online',
      contents: [
        {
          name: 'Vision Radio 1',
          href: 'http://visionradio1.com',
        },
      ],
    },
  ],
  [
    {
      title: 'Artikel',
      contents: [
        {
          name: 'Artikel',
          href: '/articles',
        },
      ],
    },
  ],
];
