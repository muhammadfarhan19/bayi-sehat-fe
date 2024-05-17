export interface GetAuthRes {
  status: boolean
  statusCode: number
  message: string
  data: UserData
}

export interface UserData {
  name: string
  email: string
}
