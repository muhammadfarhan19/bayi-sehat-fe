import { Pagination } from '../Common';

export interface ResumeGaji {
  kode_transaksi: string;
  page: number;
  per_page: number;
  type: string;
  month?: number;
  year?: number;
  unit_kerja?: string;
  search?: string;
}

export interface ResumeGajiList {
  list: {
    nip: string;
    nama: string;
    badge: string;
    gaji_utuh: number;
    jumlah_hari_bermasalah: number;
    jumlah_pengurangan: number;
    total_gaji: number;
    unit_kerja: string;
    kode_transaksi: string;
    type: string;
    month?: number;
    year?: number;
  }[];
  pagination: Pagination;
}

export interface UnitReq {
  kode_transaksi: string;
  page: number;
  unit_kerja: string;
  year: string;
}

export interface ExportData {
  unit_kerja: string;
  kode_transaki: string;
  search?: string;
  type: string;
}
