import { Status } from '../Common';

export interface GetRekapReq {
  page: number;
  per_page: number;
  isi_penugasan?: string;
  jenis_dinas_id?: number;
  unit_kerja_id?: number;
  tgl_mulai?: string;
  tgl_selesai?: string;
}

export interface RekapData {
  list: {
    dinas_id: number;
    no_sp: number;
    unit_kerja_str: string;
    tgl_mulai: number;
    tgl_selesai: number;
    jenis_dinas: string;
    isi_penugasan: string;
  }[];
  pagination: {
    total_page: number;
    total_data: number;
  };
}

export interface GetRekapnRes {
  status: string;
  data: RekapData;
}

export interface GetRekapDetailReq {
  dinas_id: number;
}

export interface GetRekapDetailRes {
  status: Status;
  data: RekapDetailData;
}

export interface RekapDetailData {
  dinas_id: number;
  unit_kerja_str: string;
  no_sp: string;
  tgl_surat: string;
  jenis_dinas: string;
  tgl_mulai: string;
  tgl_selesai: string;
  lokasi: string;
  isi_penugasan: string;
  surat_tugas: DocumentData[];
  pegawai: PegawaiData[];
}

export interface DocumentData {
  document_uuid: string;
  document_name: string;
}

export interface PegawaiData {
  pegawai_id: number;
  nama_pegawai: string;
  nip: string;
  unit_kerja_str: string;
  tgl_mulai: string;
  tgl_selesai: string;
  flag: number;
}


export interface JadwalDinasPegawai{
  pegawai_id : number,
  tgl_mulai: string,
  tgl_selesai:string
}

export interface JadwalDinasStatus{
  status:Status
}

export interface GetAvailabilityReq {
  pegawai_id: number;
  tgl_mulai?: string;
  tgl_selesai?: string;
}

export interface AvailabilityData {
  data: {
    tgl_available: string[];
    flag: number;
  };
}

export interface GetAvailabilityRes {
  status: string;
  data: AvailabilityData;
}

export interface PostDinasDeleteReq {
  dinas_id: number;
}

export interface PostDinasDeleteRes {
  status: Status;
  data: string;
}
