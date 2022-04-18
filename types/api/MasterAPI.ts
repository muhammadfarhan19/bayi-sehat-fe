export interface GetMasterJenisBerkasRes {
  status: string;
  data: MasterJenisBerkasData[];
}

export interface MasterJenisBerkasData {
  jenis_berkas_id: number;
  jenis_berkas: string;
}

export interface GetJenisJabatanListRes {
  status: string;
  data: JenisJabatanListData[];
}

export interface JenisJabatanListData {
  id: number;
  tipe_jabatan: string;
  jenis_jabatan: string;
}
