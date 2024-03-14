import { Pagination, Status } from '../Common';

export interface GetPegawaiListReq {
  gender?: number;
  jabatan?: string;
  jenjang_id?: number;
  jabatan_id?: number;
  nama?: string;
  range_umur?: string;
  status_cpns: number[];
  tipe_jabatan?: string;
  unit_kerja_id?: string | null | number;
  page: number;
  per_page: number;
  status_kepegawaian: string;
}

export interface GetPegawaiListRes {
  status: Status;
  data: GetPegawaiListData;
}

export interface GetPegawaiListData {
  list: {
    user_id: number;
    pegawai_id: number;
    nip: string;
    name: string;
    unit_kerja: string;
    unit_kerja_id: number;
    golongan: string;
    tipe_jabatan: string;
    jabatan: string;
    status_cpns: number;
    status_kepegawaian: number;
    gender_id: number;
    gender: string;
    tgl_lahir: string;
    usia: string;
    sisa_cuti: number;
    badge_number: string;
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
  jabatan_id?: number;
  jabatan?: string;
  unit_kerja_id: number;
  jumlah_anak: number;
  badge_number: string;
}

export interface PostPegawaiInsertRes {
  status: Status;
  data: string;
  error_code: string;
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
  liburan_day: LiburanDayData[];
}

export interface Presensi {
  presensi_id: number;
  list_dinas: Dinas[];
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

export interface GetPegawaiStatisticListReq {
  unit_kerja_id: number | null;
  golongan_id: number;
  page: number;
  per_page: number;
}

export interface GetPegawaiStatisticListRes {
  status: string;
  data: {
    list: {
      pegawai_id?: number;
      user_id: number;
      nip: string;
      nama: string;
      golongan_id: number;
      golongan: string;
      unit_kerja_id: number;
      unit_kerja: string;
      pangkat: string;
      tmt_golongan: string;
    }[];
    pagination: Pagination;
  };
}

export interface GetPresensiPegawaiSummaryReq {
  pegawai_id?: number;
  month?: number;
  year?: number;
}

export interface GetPresensiPegawaiSummaryRes {
  status: string;
  data: {
    masuk: string;
    dinas: string;
    terlambat: string;
    pulang_terlambat: string;
    terlambat_pulang_awal: string;
    tidak_hadir: string;
    total_kali_tk: string;
    total_kali_terlambat: string;
    total_menit_terlambat: string;
    total_kali_psw: string;
    total_menit_psw: string;
    total_kali_lupa_absen_datang: string;
    total_kali_lupa_absen_pulang: string;
    total_presentase_pengurang_kehadiran: number;
  };
}

export interface PostStatusKepegawaianReq {
  pegawai_id: number;
  status_kepegawaian: number;
}

export interface PostStatusKepegawaianRes {
  status: Status;
  data: string;
}

export interface UpdatePegawaiInfoReq {
  pegawai_id: number;
  user_id: number;
  golongan_id: number;
  jabatan_id: number;
  karpeg: string;
  karpeg_file: [
    {
      document_uuid: string;
      document_name: string;
    }
  ];
  masa_kerja_kepangkatan: string;
  status_cpns: number;
  status_kepegawaian: number;
  unit_kerja_id: number;
  nip: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  tmt_cpns: string;
  tmt_golongan: string;
}

export interface UpdatePegawaiInfoRes {
  status: Status;
  data: string;
}

export interface PegawaiData {
  user_id: number;
  pegawai_id: number;
  nip: string;
  name: string;
  unit_kerja: string;
  unit_kerja_id: number;
  golongan: string;
  tipe_jabatan: string;
  jabatan: string;
  status_cpns: number;
  gender_id: number;
  gender: string;
  tgl_lahir: string;
  usia: string;
  sisa_cuti: number;
}

export interface LiburanDayData {
  date: string;
  libur_name: string;
}

export interface PostResetPasswordReq {
  nip: string;
  pegawai_id: number;
}

export interface PostResetPasswordRes {
  status: Status;
  data: string;
}
