import { File, Status } from '../Common';

export interface GetRiwayatGolonganListReq {
  pegawai_id?: number;
}

export interface GetRiwayatGolonganListRes {
  status: Status;
  data: RiwayatGolonganListData[];
}

export interface RiwayatGolonganListData {
  riwayat_id: number;
  pangkat: string;
  golongan: string;
  tmt: string;
  masa_kerja: string;
  masa_jabatan: string;
  files: File[];
}

export interface UpdateSuratKeputusanReq {
  riwayat_id: number;
  files: File[];
}

export interface UpdateSuratKeputusanRes {
  status: Status;
  data: string;
}

export interface UpdateRiwayatGolonganReq {
  riwayat_id: number;
  tanggal_mulai: string;
  files: {
    document_uuid: string;
    document_name: string;
  }[];
  masa_jabatan: string;
}

export interface UpdateRiwayatGolonganRes {
  status: Status;
  data: string;
}

export interface DeleteRiwayatGolonganReq {
  riwayat_id: number;
}

export interface DeleteRiwayatGolonganRes {
  status: Status;
  data: string;
}
