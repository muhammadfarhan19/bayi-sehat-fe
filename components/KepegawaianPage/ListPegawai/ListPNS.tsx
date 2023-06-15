import { AdjustmentsIcon } from '@heroicons/react/outline';
import React from 'react';

import { CutiAPI, KepegawaianAPI, UnitKerjaAPI } from '../../../constants/APIUrls';
import { ExportCutiRes } from '../../../types/api/CutiAPI';
import { GetPegawaiListData, GetPegawaiListReq, PegawaiData } from '../../../types/api/KepegawaianAPI';
import { GetUnitKerjaData } from '../../../types/api/UnitKerjaAPI';
import { callAPI } from '../../../utils/Fetchers';
import useAllowSuperAdmin from '../../shared/hooks/useAllowSuperAdmin';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';
import Pagination from '../../shared/Pagination';

interface ListPNSProps {
  pageHeaderTitle: string;
  unitKerjaId: number;
  onClickEachPegawai: (passFor: PegawaiData) => void;
  actionButtonTitle: string;
  containerStyle?: string;
  isShownNipCell?: boolean;
  isShownCutiCell?: boolean;
}

function ListPNS(props: ListPNSProps) {
  const {
    pageHeaderTitle = '',
    unitKerjaId,
    onClickEachPegawai,
    actionButtonTitle,
    containerStyle,
    isShownNipCell = true,
    isShownCutiCell = false,
  } = props;
  const { isAllowSuperAdminAccessFilter } = useAllowSuperAdmin();
  const inputTimeout = React.useRef<NodeJS.Timeout>();
  const [filter, setFilter] = React.useState<GetPegawaiListReq>({
    page: 1,
    per_page: 20,
    status_cpns: [1, 3],
    unit_kerja_id: unitKerjaId,
  });
  const { data: pegawaiList, isValidating } = useCommonApi<GetPegawaiListReq, GetPegawaiListData>(
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

  const exportData = () => {
    callAPI<null, ExportCutiRes>(CutiAPI.EXPORT_DATA_CUTI, null, { isBlob: true, method: 'POST' })
      .then(response => {
        let url = '';

        if (response.status === 200 && response.data instanceof Blob) {
          url = window.URL.createObjectURL(response.data);
        }
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Data Cuti.xlsx`);
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className={`bg-white ${containerStyle}`}>
      <div className="mb-5 flex flex-row items-center px-4 pt-3">
        <h3 className="text-xl font-medium leading-6 text-gray-900">{pageHeaderTitle}</h3>
        <div className="ml-auto flex gap-x-[4px]">
          <div className="flex">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Cari..."
              onChange={e => {
                changeFilterState({ nama: e.target.value === '' ? undefined : e.target.value });
              }}
            />
            <button
              type="button"
              disabled
              className="ml-1 rounded-md border border-gray-300 p-2 focus:bg-gray-50 focus:outline-none"
            >
              <AdjustmentsIcon className="h-5  w-5 animate-pulse text-gray-400" />
            </button>
          </div>

          <div
            className="inline-flex cursor-pointer gap-x-[8px] rounded-[6px] bg-[#4F46E5] px-[18px] py-[9px]"
            onClick={exportData}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="my-auto h-4 w-4 text-gray-50"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p className="text-[14px] font-[400] text-gray-50">Export Data</p>
          </div>
        </div>
      </div>

      <div className="w-[202px] pl-5">
        <p className="mb-[4px] text-[14px] font-normal">Unit Kerja</p>
        <select
          className="block w-full appearance-none truncate rounded-md border border-gray-300 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
          onChange={e => {
            changeFilterState({ unit_kerja_id: e.target.value === '' ? undefined : Number(e.target.value) });
          }}
          disabled={!!unitKerjaId && !isAllowSuperAdminAccessFilter}
        >
          <option value="">Semua</option>
          {(unitKerjaList || []).map((item, index) => (
            <option
              selected={unitKerjaId === Number(item?.unit_kerja_id) ? true : false}
              key={`options-${index}`}
              value={item?.unit_kerja_id}
            >
              {item?.name}
            </option>
          ))}
        </select>
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
                    {isShownNipCell ? (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        NIP
                      </th>
                    ) : null}
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
                    {isShownCutiCell ? (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Kuota Cuti
                      </th>
                    ) : null}
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
                        {isShownNipCell ? (
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.nip}</td>
                        ) : null}
                        <td className="px-6 py-4 text-xs font-medium text-blue-900">{data?.name}</td>

                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.unit_kerja}</td>
                        {isShownCutiCell ? (
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {data?.saldo_cuti_tahun_ini || 0}
                          </td>
                        ) : null}
                        <td className="px-6 py-4 text-xs font-medium">
                          <button
                            onClick={() => onClickEachPegawai(data)}
                            type="button"
                            className="inline-flex w-20 items-center justify-center rounded border border-transparent bg-indigo-600 px-2.5 py-2 text-center text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-200"
                          >
                            {actionButtonTitle}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                onChange={value => {
                  changeFilterState({ page: value });
                }}
                totalData={pegawaiList ? pegawaiList?.pagination?.total_data : 0}
                perPage={filter?.per_page}
                page={filter?.page}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListPNS;
