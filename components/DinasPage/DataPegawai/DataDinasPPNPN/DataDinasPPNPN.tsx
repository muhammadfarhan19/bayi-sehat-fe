import { AdjustmentsIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React from 'react';

import { KepegawaianAPI, MasterAPI, UnitKerjaAPI } from '../../../../constants/APIUrls';
import { GetPegawaiListData, GetPegawaiListReq } from '../../../../types/api/KepegawaianAPI';
import { JenisJabatanListData } from '../../../../types/api/MasterAPI';
import { GetUnitKerjaData } from '../../../../types/api/UnitKerjaAPI';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import Loader from '../../../shared/Loader/Loader';
import Pagination from '../../../shared/Pagination';

interface UnitKerjaProps {
  unit_kerja_id: number;
}

export function DataDinasPPNPN(props: UnitKerjaProps) {
  const { unit_kerja_id } = props;
  const router = useRouter();
  const inputTimeout = React.useRef<NodeJS.Timeout>();
  const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(true);
  const [filter, setFilter] = React.useState<GetPegawaiListReq>({
    page: 1,
    per_page: 20,
    status_cpns: [2],
    unit_kerja_id: unit_kerja_id,
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

  const { data: jenisJabatanList } = useCommonApi<null, JenisJabatanListData[]>(
    MasterAPI.GET_JENIS_JABATAN_LIST,
    null,
    { method: 'GET' }
  );

  const toggleAdvancedFilter = () => {
    setshowAdvancedFilter(!showAdvancedFilter);
  };

  const changeFilterState = (inputState: Partial<GetPegawaiListReq>) => {
    const pageAffected = Object.keys(inputState).includes('page');
    const newState = {
      ...filter,
      ...inputState,
    };

    if (!pageAffected) {
      newState.page = 1;
    }

    if (inputTimeout.current) {
      clearTimeout(inputTimeout.current);
    }
    inputTimeout.current = setTimeout(() => setFilter(newState), pageAffected ? 0 : 500);
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-6">
        <div className="flex flex-row py-6">
          <p className="text-lg font-medium text-gray-900">Data Dinas Pegawai</p>
          <div className="ml-auto flex">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Cari..."
              onChange={e => {
                changeFilterState({ nama: e.target.value === '' ? undefined : e.target.value });
              }}
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
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                onChange={e => {
                  changeFilterState({ unit_kerja_id: e.target.value === '' ? undefined : Number(e.target.value) });
                }}
                disabled={!!unit_kerja_id}
              >
                <option value="">Semua</option>
                {(unitKerjaList || []).map((item, index) => (
                  <option
                    selected={unit_kerja_id === Number(item?.unit_kerja_id) ? true : false}
                    key={`options-${index}`}
                    value={item?.unit_kerja_id}
                  >
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[202px] pb-2">
              <p className="mb-[4px] text-[14px] font-normal">Tipe Jabatan</p>
              <select
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                onChange={e => {
                  changeFilterState({ tipe_jabatan: e.target.value === '' ? undefined : e.target.value });
                }}
              >
                <option value="">Semua</option>
                {(jenisJabatanList || []).map((item, index) => (
                  <option key={`options-${index}`} value={item?.tipe_jabatan}>
                    {item?.jenis_jabatan}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[202px] pb-2">
              <p className="mb-[4px] text-[14px] font-normal">Nama Jabatan</p>
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Nama Jabatan"
                onChange={e => {
                  changeFilterState({ jabatan: e.target.value === '' ? undefined : e.target.value });
                }}
              />
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
          <div className="my-[24px] w-full overflow-x-auto sm:mx-0">
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
                      Unit Kerja
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Golongan
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
                        onClick={() => router.push(`/dinas/pegawai/detail?pegawai_id=${data.pegawai_id}`)}
                      >
                        {data.name}
                      </td>
                      <td className="px-6 text-xs font-medium text-gray-900">{data?.nip}</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.unit_kerja}</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.golongan}</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.jabatan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                onChange={value => {
                  changeFilterState({ page: value });
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
  );
}

export default DataDinasPPNPN;
