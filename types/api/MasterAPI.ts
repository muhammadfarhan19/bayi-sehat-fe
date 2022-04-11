export interface GetMasterJenisBerkasRes {
  status: string;
  data: MasterJenisBerkasData[];
}

export interface MasterJenisBerkasData {
  jenis_berkas_id: number;
  jenis_berkas: string;
}
