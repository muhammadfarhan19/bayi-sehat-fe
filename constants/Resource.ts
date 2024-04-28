import { Agama, Gender, StatusCpns, StatusMenikah } from '../types/Common';

export const StatusMenikahText: Record<StatusMenikah, string> = {
  [StatusMenikah.MARRIED]: 'Menikah',
  [StatusMenikah.NOT_MARRIED]: 'Belum menikah',
  [StatusMenikah.DIVORCE_ALIVE]: 'Cerai - hidup',
  [StatusMenikah.DIVORCE_DEATH]: 'Cerai - meninggal',
};

export const GenderText: Record<Gender, string> = {
  [Gender.FEMALE]: 'Wanita',
  [Gender.MALE]: 'Pria',
};

export const StatusPNSText: Record<StatusCpns, string> = {
  [StatusCpns.PNS]: 'PNS',
  [StatusCpns.PPNPN]: 'PPNPN',
  [StatusCpns.CPNS]: 'CPNS',
  [StatusCpns.PPPK]: 'PPPK',
};

export const AgamaText: Record<Agama, string> = {
  [Agama.BUDDHA]: 'Buddha',
  [Agama.HINDU]: 'Hindu',
  [Agama.ISLAM]: 'Islam',
  [Agama.KATOLIK]: 'Katolik',
  [Agama.PROTESTAN]: 'Protestan',
  [Agama.OTHER]: 'Tidak dapat disebutkan',
};

export const JenisBerkas = {
  skCpns: 'SK CPNS',
  skPns: 'SK PNS',
  foto: 'Foto',
  ktp: 'KTP',
  kartuPegawai: 'Kartu Pegawai',
  others: 'Lainnya',
};

export const JenjangPendidikan = [
  { jenjang_id: 1, jenjang: 'S3' },
  { jenjang_id: 2, jenjang: 'S2' },
  { jenjang_id: 3, jenjang: 'S1' },
  { jenjang_id: 4, jenjang: 'D3' },
  { jenjang_id: 5, jenjang: 'SMA' },
  { jenjang_id: 6, jenjang: 'D1' },
  { jenjang_id: 7, jenjang: 'SD' },
  { jenjang_id: 8, jenjang: 'SMK' },
  { jenjang_id: 9, jenjang: 'D2' },
  { jenjang_id: 10, jenjang: 'D4' },
  { jenjang_id: 11, jenjang: 'Profesi' },
  { jenjang_id: 12, jenjang: 'S2-Terapan' },
  { jenjang_id: 13, jenjang: 'S3-Terapan' },
  { jenjang_id: 14, jenjang: 'Sp-1' },
  { jenjang_id: 15, jenjang: 'Sp-2' },
  { jenjang_id: 16, jenjang: 'SMP' },
];

export const Golongan = [
  { value: '13', text: 'IV/e - Pembina Utama' },
  { value: '14', text: 'I/a - Juru Muda' },
  { value: '15', text: 'I/b - Juru Muda Tingkat I' },
  { value: '16', text: 'I/c - Juru' },
  { value: '17', text: 'I/d - Juru Tingkat I' },
  { value: '1', text: 'II/a - Pengatur Muda' },
  { value: '2', text: 'II/b - Pengatur Muda Tingkat I' },
  { value: '3', text: 'II/c - Pengatur' },
  { value: '4', text: 'II/d - Pengatur Tingkat I' },
  { value: '5', text: 'III/a - Penata Muda' },
  { value: '6', text: 'III/b - Penata Muda Tingkat I' },
  { value: '7', text: 'III/c - Penata' },
  { value: '8', text: 'III/d - Penata Tingkat I' },
  { value: '9', text: 'IV/a - Pembina' },
  { value: '10', text: 'IV/b - Pembina Tingkat I' },
  { value: '11', text: 'IV/c - Pembina Utama Muda' },
  { value: '12', text: 'IV/d - Pembina Utama Madya' },
];

export const UUID_FILE = {
  PeningkatanKompetensi_Staging: '48157624-b8ec-42d9-ba46-36972efecc01',
  PeningkatanKompetensi_Production: '9556ab8c-8ab3-453d-af99-519dc0d30cc1',
};

export const TEMPLATE_FILE_NAME = {
  PeningkatanKompetensi: 'Template_File_Peningkatan_Kompetensi',
};

export const TEMPLATE_FILE_FORMAT = {
  xlsx: 'xlsx',
};

export const StatusPembayaranText = [
  'Menunggu PUMK Memproses',
  'Diproses PUMK',
  'Diajukan PUMK Kepada BPP',
  'Dibayarkan BPP',
  'Selesai',
];

