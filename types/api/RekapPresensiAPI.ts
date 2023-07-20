export interface RekapPresensiReq {
  page: number;
  per_page: number;
  start_date: string;
  end_date: string;
  status_cpns: number[];
  nama?: string;
}

export interface RekapPresensiResp {
  list: RekapPresensiData[];
  pagination: {
    total_page: number;
    total_data: number;
  };
}

interface RekapPresensiData {
  presensi_id: number;
  pegawai_id: number;
  nip: string;
  badge_number: string;
  name: string;
  unit_kerja: string;
  date: string;
  note: string;
  check_in: string;
  check_out: string;
  shift_check_in: string;
  shift_check_out: string;
  status: string;
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
}

export declare module ResendLogPresensi {
  interface Request {
    date: string;
  }

  interface Response {
    status: string;
    data: {
      total_data: number;
    };
  }
}
