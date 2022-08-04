import { Status } from '../Common';

export interface GetJabatanDetailReq {
  id: number;
}

export interface JabatanDetailData {
  id: number;
  jabatan: string;
  jenis_jabatan: number;
  jenis_jabatan_str: string;
  kelas_jabatan: number;
  name: string;
}

export interface GetJabatanDetailRes {
  status: Status;
  data: JabatanDetailData;
}

export interface GetJabatanReq {
  page: number;
  per_page: number;
  jabatan?: string;
  jenis_jabatan?: number;
  kelas_jabatan?: number;
}

export interface JabatanData {
  list: {
    jabatan_id: number;
    name: string;
    jenis_jabatan: number;
    kelas_jabatan: number;
    jenis_jabatan_str: string;
  }[];
  pagination: {
    total_page: number;
    total_data: number;
  };
}

export interface JabatanDataDetail {
  data: {
    list: {
      jabatan_id: number;
      name: string;
      jenis_jabatan: number;
      kelas_jabatan: number;
      jenis_jabatan_str: string;
    }[];
    pagination: {
      total_page: number;
      total_data: number;
    };
  };
}

export interface GetJabatanRes {
  status: Status;
  data: JabatanData;
}

export interface UpdateJabatanReq {
  pegawai_id: number;
  jabatan_id: number;
  unit_kerja_id: number;
  tgl_pengangkatan: string;
  tgl_mulai: string;
  angka_kredit: number;
  surat_keputusan: {
    document_uuid: string;
    document_name: string;
  }[];
}

export interface UpdateJabatanRes {
  status: Status;
  data: string;
}

export interface GetRiwayatJabatanReq {
  pegawai_id?: number;
}

export interface GetRiwayatJabatanRes {
  status: string;
  data: RiwayatJabatanData[];
}

export interface RiwayatJabatanData {
  jabatan_pegawai_id: number;
  jenis_jabatan: string;
  nama_jabatan: string;
  masa_kerja: string;
  kumulatif: number;
  tmt: string;
  files: {
    document_uuid: string;
    document_name: string;
  }[];
}

export interface TambahJabatanReq {
  name: string;
  jenis_jabatan: number;
  kelas_jabatan: number;
  is_dikti: number;
}

export interface PostRiwayatJabatanDeleteReq {
  jabatan_pegawai_id: number;
}

export interface PostRiwayatJabatanDeleteRes {
  status: Status;
  data: string;
}

export interface PostRiwayatJabatanUpdateReq {
  jabatan_pegawai_id: number;
  jabatan_id: number;
  unit_kerja_id: number;
  tgl_pengangkatan: string;
  tgl_mulai: string;
  angka_kredit: number;
  surat_keputusan: {
    document_uuid: string;
    document_name: string;
  }[];
}

export interface PostRiwayatJabatanUpdateRes {
  status: Status;
  data: string;
}
