import { AdjustmentsIcon } from '@heroicons/react/outline';
import React from 'react';

import { KepegawaianAPI } from '../../../constants/APIUrls';
import { GetPegawaiListData, GetPegawaiListReq } from '../../../types/api/KepegawaianAPI';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';
import Pagination from '../../shared/Pagination';
import RekapKehadiranPNS from './RekapKehadiranPNS';

function ListPegawaiPNS() {
  const [filter, setFilter] = React.useState<GetPegawaiListReq>({
    page: 1,
    per_page: 20,
    status_cpns: [1, 3],
  });

  const [pegawaiId, setPegawaiId] = React.useState<number>(0);

  const { data: pegawaiList, isValidating } = useCommonApi<GetPegawaiListReq, GetPegawaiListData>(
    KepegawaianAPI.GET_PEGAWAI_LIST,
    filter,
    { method: 'GET' },
    { revalidateOnMount: true }
  );

  const search = async <T extends keyof typeof filter>(type: T, value: typeof filter[T]) => {
    const newState = { ...filter };
    newState[type] = value;
    setFilter(newState);
  };
  return (
    <>
      {pegawaiId ? (
        <RekapKehadiranPNS onBack={() => setPegawaiId(0)} pegawai_id={pegawaiId} />
      ) : (
        <>
          <div className="mb-5 flex flex-row items-center px-4 pt-5">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Rekap Kehadiran Pegawai</h3>
            <div className="ml-auto flex">
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Cari..."
                onChange={e => search('nama', e.target.value)}
              />
              <button
                type="button"
                disabled
                className="ml-1 rounded-md border border-gray-300 p-2 focus:bg-gray-50 focus:outline-none"
              >
                <AdjustmentsIcon className="h-5  w-5 animate-pulse text-gray-400" />
              </button>
            </div>
          </div>
          {isValidating ? (
            <div className="relative h-[150px] w-full divide-y divide-gray-200">
              <Loader />
            </div>
          ) : (
            <div className="my-[24px] overflow-x-auto sm:mx-0 ">
              <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                <div className="sm:rounded-lg">
                  <table className="w-full table-auto overflow-auto rounded-lg bg-gray-100">
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
                          NIP
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Nama
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Unit Kerja
                        </th>
                        <th
                          scope="col"
                          className="w-40 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(pegawaiList?.list || []).map((data, dataIdx) => {
                        return (
                          <tr key={data?.pegawai_id} className={'bg-white hover:bg-gray-100'}>
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.nip}</td>
                            <td className="px-6 py-4 text-xs font-medium text-blue-900">{data?.name}</td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.unit_kerja}</td>
                            <td className="px-6 py-4 text-xs font-medium">
                              <button
                                onClick={() => {
                                  setPegawaiId(data?.pegawai_id);
                                }}
                                type="button"
                                className="inline-flex w-full items-center justify-center rounded border border-transparent bg-indigo-600 px-2.5 py-2 text-center text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-200"
                              >
                                Rekap
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <Pagination
                    onChange={value => {
                      search('page', value);
                    }}
                    totalData={pegawaiList ? pegawaiList?.pagination?.total_data : 0}
                    perPage={filter?.per_page}
                    page={filter?.page}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ListPegawaiPNS;
