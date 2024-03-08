import { ChevronLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { RiwayatBelajarAPI } from '../../../constants/APIUrls';
import {
  GetRiwayatBelajarStatisticListReq,
  GetRiwayatBelajarStatisticListRes,
} from '../../../types/api/RiwayatBelajarAPI';
import { withErrorBoundary } from '../../shared/hocs/ErrorBoundary';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';
import Pagination from '../../shared/Pagination';
import { detailQueryString } from '../DashboardDetailPage';

type ListData = GetRiwayatBelajarStatisticListRes['data']['list'];

function JenisBelajarDetail() {
  const router = useRouter();
  const queryString = detailQueryString();

  const [filter, setFilter] = React.useState<GetRiwayatBelajarStatisticListReq>({
    page: 1,
    per_page: 10,
    status_cpns: queryString.typePegawai === 'pns' ? [1, 3] : [2],
    jenis_belajar: Number(queryString?.jenisBelajar || 0),
    unit_kerja_id: queryString?.unitKerjaId ? +queryString?.unitKerjaId : null,
  });

  const labelAndValue = {
    label: ['NIP', 'UNIT KERJA', 'GOLONGAN', 'JENIS BELAJAR', 'TANGGAL MULAI', 'TANGGAL SELESAI', 'JENJANG'],
    valueKey: [
      'nip',
      'unit_kerja_str',
      'golongan_str',
      'jenis_belajar_str',
      'tahun_mulai',
      'tahun_selesai',
      'jenjang_str',
    ],
  } as {
    label: string[];
    valueKey: (keyof ListData[0])[];
  };

  const { data: pegawaiList, isValidating: pegawaiLoading } = useCommonApi<
    GetRiwayatBelajarStatisticListReq,
    GetRiwayatBelajarStatisticListRes['data']
  >(RiwayatBelajarAPI.POST_RIWAYAT_BELAJAR_STATISTIC_LIST, filter, { method: 'GET' });

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
            <p className="text-lg font-medium text-gray-900">
              {queryString?.jenisBelajar === '1' ? 'Tugas Belajar' : 'Izin Belajar'}
            </p>
          </div>
        </div>
        {pegawaiLoading ? (
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
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                        <td
                          className="cursor-pointer px-6 py-4 text-xs font-medium text-indigo-800"
                          onClick={() =>
                            data?.pegawai_id && router.push(`/kepegawaian/data-pegawai?pegawai_id=${data.pegawai_id}`)
                          }
                        >
                          {data.nama_pegawai}
                        </td>
                        {labelAndValue.valueKey.map((valueKey, valueKeyIdx) => {
                          const valueText = data?.[valueKey] || '';
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

export default withErrorBoundary(JenisBelajarDetail);
