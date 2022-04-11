import { Pagination, Status } from '../Common';

export interface GetPegawaiListReq {
  unit_kerja?: string;
  nama?: string;
  tipe_jabatan?: string;
  jabatan: string;
  page: number;
  per_page: number;
}

export interface GetPegawaiListRes {
  status: Status;
  data: GetPegawaiListData;
}

export interface GetPegawaiListData {
  list: {
    user_id: number;
    nip: string;
    name: string;
    unit_kerja: string;
    golongan: string;
    tipe_jabatan: string;
    jabatan: string;
  }[];
  pagination: Pagination;
}
