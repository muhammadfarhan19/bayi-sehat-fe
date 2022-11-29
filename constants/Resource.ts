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
  PeningkatanKompetensi_Production: ' 9556ab8c-8ab3-453d-af99-519dc0d30cc1',
};

export const TEMPLATE_FILE_NAME = {
  PeningkatanKompetensi: 'Template_File_Peningkatan_Kompetensi',
};

export const TEMPLATE_FILE_FORMAT = {
  xlsx: 'xlsx',
};
