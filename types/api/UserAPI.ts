import { Agama, Gender, Status, StatusCpns, StatusMenikah } from '../Common';

export interface GetUserProfileData {
  agama: Agama;
  golongan_darah: '';
  alamat: string;
  bpjs: string;
  no_bpjs_kt: string;
  email: string;
  jenis_kelamin: Gender;
  jumlah_anak: number;
  ktp: string;
  npwp: string;
  status_menikah: StatusMenikah;
  user_id: number;
  uuid_ktp: {
    document_uuid: string;
    document_name: string;
  }[];
  uuid_bpjs: {
    document_uuid: string;
    document_name: string;
  }[];
  uuid_bpjs_kt: {
    document_uuid: string;
    document_name: string;
  }[];
  uuid_npwp: {
    document_uuid: string;
    document_name: string;
  }[];
  hp: string;
  uuid_rekening: {
    document_uuid: string;
    document_name: string;
  }[];
  nama_rekening: string;
  nomor_rekening: string;
  bank_id: number;
  bank_str: string;
}

export interface GetUserPersonalPegawaiData {
  golongan: string;
  jabatan: string;
  karpeg: string;
  karpeg_file: {
    document_uuid: string;
    document_name: string;
  }[];
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
  unit_kerja_id: number;
  user_id: number;
  golongan_id: number;
  status_kepegawaian: number;
  badge_number: string;
  updated_at_sk: string;
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
  status_cpns?: StatusCpns;
  jumlah_anak: number;
  nik: string;
  email: string;
  alamat: string;
  npwp: string;
  bpjs: string;
  uuid_ktp: {
    document_uuid: string;
    document_name: string;
  }[];
  uuid_bpjs: {
    document_uuid: string;
    document_name: string;
  }[];
  uuid_bpjs_kt?: {
    document_uuid: string;
    document_name: string;
  }[];
  uuid_npwp: {
    document_uuid: string;
    document_name: string;
  }[];
  hp: string;
  agama?: number;
  golongan_darah?: string;
  no_bpjs_kt?: string;
  nomor_rekening?: string;
  nama_rekening?: string;
  bank_id?: number;
  uuid_rekening?: [
    {
      document_uuid?: string;
      document_name?: string;
    }
  ];
}

export interface PostUserProfileRes {
  status: Status;
  data: null | string;
  error_message?: string;
}

export interface PostUserUpdateDataDiriPegawaiReq {
  pegawai_id: number;
  unit_kerja_id: number;
  nip: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  tmt_cpns: string;
  status_cpns: number;
  jabatan: number;
  tmt_golongan: string;
  pangkat: number;
  masa_kerja: string;
  masa_kerja_kepangkatan: string;
  custom_unit_kerja?: string;
  karpeg: string;
  custom_jabatan_name: string;
  karpeg_file: {
    document_uuid: string;
    document_name: string;
  }[];
}

export interface PostUserUpdateDataDiriPegawaiRes {
  status: Status;
  data: string;
}
