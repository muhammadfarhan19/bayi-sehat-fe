import { Status } from '../Common';

export interface UploadReq {
  file: string;
  name: string;
  type: string;
}

export interface UploadRes {
  status: Status;
  message: string;
}
