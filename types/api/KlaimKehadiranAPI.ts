export interface GetKehadiranList {
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

export interface GetKehadiranDataList {
  list: [
    {
      id: number;
      user_id: number;
      nama: string;
      unit_kerja_id: number;
      unit_kerja_str: string;
      tanggal_klaim: string | any;
      jenis_pengajuan: string;
      alasan_klaim: string;
      status_klaim: number;
      status_klaim_str: string;
      alasan_tolak: string;
      files: [
        {
          document_uuid: string;
          document_name: string;
        }
      ];
    }
  ];
  pagination: {
    total_page: number;
    total_data: number;
  };
}

export interface PostKehadiranData {
  tanggal_klaim: string;
  jenis_pengajuan: string;
  alasan_klaim: string;
  // status:number;
  peg_id: number;
  files: [
    {
      document_uuid: string;
      document_name: string;
    }
  ];
}

export interface PostKehadiranReqData {
  status: string;
  data: string;
}

export interface GetMaxPengajuanDataReq {
  pegawai_id: number;
}

export interface GetMaxPengajuanDataList {
  sisa_pengajuan: number;
  max_pengajuan: number;
}

export interface PostUpdatePengajuanReq {
  id: number;
  status_klaim: number;
  alasan_tolak: string;
  user_id: number;
  jenis_pengajuan: string;
  tanggal_klaim: string;
}
