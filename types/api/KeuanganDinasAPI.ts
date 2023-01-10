import { File, Status } from '../Common';

export interface GenericRes {
  data: string;
  status: Status;
}

export interface GetDetailPembayaranReq {
  dinas_id: number;
}

export interface GetDetailPembayaranRes {
  status: Status;
  data: PembayaranData[];
}

export interface PembayaranData {
  detail_pembayaran_dinas_id: number;
  dinas_id: number;
  ref_id: number;
  ref_type: string;
  nama: string;
  gol: string;
  tusi: string;
  honorarium_sumber: number;
  waktu: number;
  total_honorarium: number;
  uang_harian: number;
  transport: number;
  pajak: number;
  lainnya: number;
  jumlah_bersih: number;
  jumlah_pj: number;
  no_rekening: string;
  nama_bank: string;
  atas_nama_rekening: string;
  created_by: string;
  created_at: string;
}

export interface PostDinasBuktibayarReq {
  dinas_id: number;
  tgl_di_bayar: string;
  file_bukti_bayar: File[];
}

export interface PostDinasBuktibayarRes extends GenericRes {}

export interface PostDinasBuktitanggungjawabReq {
  dinas_id: number;
  tgl_pertanggung_jawaban: string;
  file_pertanggung_jawaban: File[];
}

export interface PostDinasBuktitanggungjawabRes extends GenericRes {}

export interface PostDataPembayaranReq {
  dinas_id: number;
  files: File[];
}

export interface PostDataPembayaranRes extends GenericRes {}

export interface PostUpdateStatusPembayaranReq {
  dinas_id: number;
  status_pembayaran: number;
}

export interface PostUpdateStatusPembayaranRes {
  status: Status;
  data: string;
}
