export declare module DaftarTransaksi {
  interface GetListReq {
    page: number;
    per_page: number;
    kode?: string;
    month?: number;
    year?: number;
  }

  interface GetListRes {
    list: {
      kode: string;
      month: number;
      year: number;
      tanggal_awal_akhir: string;
      created_by: string;
      last_sync: string;
      sync_by: string;
    }[];
    pagination: {
      total_page: number;
      total_data: number;
    };
  }

  interface PostResyncReq {
    kode: string;
    start_date: string;
    end_date: string;
  }

  interface PostResyncRes {
    status: string;
    data: {
      message: string;
    };
  }

  interface Request {
    search?: string;
    unit_kerja?: string;
    kode: string;
    type: number[];
  }

  interface Response {
    transaction: {
      code: string;
      last_sync: string;
      month: number;
      year: string;
    };
    list: {
      presensi_id: number;
      pegawai_id: number;
      badge_number: string;
      nip: string;
      name: string;
      unit_kerja: string;
      date: string;
      status: string;
      sub_status: string;
      check_in: string;
      check_out: string;
      shift_check_in: string;
      shift_check_out: string;
      summary: {
        presensi_sum_id: number;
        presensi_id: number;
        pegawai_id: number;
        date: string;
        status_kehadiran: string;
        status_ketidakhadiran: string;
        telat: number;
        psw: number;
        status_telat: number;
        status_psw: number;
        status_tk: number;
        pengurangan_tk: string;
        pengurangan_terlambat: string;
        pengurangan_psw: string;
        pengurangan_lupa_absen_datang: string;
        pengurangan_lupa_absen_pulang: string;
        tidak_ada_ditempat: string;
        created_at: string;
        created_by: string;
        updated_at: string;
        updated_by: string;
      };
    }[];
    pagination: {
      total_page: number;
      total_data: number;
    };
  }

  interface PostRequest {
    kode: string;
    month: number;
    year: number;
  }

  interface PostResponse {
    status: string;
    data: string;
  }
}
