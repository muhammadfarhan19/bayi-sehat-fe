import { Pagination, Status } from '../Common';

export interface GetPegawaiListReq {
  unit_kerja_id?: string;
  nama?: string;
  tipe_jabatan?: string;
  jabatan?: string;
  is_ppnpn?: boolean;
  status_cpns: number[];
  page: number;
  per_page: number;
  status_cpns?: number;
}

export interface GetPegawaiListRes {
  status: Status;
  data: GetPegawaiListData;
}

export interface GetPegawaiListData {
  list: {
    golongan: string;
    jabatan: string;
    name: string;
    nip: string;
    pegawai_id: number;
    tipe_jabatan: string;
    unit_kerja: string;
    user_id: number;
  }[];
  pagination: Pagination;
}

export interface PostPegawaiInsertReq {
  nip: string;
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: number;
  status_menikah: number;
  ktp: string;
  email: string;
  alamat: string;
  npwp: string;
  bpjs: string;
  status_cpns: number;
  status_kepegawaian: number;
  tmt_cpns: string;
  tmt_golongan: string;
  golongan_id: number;
  karpeg: string;
  jabatan_id: number;
  unit_kerja_id: number;
  jumlah_anak: number;
}

export interface PostPegawaiInsertRes {
  status: Status;
  data: string;
}

export interface PostPegawaiKarpegUpdateReq {
  pegawai_id: number;
  karpeg: string;
  karpeg_file: {
    document_uuid: string;
    document_name: string;
  }[];
}

export interface PostPegawaiKarpegUpdateRes {
  status: Status;
  data: string;
}

export interface GetDinasPegawaiKalenderReq {
  pegawai_id: number;
  tgl_mulai: string;
  tgl_selesai: string;
}

export interface GetDinasPegawaiKalenderRes {
  status: string;
  data: DinasPegawaiKalenderData;
}

export interface DinasPegawaiKalenderData {
  list_presensi: Presensi[];
  list_dinas: Dinas[];
}

export interface Presensi {
  presensi_id: number;
  date: string;
  check_in: string;
  check_out: string;
  status: number;
  status_str: string;
}

export interface Dinas {
  dinas_id: number;
  no_sp: string;
  isi_penugasan: string;
  tgl_mulai: string;
  tgl_selesai: string;
  jenis_dinas: string;
  lokasi: string;
}
