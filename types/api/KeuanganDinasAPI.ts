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
}

export interface PostDinasBuktibayarRes extends GenericRes {}

export interface PostDinasBuktitanggungjawabReq {
  dinas_id: number;
  tgl_pertanggung_jawaban: string;
}

export interface PostDinasBuktitanggungjawabRes extends GenericRes {}

export interface PostDataPembayaranReq {
  dinas_id: number;
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

export interface GetTanggalPembayaranReq {
  dinas_id: number;
}

export interface TanggalPembayaranData {
  tanggal_request: string;
  tanggal_dibayarkan: string;
  tanggal_pertanggungjawaban: string;
}
export interface GetPeformaPegawaiData {
  total_dinas_proses: number;
  total_dinas: number;
  total_dinas_selesai: number;
  min_day_proses: number;
  max_day_proses: number;
  avg_day_proses: number;
}
