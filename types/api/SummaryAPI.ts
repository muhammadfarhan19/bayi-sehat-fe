import { Pagination, Status } from '../Common';

export interface SummaryReq {
  search?: string;
  unit_kerja?: string;
  kode_transaksi: string;
  type: string;
  page: number;
  per_page: number;
}

export interface SummaryRes {
  status: Status;
  data: SummaryListData;
}

export interface SummaryListData {
  list: {
    nip: string;
    badge_number: string;
    name: string;
    lingkup_koordinasi: string;
    jumlah_tk: string;
    detail_tanggal_tk: string;
    percent_telat: string;
    percent_psw: string;
    percent_tk: string;
    kumulatif_jam_telat: string;
    kumulatif_jam_psw: string;
  }[];
  pagination: Pagination;
}

export interface SummaryDownloadReq {
  kode_transaksi: string;
}

export interface SummaryDownloadRes {
  status: string;
  data: string;
}
