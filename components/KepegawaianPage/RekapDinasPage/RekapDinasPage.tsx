import React from 'react';

import { RekapDinasAPI, UnitKerjaAPI } from '../../../constants/APIUrls';
import { GetRekapReq, RekapData } from '../../../types/api/RekapDinasAPI';
import { GetUnitKerjaData } from '../../../types/api/UnitKerjaAPI';
import { formatStringDate } from '../../../utils/DateUtil';
import { checkReturnValueOfString } from '../../../utils/StringUtil';
import SummaryDinasCalendar from '../../DinasPage/DataPegawai/SummaryDinasCalendar';
import useAllowSuperAdmin from '../../shared/hooks/useAllowSuperAdmin';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';
import Pagination from '../../shared/Pagination';
import ToolTip from '../../shared/ToolTip';
import AdminDinasAccess from './AdminDinasAccess';
import TextLimiter from './TextLimiter';

interface UnitKerja {
  unit_kerja_id: number;
}

function RekapDinasPage(props: UnitKerja) {
  const { unit_kerja_id } = props;
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const [loaded, setLoaded] = React.useState(false);
  const [dateFiltersFilled, setDateFiltersFilled] = React.useState(false);

  const [filterState, setFilterState] = React.useState<GetRekapReq>({
    page: 1,
    per_page: 10,
    unit_kerja_id: unit_kerja_id,
  });
  const { isAllowSuperAdminAccessFilter } = useAllowSuperAdmin();
  const {
    data: dataTable,
    isValidating,
    mutate,
  } = useCommonApi<GetRekapReq, RekapData>(RekapDinasAPI.GET_DINAS_LIST, filterState, { method: 'GET' });

  const { data: unitKerjaList } = useCommonApi<null, GetUnitKerjaData[]>(
    UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT,
    null,
    { method: 'GET' }
  );

  React.useEffect(() => {
    if (loaded) {
      mutate();
    }
    setLoaded(true);
  }, [filterState]);

  const changeFilterState = (inputState: Partial<GetRekapReq>) => {
    const pageAffected = Object.keys(inputState).includes('page');
    const newState = {
      ...filterState,
      ...inputState,
    };

    if (!pageAffected) {
      newState.page = 1;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setFilterState(newState), pageAffected ? 0 : 800);
  };

  React.useEffect(() => {
    // Pemeriksaan apakah kedua tanggal sudah diisi
    if (filterState.tgl_mulai || filterState.tgl_selesai) {
      setDateFiltersFilled(false);
    } else {
      setDateFiltersFilled(true);
    }
  }, [filterState.tgl_mulai, filterState.tgl_selesai]);

  const isDateFiltersFilled = dateFiltersFilled || (filterState.tgl_mulai && filterState.tgl_selesai);

  return (
    <>
      <div className="rounded-lg bg-white shadow">
        <div className="px-6">
          <div className="flex flex-row py-6">
            <p className="text-lg font-medium text-gray-900">Rekap Dinas</p>

            <div className="ml-auto flex">
              <input
                autoComplete="off"
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Cari Penugasan"
                onChange={e => {
                  changeFilterState({ isi_penugasan: e.target.value === '' ? undefined : e.target.value });
                }}
              />
              <AdminDinasAccess />
            </div>
          </div>

          <div className="flex w-full flex-row gap-x-[16px]">
            <div className="w-[202px] pb-2">
              <p className="mb-[4px] text-[14px] font-normal">Unit Kerja</p>
              <select
                className="block w-full appearance-none truncate rounded-md border border-gray-300 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                onChange={e => {
                  changeFilterState({ unit_kerja_id: e.target.value === '' ? undefined : Number(e.target.value) });
                }}
                disabled={!!unit_kerja_id && !isAllowSuperAdminAccessFilter}
              >
                <option value="">Semua</option>
                {(unitKerjaList || []).map((item, index) => (
                  <option
                    key={`options-${index}`}
                    value={item?.unit_kerja_id}
                    selected={unit_kerja_id === Number(item?.unit_kerja_id) ? true : false}
                  >
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[202px] pb-2">
              <p className="mb-[4px] text-[14px] font-normal">Jenis Dinas</p>
              <select
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                onChange={e => {
                  changeFilterState({ jenis_dinas_id: e.target.value === '' ? undefined : Number(e.target.value) });
                }}
              >
                <option value="">Semua</option>
                <option value="1">Dinas SPPD</option>
                <option value="2">Dinas Non SPPD</option>
              </select>
            </div>
            <div className="w-[202px] pb-2">
              <p className="text-sm font-medium text-gray-700"> Dari Tanggal</p>
              <input
                type="date"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                onChange={e => {
                  changeFilterState({ tgl_mulai: e.target.value === '' ? undefined : e.target.value });
                }}
              />
            </div>
            <div className="w-[202px] pb-2">
              <p className="text-sm font-medium text-gray-700"> Sampai Tanggal</p>
              <input
                type="date"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                onChange={e => {
                  changeFilterState({ tgl_selesai: e.target.value === '' ? undefined : e.target.value });
                }}
              />
            </div>
            {!dateFiltersFilled && !isDateFiltersFilled && (
              <div className="px-6 py-2 text-red-500">Harap isi kedua filter tanggal</div>
            )}
          </div>
        </div>
        {isValidating ? (
          <div className="relative h-[150px] w-full divide-y divide-gray-200">
            <Loader />
          </div>
        ) : (
          <div className="flex max-h-[600px] flex-col">
            <div className="my-[24px] overflow-x-auto sm:mx-0 ">
              <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                <div className=" sm:rounded-lg">
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
                          Surat Dinas
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
                          Tanggal Mulai
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Tanggal Selesai
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Jenis Dinas
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Isi Penugasan
                        </th>
                        <th
                          scope="col"
                          className="flex flex-row items-center px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          <p> Sync Terakhir</p>
                          <ToolTip message="Terakhir melakukan sinkronisasi data dari INTRA DIKTI ke DIKBUD HR" />
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Update Terakhir
                        </th>
                      </tr>
                    </thead>
                    {isDateFiltersFilled && !isValidating && (
                      <tbody>
                        {(dataTable?.list || []).map((data, dataIdx) => (
                          <tr
                            key={dataIdx}
                            className={
                              dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
                            }
                          >
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">
                              {filterState.per_page * (filterState.page - 1) + (dataIdx + 1)}
                            </td>
                            <td
                              className="cursor-pointer px-6 py-4 text-xs font-medium text-blue-900 underline underline-offset-1"
                              onClick={() =>
                                (window.location.href = `/kepegawaian/rekap-dinas?dinas_id=${data.dinas_id}`)
                              }
                            >
                              {data.no_sp}
                            </td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.unit_kerja_str}</td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.tgl_mulai}</td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.tgl_selesai}</td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.jenis_dinas}</td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">
                              <TextLimiter text={data.isi_penugasan} limit={5} key={data.dinas_id} />
                            </td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">
                              {checkReturnValueOfString(
                                formatStringDate(data?.last_sync, 'EEEE, dd MMM yyyy, HH:mm:ss')
                              )}
                            </td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">
                              {checkReturnValueOfString(
                                formatStringDate(data?.updated_at, 'EEEE, dd MMM yyyy, HH:mm:ss')
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
            <Pagination
              onChange={value => {
                changeFilterState({ page: value });
              }}
              totalData={dataTable ? dataTable?.pagination.total_data : 0}
              perPage={filterState.per_page}
              page={filterState.page}
            />
          </div>
        )}
      </div>

      <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
        <div className="flex flex-row flex-wrap items-center justify-between px-6 py-4">
          <p className="text-lg font-medium text-gray-900">Kalender Dinas</p>
        </div>
        <SummaryDinasCalendar unit_kerja_id={unit_kerja_id} />
      </div>
    </>
  );
}

export default RekapDinasPage;