export const HelpCenterUri = {
  isAdmin:
    'https://www.canva.com/design/DAFNUqOADak/NqcYNvPUiuRoJSdA3DWbSg/edit?utm_content=DAFNUqOADak&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton#1',
  isPegawai:
    'https://www.canva.com/design/DAFMwCC9V5w/fRu_CF25QcbWthz6sA09Gw/view?utm_content=DAFMwCC9V5w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
  loginGuidance:
    'https://www.canva.com/design/DAFZbpRAZIY/tYZTgwhbEFtq8DpwmQc3WA/view?utm_content=DAFZbpRAZIY&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
};

export const RatingPerilakuDanHasilKerja = [
  {
    id: 1,
    textAsValue: 'Di Atas Ekspektasi',
  },
  {
    id: 2,
    textAsValue: 'Sesuai Ekspektasi',
  },
  {
    id: 3,
    textAsValue: 'Di Bawah Ekspektasi',
  },
];

export const PredikatKinerjaPegawai = [
  {
    id: 1,
    textAsValue: 'Sangat Baik/Istimewa',
  },
  {
    id: 2,
    textAsValue: 'Baik',
  },
  {
    id: 3,
    textAsValue: 'Butuh Perbaikan',
  },
  {
    id: 4,
    textAsValue: 'Kurang/Missconduct',
  },
  {
    id: 5,
    textAsValue: 'Sangat Kurang',
  },
];

export const StatusPegawai = [
  { value: 1, text: 'Aktif' },
  { value: 2, text: 'Batas Usia Pensiun' },
  { value: 3, text: 'Pensiun Dini' },
  { value: 4, text: 'Mengundurkan Diri' },
  { value: 5, text: 'Pemberhentian Hormat' },
  { value: 6, text: 'Pemberhentian Tidak Dengan Hormat' },
  { value: 7, text: 'Meninggal Dunia' },
  { value: 8, text: 'Mutasi' },
];

export const StatusPresensiBE = [
  {
    statusId: 1,
    title: 'Masuk',
  },
  {
    statusId: 2,
    title: 'Terlambat',
  },
  {
    statusId: 3,
    title: 'Pulang Awal',
  },
  {
    statusId: 4,
    title: 'Terlambat & Pulang Awal',
  },
  {
    statusId: 5,
    title: 'Tidak Hadir',
  },
  {
    statusId: 6,
    title: 'Dinas',
  },
  {
    statusId: 7,
    title: 'Weekend',
  },
  {
    statusId: 8,
    title: 'Cuti',
  },
  {
    statusId: 9,
    title: 'Libur',
  },
  {
    statusId: 10,
    title: 'Sakit',
  },
];

export const StrukturKepegawaianRole = [
  {
    value: 1,
    text: 'Pimpinan',
  },
  {
    value: 2,
    text: 'KaTU',
  },
  {
    value: 3,
    text: 'KTK',
  },
  {
    value: 4,
    text: 'Penanggung Jawab',
  },
  {
    value: 5,
    text: 'Staff',
  },
];

export enum modalOption {
  add = 'ADD',
  edit = 'EDIT',
}

export enum JamKerja {
  Masuk = 'Jam Kerja Masuk',
  Pulang = 'Jam Kerja Pulang',
}

export const UnavailableDataText = 'Data Belum Ada';

export const AgamaMap: Record<number, string> = {
  1: 'Buddha',
  2: 'Hindu',
  3: 'Islam',
  4: 'Katolik',
  5: 'Protestan',
  6: 'Tidak dapat disebutkan',
};

export const RelationshipStatusMap: Record<number, string> = {
  2: 'Menikah',
  3: 'Cerai Hidup',
  4: 'Cerai Meninggal',
};

export const HyphenText = '-';

export type TableRekapPresensi =
  | 'No'
  | 'NIP'
  | 'Nama'
  | 'Unit Kerja'
  | 'Hari dan Tanggal'
  | 'Note'
  | 'Shift Masuk'
  | 'Shift Keluar'
  | 'Masuk'
  | 'Pulang'
  | 'Telat(menit)'
  | 'PSW(menit)'
  | 'Status Hadir'
  | 'Status PSW'
  | 'Status Telat'
  | 'Status TK'
  | 'Pengurang TK(%)'
  | 'Pengurang Terlambat(%)'
  | 'Pengurang PSW(%)'
  | 'Pengurang Lupa Absen Datang(%)'
  | 'Pengurang Lupa Absen Pulang(%)'
  | 'Last Sync';

export const StatusHadirRekapPresensi = [
  'Remote',
  'Tepat Waktu',
  'Terlambat',
  'Pulang Lebih Awal',
  'Terlambat dan Pulang Lebih Awal',
  'Dinas',
  'Tidak Hadir',
  'Libur Weekend',
  'Libur Nasional/Spesial',
  'Cuti',
  'Shift Libur',
  'Lupa Absen Datang',
  'Lupa Absen Pulang',
  'Lupa Absen Datang Dan Pulang Lebih Awal',
  'Terlambat Dan Lupa Absen Pulang',
];

export const FilterDataRekapPresensi = ['Data Lain'];
