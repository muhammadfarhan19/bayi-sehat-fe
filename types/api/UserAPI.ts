import { Gender, Status, StatusCpns, StatusMenikah } from '../Common';

export interface GetUserProfileData {
  alamat: string;
  bpjs: string;
  email: string;
  jenis_kelamin: Gender;
  jumlah_anak: number;
  ktp: string;
  npwp: string;
  status_menikah: StatusMenikah;
  user_id: number;
  uuid_file_ktp: string;
  uuid_file_bpjs: string;
  uuid_file_npwp: string;
  nomor_hp: string;
}

export interface GetUserPersonalPegawaiData {
  golongan: string;
  jabatan: string;
  karpeg: string;
  masa_kerja: string;
  masa_kerja_kepangkatan: string;
  nama: string;
  nip: string;
  pangkat: string;
  pegawai_id: number;
  status_cpns: StatusCpns;
  tanggal_lahir: string;
  tempat_lahir: string;
  tmt_cpns: string;
  tmt_golongan: string;
  unit_kerja: string;
  user_id: number;
}

export type GetUserProfileReq = {
  pegawai_id?: number;
};

export type GetUserProfileRes =
  | {
      status: Status.OK;
      data: GetUserProfileData;
    }
  | {
      status: Status.UNAUTHENTICATED;
      data: null;
    }
  | {
      status: Status.ERROR_DB;
      error_message: string;
    };

export type GetUserPersonalPegawaiReq = {
  pegawai_id?: number;
};

export interface GetUserPersonalPegawaiRes {
  status: Status;
  data: GetUserPersonalPegawaiData;
}

export interface PutUserPasswordReq {
  confirm_new_password: string;
  new_password: string;
  old_password: string;
}

export interface PutUserPasswordRes {
  status: Status;
  data: null | string;
  error_message?: string;
}

export interface PostUserProfileReq {
  pegawai_id: number;
  status_menikah: StatusMenikah;
  jumlah_anak: number;
  nik: string;
  email: string;
  alamat: string;
  npwp: string;
  bpjs: string;
  uuid_file_ktp: string;
  uuid_file_bpjs: string;
  uuid_file_npwp: string;
  nomor_hp: string;
}

export interface PostUserProfileRes {
  status: Status;
  data: null | string;
  error_message?: string;
}
