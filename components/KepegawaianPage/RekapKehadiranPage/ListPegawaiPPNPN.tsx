import { AdjustmentsIcon } from '@heroicons/react/outline';
import React from 'react';

import { KepegawaianAPI } from '../../../constants/APIUrls';
import { GetPegawaiListData, GetPegawaiListReq } from '../../../types/api/KepegawaianAPI';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';
import Pagination from '../../shared/Pagination';
import RekapKehadiranPNS from './RekapKehadiranPNS';

function ListPegawaiPPNPN() {
  const [pegawaiId, setPegawaiId] = React.useState<number>(0);
  const [filterPPNPN, setFilterPPNPN] = React.useState<GetPegawaiListReq>({
    page: 1,
    per_page: 20,
    status_cpns: [2],
  });

  const { data: ppnpnList, isValidating } = useCommonApi<GetPegawaiListReq, GetPegawaiListData>(
    KepegawaianAPI.GET_PEGAWAI_LIST,
    filterPPNPN,
    { method: 'GET' }
  );

  const searches = async <T extends keyof typeof filterPPNPN>(type: T, value: typeof filterPPNPN[T]) => {
    const newState = { ...filterPPNPN };
    newState[type] = value;
    setFilterPPNPN(newState);
  };
  return (
    <>
      {pegawaiId ? (
        <>
          <RekapKehadiranPNS pegawai_id={pegawaiId} onBack={() => setPegawaiId(0)} />
        </>
      ) : (
        <>
          <div className="mb-5 flex flex-row items-center px-4 pt-5">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Rekap Kehadiran Pegawai</h3>
            <div className="ml-auto flex">
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Cari..."
                onChange={e => searches('nama', e.target.value)}
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
            <div className="flex">
              <div className="my-[24px] overflow-x-auto sm:mx-0 ">
                <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                  <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="w-full table-fixed rounded-lg bg-gray-100">
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
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            NIK
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Unit Kerja
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Jabatan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(ppnpnList?.list || []).map((data, dataIdx) => (
                          <tr
                            key={dataIdx}
                            className={
                              dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
                            }
                          >
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">
                              {filterPPNPN.per_page * (filterPPNPN.page - 1) + (dataIdx + 1)}
                            </td>
                            <td className="px-6 py-4 text-xs font-medium text-indigo-800">{data?.name}</td>
                            <td className="px-6 text-xs font-medium text-gray-900">{data?.nip}</td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.unit_kerja}</td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.jabatan}</td>
                            <td className="text-\xs px-6 py-4 font-medium">
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
                        ))}
                      </tbody>
                    </table>
                    <Pagination
                      onChange={value => {
                        searches('page', value);
                      }}
                      totalData={ppnpnList ? ppnpnList?.pagination.total_data : 0}
                      perPage={filterPPNPN.per_page}
                      page={filterPPNPN.page}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ListPegawaiPPNPN;
