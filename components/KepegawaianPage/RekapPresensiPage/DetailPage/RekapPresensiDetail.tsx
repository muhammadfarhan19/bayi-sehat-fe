import { AdjustmentsIcon } from '@heroicons/react/outline';
import React from 'react';

import { RekapPresensiAPI } from '../../../../constants/APIUrls';
import { FilterDataRekapPresensi, StatusHadirRekapPresensi, UnavailableDataText } from '../../../../constants/Resource';
import { useCommonState } from '../../../../reducer/CommonReducer';
import {
  type RekapPresensiReq,
  type RekapPresensiResp,
  RekapPresensiLastSyncRes,
} from '../../../../types/api/RekapPresensiAPI';
import { formatDate, formatStringDate, getLastDayOfMonth } from '../../../../utils/DateUtil';
import { checkReturnValueOfString } from '../../../../utils/StringUtil';
import { CircleProgress } from '../../../shared/CircleProgress';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import Loader from '../../../shared/Loader/Loader';
import Pagination from '../../../shared/Pagination';
import { ExpandableTableData, FilterDropdownPicker, ModalResend, MonthPicker } from './Shared';
import useDownloadRekapPresensi from './utils/useDownloadRekapPresensi';

interface RekapPresensiProps {
  status_cpns: number[];
}

