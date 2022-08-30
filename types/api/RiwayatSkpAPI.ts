import { Status } from '../Common';

export interface GetRiwayatSkpListReq {
  pegawai_id?: number;
}

export interface GetRiwayatSkpListRes {
  status: Status;
  data: RiwayatSkpListData[];
}

export interface RiwayatSkpListData {
  riwayat_id: number;
  pegawai_id: number;
  tahun: number;
  nilai_ppk: number;
  nilai_skp: number;
  nilai_perilaku: number;
  files: {
    document_uuid: string;
    document_name: string;
  }[];
}

export interface PostRiwayatSkpInsertReq {
  pegawai_id?: number;
  tahun: number;
  nilai_ppk: number;
  nilai_skp: number;
  nilai_perilaku: number;
  files: DocumentData[];
}

export interface PostRiwayatSkpInsertRes {
  status: Status;
  data: string;
}

export interface DocumentData {
  document_uuid: string;
  document_name: string;
}

export interface PostRiwayatSkpUpdateReq {
  riwayat_id?: number;
  pegawai_id?: number;
  tahun: number;
  nilai_ppk: number;
  nilai_skp: number;
  nilai_perilaku: number;
  files: DocumentData[];
}

export interface PostRiwayatSkpUpdateRes {
  status: Status;
  data: string;
}

export interface PostRiwayatSkpDeleteReq {
  pegawai_id: number;
  riwayat_id: number;
}

export interface PostRiwayatSkpDeleteRes {
  status: Status;
  data: string;
}
