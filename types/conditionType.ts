export interface GetBabyConditionRes {
  status: boolean
  statusCode: number
  data: BabyCondition
}

export interface BabyCondition {
  month: number | undefined
  weight: number | undefined
  height: number | undefined
}
