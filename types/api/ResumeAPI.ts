import { Pagination, Status } from '../Common';

export interface ResumeReq {
  search?: string;
  unit_kerja?: string;
  kode_transaksi: string;
  type: string;
  page: number;
  per_page: number;
}

export interface ResumeRes {
  status: Status;
  data: ResumeListData;
}

export interface ResumeListData {
  list: {
    nip: string;
    nama: string;
    total_hari: number;
    hari_kerja: number;
    libur_bukan_hari_kerja: number;
    kehadiran: number;
    ketidakhadiran: number;
    total_alpha: number;
    detail_alpha: string;
    total_terlambat: number;
    total_jam_terlambat: number;
    total_pulang_awal: number;
    total_jam_pulang_awal: number;
    total_jam_kumulatif: number;
    total_ijin_terlambat: number;
    total_ijin_pulang: number;
    total_ijin_terlambat_pulang_awal: number;
    total_lupa_checkin: number;
    total_lupa_checkout: number;
    total_dinas: number;
    total_cuti_tahunan: number;
    total_cuti_alasan_penting: number;
    total_cuti_melahirkan: number;
    total_cuti_besar: number;
    total_cuti_sakit: number;
    total_cuti_sakit_1_sampai_6_bulan: number;
    total_cuti_besar_2_sampai_3_bulan: number;
    toal_cuti_luar_tanggungan_negara: number;
    total_cuti_sakit_lebih_6_bulan: number;
    pengurang_alpha: number;
    pengurang_cuti: number;
    pengurang_terlambat: number;
    pengurang_pulang_awal: number;
    pengurang_lupa_absen_datang: number;
    pengurang_lupa_absen_pulang: number;
    total_pengurang_kehadiran: number;
    gaji_utuh: number;
    jumlah_hari_bermasalah: number;
    detail_tanggal_bermasalah: number;
    jumlah_pengurangan: number;
    total_gaji: number;
  }[];
  pagination: Pagination;
}

export interface ResumeDownloadReq {
  kode_transaksi: string;
}

export interface ResumeDownloadRes {
  status: string;
  data: string;
}
