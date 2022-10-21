export interface GetLogHarianData {
  log_month_id: number;
  peg_id: number;
  score: number;
  log_month: number;
  log_year: number;
  submited_log: number;
  number_of_day_filled: number;
}

export interface GetLogHarianReqYear {
  pegawai_id: number;
  year: number;
}

export interface GetLogHarianReqMonth {
  pegawai_id: number;
  year: number;
  month: number;
  week?: number | string;
}

export interface GetLogHarianWeekData {
  log_date?: any;
  log_id: number;
  log_month_id: number;
  log_week: number;
  summary: string;
}

export interface PostLogHarianDel {
  log_id: number;
}

export interface PostLogHarianRes {
  status: string;
  data: string;
}

export interface PostLogHarianInsert {
  peg_id: number;
  date?: string | number;
  summary: any;
}

export interface GetLogHarianPegawaiReq {
  pegawai_id?: number;
}

export interface GetLogHarianPegawaiRes {
  total_working_days: number,
  number_of_day_filled: number,
  number_of_day_unfilled: number,
  score: number
}