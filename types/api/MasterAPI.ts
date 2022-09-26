import { Status } from '../Common';

export interface GetMasterJenisBerkasRes {
  status: Status;
  data: MasterJenisBerkasData[];
}

export interface MasterJenisBerkasData {
  jenis_berkas_id: number;
  jenis_berkas: string;
}

export interface GetJenisJabatanListRes {
  status: Status;
  data: JenisJabatanListData[];
}

export interface JenisJabatanListData {
  id: number;
  tipe_jabatan: string;
  jenis_jabatan: string;
}

export interface GetPendidikanEligibleJenjangRes {
  status: Status;
  data: PendidikanEligibleJenjangData;
}

export interface PendidikanEligibleJenjangData {
  jenjang_id: number;
  jenjang: string;
  kode_jenjang: number;
}

export interface MasterJenisKpData {
  id: number;
  jenis_kp: string;
}

export interface GetMasterJenisGol {
  golongan_id: number;
  golongan: string;
  kode_golongan: string;
  pangkat: string;
}

export interface GetMasterJenisKpRes {
  status: Status;
  data: MasterJenisKpData[];
}
