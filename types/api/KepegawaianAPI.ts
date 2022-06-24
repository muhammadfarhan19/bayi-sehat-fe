import { Pagination, Status } from '../Common';

export interface GetPegawaiListReq {
  unit_kerja_id?: string;
  nama?: string;
  tipe_jabatan?: string;
  jabatan?: string;
  page: number;
  per_page: number;
}

export interface GetPegawaiListRes {
  status: Status;
  data: GetPegawaiListData;
}

export interface GetPegawaiListData {
  list: {
    golongan: string;
    jabatan: string;
    name: string;
    nip: string;
    pegawai_id: number;
    tipe_jabatan: string;
    unit_kerja: string;
    user_id: number;
  }[];
  pagination: Pagination;
}
