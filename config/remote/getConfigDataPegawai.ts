import { DataPegawai } from '../../constants/RemoteConfig';
import { useParsedRemoteConfig } from '../../utils/RemoteConfigUtils';

interface PegawaiConfigValue {
  nama: boolean | string;
  npwp: boolean | string;
  badge_number: boolean | string;
  tempat_lahir: boolean | string;
  tanggal_lahir: boolean | string;
  nip: boolean | string;
  nik: boolean | string;
  unit_kerja: boolean | string;
  status_pegawai: boolean | string;
  tmt_cpns: boolean | string;
  bpjs_kesehatan: boolean | string;
  karpeg: boolean | string;
  gender: boolean | string;
  marriage_status: boolean | string;
  address: boolean | string;
  tugas_belajar: boolean | string;
}

export function useRemoteConfigAddPegawai() {
  return useParsedRemoteConfig<PegawaiConfigValue>(DataPegawai.POST);
}
