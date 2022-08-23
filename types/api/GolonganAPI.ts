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
  tipe_kp_str: string;
  tipe_kp: number;
  golongan: string;
  tmt: string;
  masa_kerja: string;
  masa_jabatan: string;
  verified_hr: number;
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
  tipe_kp: number;
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

export interface PostRiwayatGolonganInsertReq {
  employee_id: number;
  golongan_id: number;
  tanggal_mulai: string;
  tipe_kp: number;
  files: {
    document_uuid: string;
    document_name: string;
  }[];
  masa_jabatan: string;
}

export interface PostRiwayatGolonganInsertRes {
  status: Status;
  data: string;
}

export interface MasterJenisKp {}
