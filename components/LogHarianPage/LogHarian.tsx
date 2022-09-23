import { AdjustmentsIcon } from '@heroicons/react/outline';
import React from 'react';

import { KepegawaianAPI, UnitKerjaAPI } from '../../constants/APIUrls';
import { GetPegawaiListData, GetPegawaiListReq } from '../../types/api/KepegawaianAPI';
import { GetUnitKerjaData } from '../../types/api/UnitKerjaAPI';
import useCommonApi from '../shared/hooks/useCommonApi';
import Pagination from '../shared/Pagination';
import DetailLogHarianMonth from './DetailLogHarianMonth';

function LogHarian() {
  const [filter, setFilter] = React.useState<GetPegawaiListReq>({
    page: 1,
    per_page: 20,
  });

  const [isShownDetailPage, setIsShownDetailPage] = React.useState(true);

  const { data: pegawaiList } = useCommonApi<GetPegawaiListReq, GetPegawaiListData>(
    KepegawaianAPI.GET_PEGAWAI_LIST,
    filter,
    { method: 'GET' },
    { revalidateOnMount: true }
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

  const toggleAdvancedFilter = () => {
    setIsShownDetailPage(!isShownDetailPage);
  };

  return (
    <>
      {!isShownDetailPage ? (
        <DetailLogHarianMonth onBack={toggleAdvancedFilter} />
      ) : (
        <section aria-labelledby="section-1-title">
          <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
            <div className="mb-5 flex flex-row items-center">
              <h3 className="text-xl font-medium leading-6 text-gray-900">Log Harian Pegawai</h3>
              <div className="ml-auto flex">
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Cari..."
                  onChange={() => null}
                />
                <button
                  className="ml-1 rounded-md border border-gray-300 p-2 focus:bg-gray-50 focus:outline-none"
                  onClick={() => null}
                >
                  <AdjustmentsIcon className="h-5  w-5 animate-pulse text-gray-400" />
                </button>
              </div>
            </div>

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
                      {(pegawaiList?.list || []).map((data, dataIdx) => (
                        <tr className={'bg-white hover:bg-gray-100'}>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.nip}</td>
                          <td
                            className="cursor-pointer px-6 py-4 text-xs font-medium text-blue-900"
                            onClick={() => null}
                          >
                            {data?.name}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.unit_kerja}</td>
                          <td className="px-6 py-4 text-xs font-medium">
                            <button
                              onClick={toggleAdvancedFilter}
                              type="button"
                              className="inline-flex w-full items-center justify-center rounded border border-transparent bg-green-600 px-2.5 py-2 text-center text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-200"
                            >
                              Log Harian
                            </button>
                          </td>
                        </tr>
                      ))}
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
          </div>
        </section>
      )}
    </>
  );
}

export default LogHarian;
