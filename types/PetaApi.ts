import { Status } from './Common';

export interface PetaData {
  list: {
    id: number;
    jabatan: string;
    kelas_jabatan: number;
    keterisian: number;
    kebutuhan: number;
    selisih: number;
  }[];
  pagination: {
    total_page: number;
    total_data: number;
  };
}

export interface GetPetaRes {
  status: string;
  data: PetaData;
}

export interface GetPetaReq {
  page: number;
  per_page: number;
  nama_jabatan?: string;
}

export interface PostKebutuhanPetaReq {
  jabatan_id: number;
  jumlah: number;
}

export type PostKebutuhanPetaRes =
  | {
      status: Status.OK;
      data: Status.OK;
    }
  | {
      status: Status.BAD_REQUEST | Status.ERROR_DB;
    };
