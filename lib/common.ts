import moment from 'moment'

import { BabyCondition } from '../types/api/baby.type'

export const calculateAgeInMonths = (birthDate: string | Date | undefined, month: number) => {
  const formattedBirthDate = moment(birthDate)
  const currentDate = moment().startOf('month')
  const targetDate = moment()
    .month(month - 1)
    .startOf('month')
  const ageInMonths = targetDate.diff(formattedBirthDate, 'months')

  return ageInMonths
}

export function phoneNumberConverter(phoneNumber: string): string {
  const firstChar = phoneNumber.charAt(0)

  if (!isNaN(parseInt(firstChar))) {
    return '62' + phoneNumber.slice(1)
  }
  return phoneNumber
}

export const getQueryString = <T = Record<string, string>>(): T => {
  const result: Record<string, string> = {}
  if (typeof window !== 'undefined') {
    const query = window.location.search.substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      if (vars[i]) {
        const pair = vars[i].split('=')
        result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
      }
    }
  }
  return result as unknown as T
}

export const dateToISO = (dateStr: string | Date) => {
  return moment(dateStr, 'DDMMYYYY').toISOString()
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const GenderList = [
  {
    value: 1,
    text: 'Laki-Laki',
  },
  {
    value: 2,
    text: 'Perempuan',
  },
]

export const filterMonths = [
  {
    value: 1,
    text: 'Januari',
  },
  {
    value: 2,
    text: 'Februari',
  },
  {
    value: 3,
    text: 'Maret',
  },
  {
    value: 4,
    text: 'April',
  },
  {
    value: 5,
    text: 'Mei',
  },
  {
    value: 6,
    text: 'Juni',
  },
  {
    value: 7,
    text: 'Juli',
  },
  {
    value: 8,
    text: 'Agustus',
  },
  {
    value: 9,
    text: 'September',
  },
  {
    value: 10,
    text: 'Oktober',
  },
  {
    value: 11,
    text: 'November',
  },
  {
    value: 12,
    text: 'Desember',
  },
]

export function formatBabyConditions(
  babyConditions: BabyCondition[]
): { weight: number; height: number; month: string }[] {
  return babyConditions?.map(condition => ({
    weight: condition.weight,
    height: condition.height,
    month: filterMonths.find(month => month.value === condition.month)?.text || '',
  }))
}
