import { DocumentUploadType, Status } from '../Common';

export interface PostDocumentUploadReq {
  title: string;
  file: File;
  document_type: DocumentUploadType;
  file_name: string;
  file_path: string;
}

export interface PostDocumentUploadRes {
  status: Status;
  data: {
    document_id: number;
    document_uuid: string;
    title: string;
    jenis_document: number;
    file_name: string;
    file_path: string;
  };
}

export interface GetDocumentReq {
  uuid: string;
}

export type GetDocumentRes =
  | {
      status: Status;
      data: DocumentData;
    }
  | Blob;

export interface DocumentData {
  document_id: number;
  document_uuid: string;
  title: string;
  jenis_document: number;
  file_name: string;
  file_path: string;
}
