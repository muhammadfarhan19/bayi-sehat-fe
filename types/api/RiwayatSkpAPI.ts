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

//Migration to V2 RiwayatSKP : POST | PUT | GET
// 25 Jan 2023 | BE Reza
export interface PostRiwayatSkpReq {
  pegawai_id: number;
  tahun: number;
  rating_hasil_kerja: string;
  rating_perilaku_kerja: string;
  predikat_kinerja_pegawai: string;
  files: [
    {
      document_uuid: string;
      document_name: string;
    }
  ];
}
export interface PutRiwayatSkpReq {
  riwayat_id: number;
  pegawai_id: number;
  tahun: number;
  rating_hasil_kerja: string;
  rating_perilaku_kerja: string;
  predikat_kinerja_pegawai: string;
  files: [
    {
      document_uuid: string;
      document_name: string;
    }
  ];
}

export interface RiwayatSkpData {
  riwayat_id: number;
  pegawai_id: number;
  tahun: number;
  rating_hasil_kerja: string;
  rating_perilaku_kerja: string;
  predikat_kinerja_pegawai: string;
  files: [
    {
      document_uuid: string;
      document_name: string;
    }
  ];
}

export interface PostDelRiwayatSkpReq {
  riwayat_id: number;
}
