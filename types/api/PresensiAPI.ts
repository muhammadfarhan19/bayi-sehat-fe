import { Status } from '../Common';

export interface PostPresensiShiftDateListReq {
  is_libur: number;
  from: string;
  to: string;
}

export interface PostPresensiShiftDateListRes {
  status: string;
  data: PresensiShiftDateData[];
}

export interface PresensiShiftDateData {
  id: number;
  tanggal: string;
  shift_id: number;
  remark: string;
}

export interface PostPresensiShiftDateInsertReq {
  tanggal: string;
  shift_id: number;
  remark: string;
}

export interface PostPresensiShiftDateInsertRes {
  status: Status;
  data: string;
  error_message?: string;
}

export interface PostPresensiShiftDateUpdateReq {
  id: number;
  shift_id: number;
  remark: string;
  tanggal: string;
}

export interface PostPresensiShiftDateUpdateRes {
  status: Status;
  data: string;
  error_message?: string;
}

export interface PostPresensiShiftDateDeleteReq {
  id: number;
}

export interface PostPresensiShiftDateDeleteRes {
  status: Status;
  data: string;
}

export interface GetPresensiShiftListRes {
  status: Status;
  data: PresensiShiftData[];
}

export interface PresensiShiftData {
  id: number;
  nama_shift: string;
  shift_start: string;
  shift_end: string;
  jam_start_check_in: string;
  jam_start_check_out: string;
}
