export interface BabyType {
  id: string | undefined
  name: string | undefined
  gender: string | undefined
  address: string | undefined
  birthdate: Date | undefined
  age: number | undefined
  baby_condition: {
    id: string
    baby_id: string
    weight: number
    height: number
    month: number
    created_at: Date
    updated_at: Date
  }[]
  parent_name: string | undefined
  phone_number: string | undefined
  status: {
    score: number
    category: string | undefined
  }
}
