export interface GetKGBList {
  riwayat_id: number;
  pegawai_id: number;
  golongan_id: number;
  golongan_id_str: string;
  tanggal_kgb: string;
  tmt_kgb: string;
  penandatangan: string;
  jabatan_id?: number | undefined;
  jabatan_id_str: string;
  tmt_kgb_selanjutnya: string;
  files: [
    {
      document_uuid: string;
      document_name: string;
    }
  ];
}

export interface GetKGBListReq {
  pegawai_id?: number;
}

export interface PostRiwayatKGBReq {
  pegawai_id?: number;
  golongan_id: number | string;
  tanggal_kgb: string;
  tmt_kgb: string;
  penandatangan: string;
  jabatan_id: number | string;
  tmt_kgb_selanjutnya: string;
  files: [
    {
      document_name: string;
      document_uuid: string;
    }
  ];
}

export interface PostRiwayatKGBRes {
  status: string;
  data: string;
}

export interface PostRiwayatKGBUpdateReq {
  riwayat_id: number;
  golongan_id: number;
  pegawai_id: number;
  tanggal_kgb: string;
  tmt_kgb: string;
  penandatangan: string;
  jabatan_id: number | string;
  tmt_kgb_selanjutnya: string;
  files: [
    {
      document_name: string;
      document_uuid: string;
    }
  ];
}


export interface PostDetailRiwayatKGBReq {
  riwayat_id?: number;
}

export interface PostRiwayatKGBDelReq {
  riwayat_id: number;
}
