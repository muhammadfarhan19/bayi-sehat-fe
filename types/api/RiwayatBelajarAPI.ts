import { Status } from '../Common';

export interface GetRiwayatBelajarListReq {
  pegawai_id?: number;
}

export interface GetRiwayatBelajarListRes {
  status: Status;
  data: RiwayatBelajarListData[];
}

export interface RiwayatBelajarListData {
  riwayat_id: number;
  pegawai_id: number;
  jenis_belajar: number;
  status_riwayat_belajar: string;
  jenjang: string;
  nama_institusi: string;
  prodi: string;
  waktu: string;
  files: DocumentData[];
}

export interface PostRiwayatBelajarInsertReq {
  pegawai_id?: number;
  jenis_belajar: number;
  jenjang_id: number;
  nama_institusi: string;
  prodi: string;
  sumber_biaya: string;
  kota: string;
  lokasi: number;
  status_riwayat_belajar: number;
  tahun_mulai: string;
  tahun_selesai: string;
  files: DocumentData[];
}

export interface PostRiwayatBelajarInsertRes {
  status: Status;
  data: string;
}

export interface PostRiwayatBelajarUpdateReq {
  riwayat_id?: number;
  pegawai_id?: number;
  jenis_belajar: number;
  jenjang_id: number;
  nama_institusi: string;
  prodi: string;
  sumber_biaya: string;
  kota: string;
  lokasi: number;
  status_riwayat_belajar: number;
  tahun_mulai: string;
  tahun_selesai: string;
  files: DocumentData[];
}

export interface DocumentData {
  document_uuid: string;
  document_name: string;
}

export interface PostRiwayatBelajarUpdateRes {
  status: Status;
  data: string;
}

export interface PostRiwayatBelajarDeleteReq {
  riwayat_id: number;
}

export interface PostRiwayatBelajarDeleteRes {
  status: Status;
  data: string;
}

export interface GetRiwayatBelajarDetailReq {
  riwayat_id: number;
}

export interface GetRiwayatBelajarDetailRes {
  status: Status;
  data: RiwayatBelajarDetailData;
}

export interface RiwayatBelajarDetailData {
  riwayat_id: number;
  pegawai_id: number;
  jenis_belajar: number;
  jenjang_id: number;
  nama_institusi: string;
  prodi: string;
  sumber_biaya: string;
  kota: string;
  lokasi: number;
  status_riwayat_belajar: number;
  tahun_mulai: string;
  tahun_selesai: string;
  files: DocumentData[];
}
