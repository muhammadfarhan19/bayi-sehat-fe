import { Status } from '../Common';

export interface GetRiwayatDiklatListReq {
  pegawai_id?: number;
}

export interface GetRiwayatDiklatListRes {
  status: Status;
  data: RiwayatDiklatListData[];
}

export interface RiwayatDiklatListData {
  riwayat_id: number;
  pegawai_id: number;
  jenis_diklat_id: number;
  jenis_diklat_str: string;
  nama_diklat: string;
  penyelenggara: string;
  no_sertifikat: string;
  lokasi: string;
  keterangan: string;
  tgl_awal_acara: string;
  tgl_akhir_acara: string;
  files: string;
  created_at: string;
  created_by: string;
}

export interface GetRiwayatDiklatDetailReq {
  id: number;
}

export interface GetRiwayatDiklatDetailRes {
  status: Status;
  data: RiwayatDiklatDetailData;
}

export interface RiwayatDiklatDetailData {
  riwayat_id: number;
  pegawai_id: number;
  jenis_diklat_id: number;
  jenis_diklat_str: string;
  nama_diklat: string;
  penyelenggara: string;
  no_sertifikat: string;
  lokasi: string;
  keterangan: string;
  tgl_awal_acara: string;
  files: DocumentData[];
  tgl_akhir_acara: string;
  created_at: string;
  created_by: string;
}

export interface PostRiwayatDiklatInsertReq {
  pegawai_id?: number;
  jenis_diklat_id: number;
  nama_diklat: string;
  penyelenggara: string;
  no_sertifikat: string;
  lokasi: string;
  keterangan: string;
  tgl_awal_acara: string;
  tgl_akhir_acara: string;
  files: DocumentData[];
}

export interface PostRiwayatDiklatInsertRes {
  status: Status;
  data: string;
}

export interface PostRiwayatDiklatUpdateReq {
  riwayat_id: number;
  pegawai_id?: number;
  jenis_diklat_id: number;
  nama_diklat: string;
  penyelenggara: string;
  no_sertifikat: string;
  lokasi: string;
  keterangan: string;
  tgl_awal_acara: string;
  tgl_akhir_acara: string;
  files: DocumentData[];
}

export interface DocumentData {
  document_uuid: string;
  document_name: string;
}

export interface PostRiwayatDiklatUpdateRes {
  status: Status;
  data: string;
}

export interface PostRiwayatDiklatDeleteReq {
  riwayat_diklat_id: number;
}

export interface PostRiwayatDiklatDeleteRes {
  status: Status;
  data: string;
}
