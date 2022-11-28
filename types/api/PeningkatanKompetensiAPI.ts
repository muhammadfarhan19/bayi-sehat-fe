import { Status } from '../Common';

export interface GetPeningkatanReq {
  pegawai_id: number;
}

export interface GetPeningkatanRes {
  id: number;
  pegawai_id: number;
  tahun: number;
  peningkatan_kompetensi: string;
  files: [
    {
      document_uuid: string;
      document_name: string;
    }
  ];
  created_by: string;
  updated_by: string;
  created_at: string;
}

export interface PostPeningkatanReq {
  tahun: number;
  files: [
    {
      document_uuid: string;
      document_name: string;
    }
  ];
}

export interface PostPeningkatanRes {
  status: Status;
  data: string;
}

export interface PostDetailPeningkatanReq {
  tahun: number;
  peningkatan_kompetensi: string;
}

export interface PostUpdatePeningkatanReq {
  id: number;
  pegawai_id: number;
  tahun: number;
  peningkatan_kompetensi: string;
}

export interface GetDetailPeningkatanReq {
  id?: number;
}

export interface GetDetailPeningkatanRes {
  id: number;
  pegawai_id: number;
  tahun: number;
  peningkatan_kompetensi: string;
  files: any;
  created_by: string;
  created_at: string;
}

export interface PostDeletePeningkatanReq {
  id?: number;
}
export interface PostDeletePeningkatanRes {
  status: string;
  data: string;
}
export interface PostInsertPeningkatanReq {
  pegawai_id?: number;
  tahun: number;
  peningkatan_kompetensi: string;
}

export interface PostInsertPeningkatanRes {
  status: string;
  data: string;
}
