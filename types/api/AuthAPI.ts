import { Status } from '../Common';

export interface PostAuthRefreshReq {
  refresh_token: string;
}

export type PostAuthRefreshRes =
  | {
      status: Status.OK;
      data: {
        access_token: string;
        refresh_token: string;
      };
    }
  | {
      status: Status.UNAUTHENTICATED;
      data: {
        access_token: string;
        refresh_token: string;
      };
    };

export type GetAuthInfoRes =
  | {
      status: Status.OK;
      data: AuthInfoData | null;
    }
  | { status: Status.UNAUTHENTICATED; data: null };

export interface AuthInfoData {
  user_id: number;
  session_uuid: string;
}

export interface PostAuthLoginReq {
  nip: string;
  password: string;
}

export type PostAuthLoginRes =
  | {
      status: Status.OK;
      data: {
        access_token: string;
        refresh_token: string;
      };
    }
  | {
      status: Status.BAD_REQUEST | Status.ERROR_DB;
      error_message: string;
    };

export type PostAuthLogoutRes =
  | {
      status: Status.OK;
      data: string;
    }
  | {
      status: Status.UNAUTHENTICATED;
      data: null;
    };
