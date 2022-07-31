import { Status } from '../Common';

export interface GetListKeluargaReq {
  pegawai_id?: number;
}

export interface GetDetailKeluargaReq {
  pasangan_id?: number;
}

export interface GetAnakList {
  pegawai_id?: number;
  pasangan_id?: number;
}

export interface DelAnakList {
  anak_id?: number;
}

export interface ListKeluargaData {
  pasangan_id: number;
  pegawai_id: number;
  nama: string | number;
  status_pasangan: number;
  tanggal_menikah: string;
  status_pernikahan: number;
  jumlah_anak: number;
}

export interface GetListKeluargaRes {
  status: Status;
  data: ListKeluargaData[];
}

export interface DelListKeluargaReq {
  pasangan_id?: number;
}

export interface PostListKeluargaRes {
  status: string;
  data: string;
}

export interface PostListKeluargaReq {
  pegawai_id?: number;
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string | number;
  agama: string | number;
  hp: string;
  nik: string;
  alamat?: string;
  nomor_akta_kelahiran: string | null;
  status_hidup: string | number;
  nomor_npwp: string | null;
  status_pasangan: string | number;
  status_pernikahan: string | number | null;
  status_pns: string | number;
  tanggal_menikah: string | null | undefined | number | any;
  nomor_akta_menikah: string;
  tanggal_meninggal: string | null | any;
  nomor_akta_meninggal: string | null;
  tanggal_cerai: string | null | any;
  nomor_akta_cerai: string | null;
  nomor_kartu_suami_istri: string | null;
  files?: [
    {
      document_uuid: string;
      document_name: string;
    },
    {
      document_uuid: string;
      document_name: string;
    },
    {
      document_uuid: string;
      document_name: string;
    },
    {
      document_uuid: string;
      document_name: string;
    },
    {
      document_uuid: string;
      document_name: string;
    },
    {
      document_uuid: string;
      document_name: string;
    }
  ];
}

export interface PostAnakReq {
  pegawai_id?: number;
  pasangan_id?: number;
  status_anak: number;
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: number;
  agama: number;
  no_hp: string;
  nik: string;
  alamat: string;
  no_akta_kelahiran: string;
  status_hidup: number;
  npwp: string;
  files: [
    {
      document_uuid: string;
      document_name: string;
    },
    {
      document_uuid: string;
      document_name: string;
    }
  ];
}

export interface GetAnakListRes {
  anak_id: number;
  agama: number;
  jenis_kelamin: number;
  nama: string;
  alamat: string;
  no_akta_kelahiran: string;
  no_hp: string;
  nik: string;
  npwp: string;
  status_hidup: number;
  status_anak: number;
  tempat_lahir: string;
  tanggal_lahir: string;
  files: [
    {
      document_uuid: string;
      document_name: string;
    },
    {
      document_uuid: string;
      document_name: string;
    }
  ];
}
