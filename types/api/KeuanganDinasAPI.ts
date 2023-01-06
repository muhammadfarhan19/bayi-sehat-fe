import { File, Status } from '../Common';

export interface GenericRes {
  data: string;
  status: Status;
}

export interface GetDetailPembayaranReq {
  dinas_id: number;
}

export interface GetDetailPembayaranRes {
  status: Status;
}

export interface PostDinasBuktibayarReq {
  dinas_id: number;
  tgl_di_bayar: string;
  file_bukti_bayar: File[];
}

export interface PostDinasBuktibayarRes extends GenericRes {}

export interface PostDinasBuktitanggungjawabReq {
  dinas_id: number;
  tgl_pertanggung_jawaban: string;
  file_pertanggung_jawaban: File[];
}

export interface PostDinasBuktitanggungjawabRes extends GenericRes {}

export interface PostDataPembayaranReq {
  dinas_id: number;
  files: File[];
}

export interface PostDataPembayaranRes extends GenericRes {}
