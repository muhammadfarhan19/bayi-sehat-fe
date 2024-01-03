import { Status } from '../Common';

export interface PostCutiReq {
  pegawai_id: number;
  tanggal_klaim: string;
  jenis_pengajuan: number;
  tanggal_selesai: string;
  catatan: string;
  unit_kerja_id: number;
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
  tanggal_selesai: string;
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

export interface DelCutiReq {
  id: number;
}

export interface GetCutiListParams {
  Peg_id?: number;
  user_id?: number;
  Alasan?: string;
  tgl_mulai?: string;
  tgl_selesai?: string;
  unit_kerja_id?: number;
  page: number;
  per_page: number;
  status?: number;
  nama?: string;
}

export interface ExportCutiRes {
  status: Status;
}

export declare module SaldoCuti {
  interface Request {
    nama?: string;
    unit_kerja_id: number;
    status_cpns: number[];
  }

  interface Response {
    list: ListResponse[];
    pagination: {
      total_page: number;
      total_data: number;
    };
  }
  interface ListResponse {
    pegawai_id: number;
    nip: string;
    nama_pegawai: string;
    unit_kerja_id: number;
    unit_kerja_str: string;
    cuti_yang_diambil_2_tahun_lalu: number;
    cuti_yang_diambil_tahun_lalu: number;
    cuti_yang_diambil_tahun_ini: number;
    saldo_cuti_tahun_ini: number;
    perkiraan_saldo_cuti_tahun_depan: number;
  }
}
