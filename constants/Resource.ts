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
};

export const JenisBerkas = {
  skCpns: 'SK CPNS',
  skPns: 'SK PNS',
  foto: 'Foto',
  ktp: 'KTP',
  kartuPegawai: 'Kartu Pegawai',
  others: 'Lainnya',
};
