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
