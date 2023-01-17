export interface PostCutiReq {
  pegawai_id: number;
  tanggal_klaim: string;
  jenis_pengajuan: number;
  catatan: string;
  files: [
    {
      document_uuid: string;
      document_name: string;
    }
  ];
}

export interface PostCutiRes {
  status: string;
  data: string;
}

export interface GetCutiReq {
  pegawai_id: number;
}

export interface GetCutiListRes {
  list: GetCutiListData[];
  pagination: {
    total_data: number;
    total_page: number;
  };
}

export interface GetCutiListData {
  id: number;
  pegawai_id: number;
  nama_pegawai: string;
  tanggal: string;
  type: number;
  note: string;
  admin_note: string;
  status: number;
  files: [
    {
      document_uuid: string;
      document_name: string;
    }
  ];
}

export interface GetQuotaPengajuanRes {
  sisa_pengajuan: number;
  max_pengajuan: number;
}

export interface PutCutiReq {
  id: number;
  status: number;
  alasan: string;
}

export interface GetCutiListParams {
  Peg_id?: number;
  user_id?: number;
  Alasan?: string;
  tgl_mulai?: string;
  tgl_selesai?: string;
  Unit_kerja_id?: number;
  page: number;
  per_page: number;
  status?: number;
  nama?: string;
}
