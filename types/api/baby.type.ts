export interface GetBabyRes {
  status: boolean
  statusCode: number
  data: BabyType[]
}

export interface BabyType {
  id: string | undefined
  name: string | undefined
  gender: string | undefined
  address: string | undefined
  birthdate: Date | undefined
  age: number | undefined
  baby_condition: BabyCondition[]
  parent_name: string | undefined
  phone_number: string | undefined
}

export interface BabyCondition {
  id: string
  baby_id: string
  weight: number
  height: number
  month: number
  created_at: Date
  updated_at: Date
}
