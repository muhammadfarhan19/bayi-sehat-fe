export interface SyncKehadiranReq {
  start_date: string;
  end_date: string;
  nip?: string;
}

export interface SyncKehadiranRes {
  status: string;
  data: string;
}
