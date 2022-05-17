import { Status } from '../Common';

export interface GetRiwayatPendidikanListReq {
    pegawai_id?: number;
}

export interface GetRiwayatPendidikanListRes {
    status: Status;
    data: RiwayatPendidikanListData[];
}

export interface RiwayatPendidikanListData {
    pegawai_id: number;
    pt_id: number;
    pt_name: string;
    prodi_id: number;
    jenjang_id: string;
    jenjang_name: string;
    prodi_name: string;
    tanggal_lulus: string;
    no_ijazah: string;
    files: string;
    
}