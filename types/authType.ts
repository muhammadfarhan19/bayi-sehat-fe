export interface PostAuthLoginReq {
  email: string
  password: string
}

export type PostAuthLoginRes =
  | {
      status: string
      data: {
        access_token: string
        refresh_token: string
      }
    }
  | {
      status: string
      error_message: string
    }
