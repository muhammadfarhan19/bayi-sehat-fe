import { Status } from '../Common';

export interface DocumentData {
  document_uuid: string;
  document_name: string;
}

export interface PostPhotoProfileReq {
  foto: DocumentData[];
}

export interface PostPhotoProfileRes {
  status: string;
  data: string;
}

export interface GetPhotoProfileRes {
  user_id: number;
  nama: string;
  uuid_foto: string;
}

export interface GetPhotoProfileReq {
  status: Status.OK;
  data: GetPhotoProfileRes[];
}

export interface GetPhotosRes {
  status: Status.OK;
  data: {
    document_id: number;
    document_uuid: string;
    title: string;
    jenis_document: string;
    file_name: string;
    file_path: string;
  };
}
