import { StatusMenikah, Gender, StatusCpns } from '../types/Common';

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

export const StatusPNSText: Record<StatusCpns, String> = {
  [StatusCpns.PNS]: 'PNS',
  [StatusCpns.PPNPN]: 'PPNPN',
  [StatusCpns.CPNS]: 'CPNS',
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
