import { getQueryString } from '../../utils/URLUtils';
import { PegawaiType } from '../KepegawaianPage/DataKepegawaian/DetailPegawai/DetailPegawai';
import { withErrorBoundary } from '../shared/hocs/ErrorBoundary';
import GenericPegawaiDetail from './Detail/GenericPegawaiDetail';
import GolonganDetail from './Detail/GolonganDetail';
import JenisBelajarDetail from './Detail/JenisBelajarDetail';

export type TypeChart = 'golongan' | 'pendidikan' | 'jenis_kelamin' | 'jenis_belajar';
export type QueryString = {
  typePegawai: PegawaiType;
  detail: TypeChart;
  golongan?: string;
  golonganId?: string;
  jenisBelajar?: string;
  jenisKelamin?: string;
  rangeUmur?: string;
  jenjangId?: string;
  statusPegawai?: string;
  unitKerjaId?: string;
};

export const detailQueryString = () => {
  const qs = getQueryString();
  const eachFunc: <T extends keyof QueryString>(res: QueryString, each: T) => QueryString = (res, each) => {
    const value = res[each];
    res[each] = decodeURIComponent(value || '') as typeof value;
    return res;
  };

  return Object.keys(qs).reduce((res, each) => {
    return { ...res, ...eachFunc(qs as QueryString, each as keyof QueryString) };
  }, {} as QueryString);
};

function DashboardDetailPage() {
  const queryString = detailQueryString();

  if (queryString.detail === 'golongan') {
    return <GolonganDetail />;
  } else if (queryString.detail === 'jenis_belajar') {
    return <JenisBelajarDetail />;
  }

  return <GenericPegawaiDetail />;
}

export default withErrorBoundary(DashboardDetailPage);
