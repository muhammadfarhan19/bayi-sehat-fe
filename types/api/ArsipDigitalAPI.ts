import { Status } from '../Common';

export interface GetArsipDigitalListReq {
  user_id: number;
}

export interface GetArsipDigitalListRes {
  status: Status;
  data: ArsipDigitalListData[];
}

export interface ArsipDigitalListData {
  arsip_digital_id: number;
  pegawai_id: number;
  document_uuid: string;
  jenis_berkas_id: number;
  jenis_berkas_str: string;
  document_name: string;
  created_at: string;
}

export interface GetArsipDigitalDetailReq {
  arsip_digital_id: number;
}

export interface GetArsipDigitalDetailRes {
  status: Status;
  data: ArsipDigitalDetailData;
}

export interface ArsipDigitalDetailData {
  arsip_digital_id: number;
  pegawai_id: number;
  document_uuid: string;
  jenis_berkas_id: number;
  jenis_berkas_str: string;
  document_name: string;
  created_at: string;
}

export interface PostArsipDigitalInsertReq {
  pegawai_id: number;
  document_uuid: string;
  jenis_berkas_id: number;
  document_name: string;
}

export interface PostArsipDigitalInsertRes {
  status: Status;
  data: string;
}

export interface PostArsipDigitalUpdateReq {
  arsip_digital_id: number;
  pegawai_id: number;
  document_uuid: string;
  jenis_berkas_id: number;
  document_name: string;
}

export interface PostArsipDigitalUpdateRes {
  status: Status;
  data: string;
}

export interface PostArsipDigitalDeleteReq {
  arsip_digital_id: number;
}

export interface PostArsipDigitalDeleteRes {
  status: Status;
  data: string;
}
