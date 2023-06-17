import { AdjustmentsIcon } from '@heroicons/react/outline';
import React from 'react';

import { RekapPresensiAPI } from '../../../../constants/APIUrls';
import { type RekapPresensiReq, type RekapPresensiResp } from '../../../../types/api/RekapPresensiAPI';
import { formatDate, getLastDayOfMonth } from '../../../../utils/DateUtil';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import Loader from '../../../shared/Loader/Loader';
import Pagination from '../../../shared/Pagination';
import { ModalResend, MonthPicker } from './Shared';
import useDownloadRekapPresensi from './utils/useDownloadRekapPresensi';

function RekapPresensiDetail() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const { handleDownloadRekap } = useDownloadRekapPresensi();
  const [formModalState, setFormModalState] = React.useState<{
    open: boolean;
    selectedId?: number;
  }>({
    open: false,
    selectedId: undefined,
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

  const { data: rekapPresensi, isValidating } = useCommonApi<RekapPresensiReq, RekapPresensiResp>(
    RekapPresensiAPI.GET_PRESENSI_SUMMARY_LIST,
    {
      page: 1,
      per_page: 20,
      start_date: startDate,
      end_date: endDate,
    },
    { method: 'GET' },
    { skipCall: !selectedDate, revalidateOnMount: true }
  );

  const downloadRekap = () => {
    if (selectedDate) {
      handleDownloadRekap(startDate, endDate);
    }
  };

  return (
    <>
      <div className="mb-5 flex flex-row items-center px-4 pt-3">
        <h3 className="text-xl font-medium leading-6 text-gray-900">Rekap Presensi</h3>
        <div className="ml-auto flex">
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Cari..."
            disabled
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

      <div className="flex justify-between px-5">
        <div className="flex flex-row space-x-2">
          <MonthPicker onChange={handleDateChange} />
        </div>
        <div className="flex flex-row space-x-2">
          <button
            onClick={downloadRekap}
            className="rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-gray-50 disabled:bg-indigo-400"
          >
            Download
          </button>
          <button
            onClick={() => handleShowForm(!formModalState.open, 0)}
            className="rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-gray-50 disabled:bg-indigo-400"
          >
            Kirim Ulang
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
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Tanggal
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Libur
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
                  </tr>
                </thead>
                <tbody>
                  {(rekapPresensi?.list ?? []).map((data, index) => {
                    const dataPsw = data?.summary?.psw;
                    /**
                     * @description `dataPsw` key return -1 from Response
                     */
                    const isBelowZeroPSW = dataPsw < 0 ? 1 : dataPsw;
                    return (
                      <tr className={'bg-white hover:bg-gray-100'}>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.nip}</td>
                        <td className="px-6 py-4 text-xs font-medium text-blue-900">{data?.name}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.unit_kerja}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.date}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.holiday}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.shift_check_in}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.shift_check_out}</td>
                        <td className="px-6 py-4 text-xs font-medium">{data?.check_in}</td>
                        <td className="px-6 py-4 text-xs font-medium">{data?.check_out}</td>
                        <td className="px-6 py-4 text-xs font-medium">{data?.summary?.telat}</td>
                        <td className="px-6 py-4 text-xs font-medium">{isBelowZeroPSW}</td>
                        <td className="px-6 py-4 text-xs font-medium">{data?.summary?.status_telat}</td>
                        <td className="px-6 py-4 text-xs font-medium">{data?.summary?.status_tk}</td>
                        <td className="px-6 py-4 text-xs font-medium">{data?.summary?.pengurangan_tk}</td>
                        <td className="px-6 py-4 text-xs font-medium">{data?.summary?.pengurangan_terlambat}</td>
                        <td className="px-6 py-4 text-xs font-medium">{data?.summary?.pengurangan_psw}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination onChange={() => null} totalData={1} perPage={1} page={1} />
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
