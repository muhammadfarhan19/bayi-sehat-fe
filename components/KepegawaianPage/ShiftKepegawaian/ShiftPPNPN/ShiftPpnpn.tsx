import { AdjustmentsIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React from 'react';

import { KepegawaianAPI, UnitKerjaAPI } from '../../../../constants/APIUrls';
import { GetPegawaiListData, GetPegawaiListReq } from '../../../../types/api/KepegawaianAPI';
import { GetUnitKerjaData } from '../../../../types/api/UnitKerjaAPI';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import Loader from '../../../shared/Loader/Loader';
import Pagination from '../../../shared/Pagination';

export default function ShiftPpnpn() {
  const router = useRouter();
  const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(true);
  const toggleAdvancedFilter = () => {
    setshowAdvancedFilter(!showAdvancedFilter);
  };

  const [filter, setFilter] = React.useState<GetPegawaiListReq>({
    page: 1,
    per_page: 20,
    status_cpns: [2],
  });

  const { data: pegawaiList, isValidating } = useCommonApi<GetPegawaiListReq, GetPegawaiListData>(
    KepegawaianAPI.GET_PEGAWAI_LIST,
    filter,
    { method: 'GET' }
  );

  const { data: unitKerjaList } = useCommonApi<null, GetUnitKerjaData[]>(
    UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT,
    null,
    { method: 'GET' }
  );

  const search = async <T extends keyof typeof filter>(type: T, value: typeof filter[T]) => {
    const newState = { ...filter };
    newState[type] = value;
    setFilter(newState);
  };

  return (
    <>
      <div className="px-6">
        <div className="flex flex-row py-6">
          <p className="text-lg font-medium text-gray-900">Daftar Shift Pegawai</p>
          <div className="ml-auto flex">
            <input
              type="text"
              className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Cari..."
              onChange={e => search('nama', e.target.value)}
            />
            <button
              className="ml-1 rounded-md border border-gray-300 p-2 focus:bg-gray-50 focus:outline-none"
              onClick={toggleAdvancedFilter}
            >
              <AdjustmentsIcon className="h-5  w-5 animate-pulse text-gray-400" />
            </button>
          </div>
        </div>

        {showAdvancedFilter && (
          <div className="flex w-full flex-row gap-x-[16px]">
            <div className="w-[202px] pb-2">
              <p className="mb-[4px] text-[14px] font-normal">Unit Kerja</p>
              <select
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                onChange={e => search('unit_kerja_id', e.target.value)}
              >
                <option value="">Semua</option>
                {(unitKerjaList || []).map((item, index) => (
                  <option key={`options-${index}`} value={item?.unit_kerja_id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
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
                            router.push(`/kepegawaian/data-pegawai?pegawai_id=${data.pegawai_id}&type=ppnpn`)
                          }
                        >
                          {data?.name}
                        </td>
                        <td className="px-6 text-xs font-medium text-gray-900">{data?.nip}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.unit_kerja}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.jabatan}</td>
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
        </div>
      )}
    </>
  );
}
