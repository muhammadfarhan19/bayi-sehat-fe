export interface GetIDPegawai {
  pegawai_id: number;
}

export interface GetHistoryPegawai {
  pegawai_id: number;
  status_lama: number;
  status_baru: number;
  updated_at: string;
  updated_by: string;
}
