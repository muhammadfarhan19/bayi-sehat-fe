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
  id: number;
}

export interface GetDetailStrukturRes {
  status: Status;
  data: DetailStrukturData;
}

export interface DetailStrukturData {
  id: number;
  divisi: string;
  list_anggota: ListAnggota[];
}

export interface ListAnggota {
  peg_id: number;
  nama: string;
  unit_kerja_id: number;
  unit_kerja_str: number;
  divisi: string;
}
