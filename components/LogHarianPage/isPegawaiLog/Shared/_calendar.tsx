export const CALENDAR_MOCK = [
  {
    id: 1,
    name: 'Bulan ke 1',
    title: 'Januari',
    year: new Date().getFullYear(),
  },
  {
    id: 2,
    name: 'Bulan ke 2',
    title: 'Februari',
    year: new Date().getFullYear(),
  },
  {
    id: 3,
    name: 'Bulan ke 3',
    title: 'Maret',
    year: new Date().getFullYear(),
  },
  {
    id: 4,
    name: 'Bulan ke 4',
    title: 'April',
    year: new Date().getFullYear(),
  },
  {
    id: 5,
    name: 'Bulan ke 5',
    title: 'Mei',
    year: new Date().getFullYear(),
  },
  {
    id: 6,
    name: 'Bulan ke 6',
    title: 'Juni',
    year: new Date().getFullYear(),
  },
  {
    id: 7,
    name: 'Bulan ke 7',
    title: 'Juli',
    year: new Date().getFullYear(),
  },
  {
    id: 8,
    name: 'Bulan ke 8',
    title: 'Agustus',
    year: new Date().getFullYear(),
  },
  {
    id: 9,
    name: 'Bulan ke 9',
    title: 'September',
    year: new Date().getFullYear(),
  },
  {
    id: 10,
    name: 'Bulan ke 10',
    title: 'Oktober',
    year: new Date().getFullYear(),
  },
  {
    id: 11,
    name: 'Bulan ke 11',
    title: 'November',
    year: new Date().getFullYear(),
  },
  {
    id: 12,
    name: 'Bulan ke 12',
    title: 'Desember',
    year: new Date().getFullYear(),
  },
];

export const CALENDAR_MOCKING = [
  {
    id: 12,
    name: 'Bulan ke 12',
    title: 'Desember',
    year: new Date().getFullYear(),
  },
  {
    id: 11,
    name: 'Bulan ke 11',
    title: 'November',
    year: new Date().getFullYear(),
  },
  {
    id: 10,
    name: 'Bulan ke 10',
    title: 'October',
    year: new Date().getFullYear(),
  },
  {
    id: 9,
    name: 'Bulan ke 9',
    title: 'September',
    year: new Date().getFullYear(),
  },
  {
    id: 8,
    name: 'Bulan ke 8',
    title: 'Agustus',
    year: new Date().getFullYear(),
  },
  {
    id: 7,
    name: 'Bulan ke 7',
    title: 'Juli',
    year: new Date().getFullYear(),
  },
  {
    id: 6,
    name: 'Bulan ke 6',
    title: 'Juni',
    year: new Date().getFullYear(),
  },
  {
    id: 5,
    name: 'Bulan ke 5',
    title: 'Mei',
    year: new Date().getFullYear(),
  },
  {
    id: 4,
    name: 'Bulan ke 4',
    title: 'April',
    year: new Date().getFullYear(),
  },
  {
    id: 3,
    name: 'Bulan ke 3',
    title: 'Maret',
    year: new Date().getFullYear(),
  },
  {
    id: 2,
    name: 'Bulan ke 2',
    title: 'Februari',
    year: new Date().getFullYear(),
  },
  {
    id: 1,
    name: 'Bulan ke 1',
    title: 'Januari',
    year: new Date().getFullYear(),
  },
];

export const WEEK_MOCK = [
  {
    id: 1,
    name: 'Minggu ke - 1',
  },
  {
    id: 2,
    name: 'Minggu ke - 2',
  },
  {
    id: 3,
    name: 'Minggu ke - 3',
  },
  {
    id: 4,
    name: 'Minggu ke - 4',
  },
];

export const DAY_IN_WEEK_MOCK = [
  {
    id: 1,
    name: 'Senin',
  },
  {
    id: 2,
    name: 'Selasa',
  },
  {
    id: 3,
    name: 'Rabu',
  },
  {
    id: 4,
    name: 'Kamis',
  },
  {
    id: 5,
    name: 'Jumat',
  },
];

export const getDaysInMonth = (month: number, year: number) =>
  new Array(31)
    .fill('')
    .map((v, i) => new Date(year, month - 1, i + 1))
    .filter(v => v.getMonth() === month - 1);
