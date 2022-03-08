import { Gender, Status, StatusMenikah } from './Common';

export interface GetUserProfileData {
  user_id: number;
  jenis_kelamin: Gender;
  status_menikah: StatusMenikah;
  jumlah_anak: number;
  ktp: string;
  email: string;
  alamat: string;
  npwp: string;
  bpjs: string;
}

export interface GetUserPersonalPegawaiData {
  user_id: number;
  nip: string;
  name: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  tmt_cpns: string;
  status_cpns: number;
  jabatan: string;
  unit_kerja: string;
  golongan: string;
  tmt_golongan: string;
}

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

export interface GetUserPersonalPegawaiRes {
  status: Status;
  data: GetUserPersonalPegawaiData;
}

export interface PutUserPasswordReq {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface PutUserPasswordRes {
  status: Status;
  data: null | string;
  error_message?: string;
}
