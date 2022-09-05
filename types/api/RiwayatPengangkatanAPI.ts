import { DocumentFile, Status } from '../Common';

export interface PostRiwayatPengangkatanDeleteReq {
  riwayat_id: number;
}

export interface PostRiwayatPengangkatanDeleteRes {
  status: Status;
  data: string;
}

export interface GetRiwayatPengangkatanDetailReq {
  riwayat_id: number;
}

export interface GetRiwayatPengangkatanDetailRes {
  status: string;
  data: RiwayatPengangkatanDetailData;
}

export interface RiwayatPengangkatanDetailData {
  riwayat_id: number;
  pegawai_id: number;
  no_sk: string;
  tanggal_sk: string;
  tmt_awal: string;
  tmt_akhir: string;
  jabatan: string;
  pejabatan_penandatangan: string;
  jabatan_penandatangan: string;
  unit_kerja: string;
  is_unit_kerja_pemerintah: boolean;
  files: DocumentFile[];
}

export interface GetRiwayatPengangkatanListReq {
  pegawai_id: number;
}

export interface GetRiwayatPengangkatanListRes {
  status: string;
  data: {
    total_masa_kerja: string;
    list: RiwayatPengangkatanData[];
  };
}

export interface RiwayatPengangkatanData {
  riwayat_id: number;
  pegawai_id: number;
  no_sk: string;
  tanggal_sk: string;
  tmt_awal: string;
  tmt_akhir: string;
  jabatan: string;
  pejabatan_penandatangan: string;
  jabatan_penandatangan: string;
  unit_kerja: string;
  is_unit_kerja_pemerintah: boolean;
  files: DocumentFile[];
}

export interface PostRiwayatPengangkatanInsertReq {
  pegawai_id: number;
  no_sk: string;
  tanggal_sk: string;
  tmt_awal: string;
  tmt_akhir: string;
  jabatan: string;
  pejabatan_penandatangan: string;
  jabatan_penandatangan: string;
  unit_kerja: string;
  is_unit_kerja_pemerintah: boolean;
  files: DocumentFile[];
}

export interface PostRiwayatPengangkatanInsertRes {
  status: Status;
  data: string;
}

export interface PostRiwayatPengangkatanUpdateReq {
  riwayat_id: number;
  pegawai_id: number;
  no_sk: string;
  tanggal_sk: string;
  tmt_awal: string;
  tmt_akhir: string;
  jabatan: string;
  pejabatan_penandatangan: string;
  jabatan_penandatangan: string;
  unit_kerja: string;
  is_unit_kerja_pemerintah: boolean;
  files: DocumentFile[];
}

export interface PostRiwayatPengangkatanUpdateRes {
  status: Status;
  data: string;
}