function RekapPresensiDetail(props: RekapPresensiProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(true);
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const { handleDownloadRekap } = useDownloadRekapPresensi();
  const isDownloading = useCommonState().showLoader;

  const StatusHadirPickers = FilterDropdownPicker().renderComponent({
    textLabel: 'Status Hadir',
    onChange: e => changeFilterState({ status: e.target.value }),
    dataSet: StatusHadirRekapPresensi,
  });

  const FilterDataPickers = FilterDropdownPicker().renderComponent({
    onChange: () => null,
    textLabel: 'Title',
    unMappedOptionTitle: 'Data SDM',
    dataSet: FilterDataRekapPresensi,
  });

  const [formModalState, setFormModalState] = React.useState<{
    open: boolean;
    selectedId?: number;
  }>({
    open: false,
    selectedId: undefined,
  });

  const [filterState, setFilterState] = React.useState<{
    page: number;
    per_page: number;
    search?: string;
    status?: string;
  }>({
    page: 1,
    per_page: 20,
    search: '',
    status: '',
  });

  const handleShowForm = (open: boolean, selectedId?: number) => {
    setFormModalState({
      open,
      selectedId,
    });
  };
  const handleDateChange = React.useCallback(
    (date: Date) => {
      setSelectedDate(date);
    },
    [selectedDate]
  );

  const startDate = selectedDate ? formatDate(selectedDate, 'yyyy-MM-dd') : formatDate(new Date(), 'yyyy-MM-dd');

  const endOfMonth = selectedDate ? getLastDayOfMonth(selectedDate) : new Date();

  const endDate = formatDate(endOfMonth, 'yyyy-MM-dd');

  const filterStateQuery = {
    page: filterState?.page,
    per_page: filterState?.per_page,
    start_date: startDate,
    end_date: endDate,
    status_cpns: props.status_cpns,
    status: filterState.status,
  };

  const handleQuery = () => {
    if (filterState?.status === '') {
      delete filterStateQuery?.status;
    }
    if (filterState?.search?.trim() !== '') {
      return { ...filterStateQuery, search: filterState?.search?.trim() };
    }
    return filterStateQuery;
  };

  const { data: rekapPresensiLastSync } = useCommonApi<Partial<RekapPresensiReq>, RekapPresensiLastSyncRes>(
    RekapPresensiAPI.GET_PRESENSI_LAST_SYNC_MASTER,
    { start_date: startDate, end_date: endDate },
    { method: 'GET' },
    { skipCall: !selectedDate, revalidateOnMount: true }
  );

  const { data: rekapPresensi, isValidating } = useCommonApi<RekapPresensiReq, RekapPresensiResp>(
    RekapPresensiAPI.GET_PRESENSI_SUMMARY_LIST,
    handleQuery(),
    { method: 'GET' },
    { skipCall: !selectedDate && !props.status_cpns, revalidateOnMount: true || filterState?.search === '' }
  );

  const downloadRekap = () => {
    if (selectedDate) {
      handleDownloadRekap(startDate, endDate, props.status_cpns);
    }
  };

  const toggleAdvancedFilter = () => {
    setshowAdvancedFilter(!showAdvancedFilter);
  };

  const changeFilterState = (inputState: Partial<RekapPresensiReq>) => {
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

  const replacementOfMinusOneResponseAsHyphen = '-';
  const formatDateOfLastSync = rekapPresensiLastSync?.last_sync
    ? formatStringDate(rekapPresensiLastSync?.last_sync, 'EEEE, dd MMM yyyy - HH:mm:ss')
    : '';
  const isPPNPNList = props?.status_cpns?.[0] === 2;
  const tableHeaderIdPegawai = isPPNPNList ? 'NIK' : 'NIP';
  return (
    <>
      <div className="mb-5 flex flex-row items-center px-4 pt-3">
        <h3 className="text-xl font-medium leading-6 text-gray-900">Rekap Presensi</h3>
        <div className="ml-auto flex">
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Cari..."
            onChange={e => changeFilterState({ search: e.target.value })}
          />
          <button
            type="button"
            onClick={toggleAdvancedFilter}
            className="ml-1 rounded-md border border-gray-300 p-2 focus:bg-gray-50 focus:outline-none"
          >
            <AdjustmentsIcon className="h-5  w-5 animate-pulse text-gray-400" />
          </button>
        </div>
      </div>

      {showAdvancedFilter && (
        <div className="flex w-full flex-row items-center gap-x-[16px] px-5">
          {FilterDataPickers}
          {StatusHadirPickers}
          <div className="mt-[-46px]">
            <p className="mb-[4px] text-[14px] font-normal">Bulan dan Tahun</p>
            <MonthPicker onChange={handleDateChange} />
          </div>
        </div>
      )}

      <div className="flex justify-end px-5">
        <div className="flex flex-row space-x-2">
          <button
            disabled={isDownloading}
            onClick={downloadRekap}
            className="w-36 rounded-[6px] bg-indigo-600 py-[9px] px-[2px] text-gray-50 disabled:bg-indigo-400"
          >
            {isDownloading ? (
              <div className="ml-4 flex items-center justify-center">
                <CircleProgress />
              </div>
            ) : (
              'Download'
            )}
          </button>
          <button
            onClick={() => handleShowForm(!formModalState.open, 0)}
            className="w-36 rounded-[6px] bg-[#4F46E5] py-[9px] px-[2px] text-gray-50 disabled:bg-indigo-400"
          >
            Kirim Ulang
          </button>
        </div>
      </div>
      <div className="font-semi mt-5 flex justify-end px-5 text-sm text-[#4F46E5]">
        Pembaharuan Terakhir {checkReturnValueOfString(String(formatDateOfLastSync), ' : -')}
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
                      {tableHeaderIdPegawai}
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
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Hari dan Tanggal
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Note
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Shift Masuk
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Shift Keluar
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Masuk
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Pulang
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Telat(menit)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      PSW(menit)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Status Hadir
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Status PSW
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Status Telat
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Status TK
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Pengurang TK(%)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Pengurang Terlambat(%)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Pengurang PSW(%)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Pengurang Lupa Absen Datang(%)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Pengurang Lupa Absen Pulang(%)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Last Sync
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(rekapPresensi?.list ?? []).map((data, index) => {
                    const dataPsw = data?.summary?.psw;
                    const dataTelat = data?.summary?.telat;
                    const dataStatusPsw = data?.summary?.status_psw;
                    /**
                     * @description given key below return -1 from Response
                     */
                    const isBelowZeroPSW = dataPsw < 0 ? replacementOfMinusOneResponseAsHyphen : dataPsw;
                    const isBelowZeroDataTelat = dataTelat < 0 ? replacementOfMinusOneResponseAsHyphen : dataTelat;
                    const isBelowZeroDataStatusPsw =
                      dataStatusPsw < 0 ? replacementOfMinusOneResponseAsHyphen : dataStatusPsw;
                    return (
                      <tr className={'bg-white hover:bg-gray-100'} key={index}>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.nip}</td>
                        <td className="truncate px-6 py-4 text-xs font-medium text-blue-900">{data?.name}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                          <ExpandableTableData data={data?.unit_kerja} expandClass={'w-40 cursor-pointer'} />
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.date}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                          {checkReturnValueOfString(data?.note)}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                          {checkReturnValueOfString(data?.shift_check_in)}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                          {checkReturnValueOfString(data?.shift_check_out)}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium">{checkReturnValueOfString(data?.check_in)}</td>
                        <td className="px-6 py-4 text-xs font-medium">{checkReturnValueOfString(data?.check_out)}</td>
                        <td className="px-6 py-4 text-xs font-medium">{isBelowZeroDataTelat}</td>
                        <td className="px-6 py-4 text-xs font-medium">{isBelowZeroPSW}</td>
                        <td className="py-2 text-xs font-medium">
                          {checkReturnValueOfString(data?.status, UnavailableDataText)}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium">{isBelowZeroDataStatusPsw}</td>
                        <td className="px-6 py-4 text-xs font-medium">{data?.summary?.status_telat}</td>
                        <td className="px-6 py-4 text-xs font-medium">{data?.summary?.status_tk}</td>
                        <td className="px-6 py-4 text-xs font-medium">
                          {checkReturnValueOfString(data?.summary?.pengurangan_tk)}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium">
                          {checkReturnValueOfString(data?.summary?.pengurangan_terlambat)}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium">
                          {checkReturnValueOfString(data?.summary?.pengurangan_psw)}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium">
                          {checkReturnValueOfString(data?.summary?.pengurangan_lupa_absen_datang)}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium">
                          {checkReturnValueOfString(data?.summary?.pengurangan_lupa_absen_pulang)}
                        </td>
                        <td className="truncate px-6 py-4 text-xs font-medium">
                          {checkReturnValueOfString(
                            formatStringDate(data?.summary?.updated_at, 'EEEE, dd MMM yyyy, HH:mm:ss'),
                            formatStringDate(data?.summary?.created_at, 'EEEE, dd MMM yyyy, HH:mm:ss')
                          )}
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
                totalData={rekapPresensi ? rekapPresensi?.pagination.total_data : 0}
                perPage={filterState.per_page}
                page={filterState.page}
              />
            </div>
          </div>
        </div>
      )}
      {formModalState?.open && (
        <ModalResend open={formModalState?.open} setOpen={(open: boolean) => handleShowForm(open, 0)} />
      )}
    </>
  );
}

export default RekapPresensiDetail;
