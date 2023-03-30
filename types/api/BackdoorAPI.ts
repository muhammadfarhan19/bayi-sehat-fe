export interface PostBackdoorReq {
  pegawai_id: number;
  date: string;
  check_in: string;
  check_out: string;
}

export interface PostBackdoorRes {
  status: string;
  data: string;
}
