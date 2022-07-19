import { Status } from '../Common';

export interface GetRiwayatPenghargaanListReq {
  pegawai_id?: number;
}

export interface GetRiwayatPenghargaanListRes {
  status: Status;
  data: PenghargaanList[];
}

export interface GetRiwayatPenghargaanDetailReq {
  id: number;
}

export interface PostPenghargaanUpdateReq {
  riwayat_id: number;
  pegawai_id: number;
  nama_penghargaan: string;
  tingkat_penghargaan: string;
  penyelenggara: string;
  keterangan: string;
  no_penghargaan: string;
  tgl_penghargaan: string;
  bukti_penghargaan: DocumentData[];
}

export interface PostPenghargaanInsertReq {
  pegawai_id: number;
  nama_penghargaan: string;
  tingkat_penghargaan: string;
  penyelenggara: string;
  keterangan: string;
  no_penghargaan: string;
  tgl_penghargaan: string;
  bukti_penghargaan: DocumentData[];
}

export interface PostPenghargaanInsertRes {
  status: string;
  data: string;
}
export interface PostPenghargaanUpdateRes {
  status: string;
  data: string;
}

export interface PostRiwayatPenghargaanDeleteReq {
  riwayat_id: number;
}

export interface PostRiwayatPenghargaanDeleteRes {
  status: Status;
  data: string;
}

export interface PenghargaanList {
  riwayat_id: number;
  pegawai_id: number;
  nama_penghargaan: string;
  tingkat_penghargaan: string;
  penyelenggara: string;
  keterangan: string;
  no_penghargaan: string;
  tgl_penghargaan: string;
  bukti_penghargaan: DocumentData[];
}

export interface DocumentData {
  document_uuid: string;
  document_name: string;
}
