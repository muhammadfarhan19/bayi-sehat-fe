import { Status } from '../Common';

export interface PresensiShiftPegawaiDetailReq {
  pegawai_id: number;
}

export interface PresensiShiftPegawaiData {
  id: number;
  pegawai_id: number;
  tanggal: string;
  shift_id: number;
  remark: string;
}

export interface GetPresensiShiftPegawaiDetailRes {
  status: Status;
  data: PresensiShiftPegawaiData;
}

export interface PresensiShiftPegawaiInsertReq {
  pegawai_id: number;
  tanggal: string;
  shift_id: number;
  remark: string;
}

export interface PresensiShiftPegawaiInsertRes {
  status: Status;
  data: string;
}

export interface PresensiShiftPegawaiUpdateReq {
  id: number;
  pegawai_id: number;
  tanggal: string;
  shift_id: number;
  remark: string;
}

export interface PresensiShiftPegawaiUpdateRes {
  status: Status;
  data: string;
}

export interface PresensiShiftPegawaiDeleteReq {
  id: number;
}

export interface PresensiShiftPegawaiDeleteRes {
  status: Status;
  data: string;
}

export interface PresensiShiftPegawaiBulkReq {
  files: [
    {
      document_uuid: string;
      document_name: string;
    }
  ];
}

export interface PresensiShiftPegawaiBulkRes {
  status: Status;
  data: string;
}
