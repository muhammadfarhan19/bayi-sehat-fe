export interface GetGajiPegawaiReq {
  page: number;
  per_page: number;
  user_id: number;
  bulan: number;
  tahun: number;
}

export interface GetGajiPegawaiRes {
  data(data: any): unknown;
  list: {
    periode: string;
    nip: string;
    nama: string;
    badge_number: string;
    tingkat_pendidikan: string;
    jumlah_gaji_awal: number;
    jumlah_potongan_gaji: number;
    jumlah_gaji_bulan_ini: number;
    jabatan: string;
    unit_kerja: string;
    keterangan: string;
    jumlah_hari_bermasalah: number;
  }[];
  pagination: {
    total_page: number;
    total_data: number;
  };
}
export interface GetGajiHariBermasalahReq {
  page: number;
  per_page: number;
  user_id: number;
  bulan: number;
  tahun: number;
}
export interface GetGajiHariBermasalahRes {
  list: {
    priode: string;
    hari: string;
    tanggal: string;
    status_kehadiran: string;
    pengurangan: string;
  }[];
}
