import { Status } from '../Common';

export interface GetRiwayatPendidikanListReq {
  pegawai_id?: number;
}

export interface GetRiwayatPendidikanListRes {
  status: Status;
  data: RiwayatPendidikanListData[];
}

export interface RiwayatPendidikanListData {
  riwayat_id: number;
  pegawai_id: number;
  jenjang_id: number;
  jenjang_str: string;
  prodi: string;
  pt: string;
  tanggal_lulus: string;
  no_ijazah: string;
  is_ijazah_terakhir: boolean;
  is_ijazah_cpns: boolean;
  verified_by_bkn: string;
  files: any[];
  created_at: string;
  created_by: string;
}

export interface PostRiwayatPendidikanUpdateReq {
  riwayat_id: number;
  pegawai_id: number;
  jenjang_id: number;
  prodi: string;
  pt: string;
  tanggal_lulus: string;
  no_ijazah: string;
  is_ijazah_terakhir: boolean;
  is_ijazah_cpns: boolean;
  files: DocumentData[];
}

export interface DocumentData {
  document_uuid: string;
  document_name: string;
}

export interface PostRiwayatPendidikanUpdateRes {
  status: Status;
  data: string;
}

export interface PostRiwayatPendidikanInsertReq {
  pegawai_id: number;
  jenjang_id: number;
  prodi: string;
  pt: string;
  tanggal_lulus: string;
  no_ijazah: string;
  is_ijazah_terakhir: boolean;
  is_ijazah_cpns: boolean;
  files: DocumentData[];
}

export interface PostRiwayatPendidikanInsertRes {
  status: Status;
  data: string;
}

export interface GetRiwayatPendidikanDetailReq {
  id: number;
}

export interface GetRiwayatPendidikanDetailRes {
  status: Status;
  data: RiwayatPendidikanDetailData;
}

export interface RiwayatPendidikanDetailData {
  pegawai_id: number;
  jenjang_id: number;
  jenjang_str: string;
  prodi: string;
  pt: string;
  tanggal_lulus: string;
  no_ijazah: string;
  is_ijazah_terakhir: boolean;
  is_ijazah_cpns: boolean;
  files: DocumentData[];
}

export interface PostRiwayatPendidikanDeleteReq {
  riwayat_id: number;
}

export interface PostRiwayatPendidikanDeleteRes {
  status: Status;
  data: string;
}
