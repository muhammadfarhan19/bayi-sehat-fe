import { ChevronLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { KepegawaianAPI, UnitKerjaAPI } from '../../constants/APIUrls';
import { GetPegawaiListData, GetPegawaiListReq } from '../../types/api/KepegawaianAPI';
import { GetUnitKerjaData } from '../../types/api/UnitKerjaAPI';
import { getQueryString } from '../../utils/URLUtils';
import { withErrorBoundary } from '../shared/hocs/ErrorBoundary';
import useCommonApi from '../shared/hooks/useCommonApi';
import Loader from '../shared/Loader/Loader';
import Pagination from '../shared/Pagination';

export type TypeChart = 'golongan' | 'pendidikan' | 'jenis_kelamin' | 'jenis_belajar';
type QueryString = {
  detail: TypeChart;
  title: string;
  label: string;
  unitKerja: string;
};

function DashboardDetailPage() {
  const router = useRouter();
  const qs = getQueryString();
  const queryString = Object.keys(qs as QueryString).reduce((res, each) => {
    const key = each as keyof QueryString;
    res[key] = decodeURIComponent(qs[key]) as any;
    return res;
  }, {} as QueryString);

  const labelAndValue = { label: [], valueKey: [] } as {
    label: string[];
    valueKey: (keyof GetPegawaiListData['list'][0])[];
  };

  switch (queryString.detail) {
    case 'golongan':
      break;
    case 'pendidikan':
      break;
    case 'jenis_kelamin':
      labelAndValue.label = ['NIP', 'UNIT KERJA', 'JABATAN', 'GENDER', 'UMUR TAHUN', 'UMUR BULAN'];
      labelAndValue.valueKey = ['nip', 'unit_kerja', 'jabatan', 'gender', 'usia', 'usia'];
      break;
    default:
      break;
  }

  const [loaded, setLoaded] = React.useState(false);

  const [filter, setFilter] = React.useState<GetPegawaiListReq>(() => {
    const preFilter = {
      page: 1,
      per_page: 20,
      status_cpns: [1, 3],
    } as GetPegawaiListReq;

    switch (queryString.detail) {
      case 'golongan':
        break;
      case 'pendidikan':
        break;
      case 'jenis_belajar':
        break;
      case 'jenis_kelamin':
        preFilter['range_umur'] = queryString.title.replace(/\s/g, '');
        preFilter['gender'] = queryString.label === 'Pria' ? 1 : 2;
        break;
      default:
        break;
    }

    return preFilter;
  });

  const { data: unitKerjaList, isValidating: unitKerjaLoading } = useCommonApi<null, GetUnitKerjaData[]>(
    UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT,
    null,
    { method: 'GET' }
  );

  const { data: pegawaiList, isValidating: pegawaiLoading } = useCommonApi<GetPegawaiListReq, GetPegawaiListData>(
    KepegawaianAPI.GET_PEGAWAI_LIST,
    filter,
    { method: 'GET' },
    { skipCall: unitKerjaLoading || !loaded }
  );

  React.useEffect(() => {
    if (!unitKerjaLoading && unitKerjaList && (unitKerjaList || []).length) {
      const selectedUnitKerjaId = unitKerjaList.filter(each => each.name === queryString.unitKerja)?.[0]?.unit_kerja_id;
      setFilter({ ...filter, unit_kerja_id: selectedUnitKerjaId });
      setLoaded(true);
    }
  }, [unitKerjaLoading]);

  const search = async <T extends keyof typeof filter>(type: T, value: typeof filter[T]) => {
    const newState = { ...filter };
    newState[type] = value;
    setFilter(newState);
  };

  return (
    <section aria-labelledby="kepegawaian-detail">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <Link href="/kepegawaian">
          <a className="flex flex-row items-center space-x-2 px-4 pt-4">
            <ChevronLeftIcon className="h-8 w-8" />
            <div>Kembali</div>
          </a>
        </Link>
        <div className="px-6">
          <div className="flex flex-row pt-4">
            {queryString.detail === 'golongan' ? (
              <p className="text-lg font-medium text-gray-900">Golongan Pegawai {queryString.title}</p>
            ) : queryString.detail === 'pendidikan' ? (
              <p className="text-lg font-medium text-gray-900">Pendidikan dari Riwayat Pendidikan</p>
            ) : queryString.detail === 'jenis_kelamin' ? (
              <p className="text-lg font-medium text-gray-900">Umur dan Jenis Kelamin</p>
            ) : queryString.detail === 'jenis_belajar' ? (
              <p className="text-lg font-medium text-gray-900">Tugas Belajar</p>
            ) : (
              <p className="text-lg font-medium text-gray-900">Data Pegawai</p>
            )}
          </div>
        </div>
        {pegawaiLoading || !loaded ? (
          <div className="relative h-[150px] w-full divide-y divide-gray-200">
            <Loader />
          </div>
        ) : (
          <div className="flex">
            <div className="my-[24px] w-full overflow-x-auto sm:mx-0 ">
              <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                <table className="w-full table-auto rounded-lg bg-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Nama
                      </th>
                      {labelAndValue.label.map((each, index) => (
                        <th
                          key={`label-${index}`}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          {each}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(pegawaiList?.list || []).map((data, dataIdx) => (
                      <tr
                        key={dataIdx}
                        className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                      >
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                          {filter.per_page * (filter.page - 1) + (dataIdx + 1)}
                        </td>
                        <td
                          className="cursor-pointer px-6 py-4 text-xs font-medium text-indigo-800"
                          onClick={() =>
                            router.push(`/kepegawaian/data-pegawai?pegawai_id=${data.pegawai_id}&type=pns`)
                          }
                        >
                          {data.name}
                        </td>
                        {labelAndValue.valueKey.map((valueKey, valueKeyIdx) => {
                          const labelText = labelAndValue.label[valueKeyIdx];
                          let valueText = data?.[valueKey] || '';

                          switch (labelText) {
                            case 'UMUR TAHUN':
                              valueText = (valueText.toString().split(',')?.[0] || '').trim();
                              break;
                            case 'UMUR BULAN':
                              valueText = (valueText.toString().split(',')?.[1] || '').trim();
                              break;
                            default:
                              break;
                          }

                          return (
                            <th key={`valueKey-${valueKeyIdx}`} className="px-6 py-4 text-xs font-medium text-gray-900">
                              {valueText}
                            </th>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  onChange={value => {
                    search('page', value);
                  }}
                  totalData={pegawaiList ? pegawaiList?.pagination.total_data : 0}
                  perPage={filter.per_page}
                  page={filter.page}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default withErrorBoundary(DashboardDetailPage);
