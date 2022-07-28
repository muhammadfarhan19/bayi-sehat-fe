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

export interface PostPegawaiInsertReq {
  nip: string;
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: number;
  status_menikah: number;
  ktp: string;
  email: string;
  alamat: string;
  npwp: string;
  bpjs: string;
  status_cpns: number;
  status_kepegawaian: number;
  tmt_cpns: string;
  tmt_golongan: string;
  golongan_id: number;
  karpeg: string;
  jabatan_id: number;
  unit_kerja_id: number;
  jumlah_anak: number;
}

export interface PostPegawaiInsertRes {
  status: Status;
  data: string;
}
