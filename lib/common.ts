import moment from 'moment'

export const calculateAgeInMonths = (birthDate: string | Date | undefined) => {
  const currentDate = moment()
  const formattedBirthDate = moment(birthDate)
  const ageInMonths = currentDate.diff(formattedBirthDate, 'months')
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

export const DETAIL_TABLE_HEAD = ['Periode', 'Umur (bulan)', 'Berat (kg)', 'Tinggi (cm)']

const MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'Nopember',
  'Desember',
]

const heights = [43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55]

export const DUMMY_CONDITION = MONTHS.map((month, index) => ({
  month,
  berat: Math.floor(Math.random() * (6 - 4 + 1)) + 3,
  tinggi: heights[index % heights.length],
}))
