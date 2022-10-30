import { ChevronLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { KepegawaianAPI } from '../../../constants/APIUrls';
import { GetPegawaiStatisticListReq, GetPegawaiStatisticListRes } from '../../../types/api/KepegawaianAPI';
import { withErrorBoundary } from '../../shared/hocs/ErrorBoundary';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';
import { detailQueryString } from '../DashboardDetailPage';

type ListData = GetPegawaiStatisticListRes['data'];

function GolonganDetail() {
  const router = useRouter();
  const queryString = detailQueryString();

  const labelAndValue = {
    label: ['NIP', 'UNIT KERJA', 'GOLONGAN', 'PANGKAT', 'TMT JABATAN TERAKHIR'],
    valueKey: ['nip', 'unit_kerja', 'golongan', 'pangkat', 'tmt_golongan'],
  } as {
    label: string[];
    valueKey: (keyof ListData[0])[];
  };

  const { data: pegawaiList, isValidating: pegawaiLoading } = useCommonApi<GetPegawaiStatisticListReq, ListData>(
    KepegawaianAPI.GET_PEGAWAI_STATISTIC_LIST,
    {
      status_cpns: queryString.typePegawai === 'pns' ? [1, 3] : [2],
      golongan_id: Number(queryString?.golonganId || 0),
      unit_kerja_id: Number(queryString?.unitKerjaId || 0),
    },
    { method: 'GET' }
  );

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
            <p className="text-lg font-medium text-gray-900">Golongan Pegawai {queryString.golongan}</p>
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
                    {(pegawaiList || []).map((data, dataIdx) => (
                      <tr
                        key={dataIdx}
                        className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                      >
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                        <td
                          className="cursor-pointer px-6 py-4 text-xs font-medium text-indigo-800"
                          onClick={() =>
                            data?.pegawai_id &&
                            router.push(`/kepegawaian/data-pegawai?pegawai_id=${data.pegawai_id}&type=pns`)
                          }
                        >
                          {data.nama}
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
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default withErrorBoundary(GolonganDetail);
