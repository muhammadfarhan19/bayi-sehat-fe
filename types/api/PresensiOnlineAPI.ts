export interface PresensiOnlineResp {
  pegawai_id: number;
  shift_id: number;
  shift: string;
  date: string;
  check_in: string;
  check_out: string;
  time_check_in: string;
  time_check_out: string;
  period: string;
  status: string;
  can_do_absence: boolean;
}
