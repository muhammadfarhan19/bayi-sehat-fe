export type Status = 'OK' | 'UNAUTHENTICATED';

export interface PostAuthRefreshReq {
  refresh_token: string;
}

export interface PostAuthRefreshRes {
  status: Status;
  data: {
    access_token: string;
    refresh_token: string;
  } | null;
}

export interface PostAuthInfoRes {
  status: Status;
  data: {
    user_id: number;
    session_uuid: string;
  } | null;
}

export interface PostAuthLoginReq {
  nip: string;
  password: string;
}

export type PostAuthLoginRes =
  | {
      status: 'OK';
      access_token: 'string';
      refresh_token: 'string';
    }
  | {
      status: 'BAD_REQUEST' | 'ERROR_DB';
      error_message: string;
    };

export interface PostAuthLogoutRes {
  status: Status;
  data: string | null;
}
