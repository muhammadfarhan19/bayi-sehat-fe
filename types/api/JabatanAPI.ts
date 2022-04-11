import { Status } from '../Common';

export interface GetJabatanDetailReq {
  id: number;
}

export interface JabatanDetailData {
  id: number;
  jabatan: string;
  jenis_jabatan: number;
  jenis_jabatan_str: string;
  kelas_jabatan: number;
  name: string;
}

export interface GetJabatanDetailRes {
  status: Status;
  data: JabatanDetailData;
}

export interface GetJabatanReq {
  page: number;
  per_page: number;
  jabatan?: string;
  jenis_jabatan?: number;
  kelas_jabatan?: number;
}

export interface JabatanData {
  list: {
    jabatan_id: number;
    name: string;
    jenis_jabatan: number;
    kelas_jabatan: number;
    jenis_jabatan_str: string;
  }[];
  pagination: {
    total_page: number;
    total_data: number;
  };
}

export interface GetJabatanRes {
  status: string;
  data: JabatanData;
}
