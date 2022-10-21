export interface GetUpcomingReq {
  pegawai_id?: number;
}

export interface Res {
  status: string;
  data: GetUpcomingData;
}

export type GetUpcomingData = Record<string, DinasData[]>;

export interface DinasData {
  dinas_id: number;
  no_sp: string;
  unit_kerja_str: string;
  tgl_mulai: string;
  tgl_selesai: string;
  jenis_dinas: string;
  isi_penugasan: string;
  pic_id: number;
  pic: string;
  surat_tugas: {
    document_uuid: string;
    document_name: string;
  }[];
}