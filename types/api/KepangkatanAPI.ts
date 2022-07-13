import { Status } from '../Common';

// export interface KepangkatanData {

// }

export interface GetKepangkatanList {
  status: Status;
  list: [
    {
      user_id: number;
      pegawai_id: number;
      nip: string;
      name: string;
      unit_kerja_id: string;
      unit_kerja: string;
      nomor_usul: string;
      golongan_id: number;
      golongan: string;
      tmt_mk_awal: string;
      tmt_mk_awal_period: string;
      tmt_mk_baru: string;
      tmt_mk_baru_period: string;
      notes: string;
      status: string;
    }
  ];
  pagination: {
    total_page: number;
    total_data: number;
  };
}

export interface Kepangkatan {
  page: number;
  per_page: number;
}
