import { Status } from '../Common';

export interface GetRiwayatPendidikanListReq {
  pegawai_id?: number;
}

export interface GetRiwayatPendidikanListRes {
  status: Status;
  data: RiwayatPendidikanListData[];
}

export interface RiwayatPendidikanListData {
  riwayat_id: number;
  pegawai_id: number;
  jenjang_id: number;
  jenjang_str: string;
  prodi: string;
  pt: string;
  tanggal_lulus: string;
  no_ijazah: string;
  is_ijazah_terakhir: boolean;
  is_ijazah_cpns: boolean;
  files: any[];
  created_at: string;
  created_by: string;
}
