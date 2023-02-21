// import { format } from 'date-fns';
import { format } from 'date-fns';
import id from 'date-fns/locale/id';
import React from 'react';

import { KepegawaianAPI } from '../../../constants/APIUrls';
import { DinasPegawaiKalenderData, GetDinasPegawaiKalenderReq } from '../../../types/api/KepegawaianAPI';
import { getFirstAndLastDaysOfYear } from '../../../utils/DateUtil';
import DinasCalendar from '../../DinasPage/DataPegawai/DinasCalendar';
import useCommonApi from '../../shared/hooks/useCommonApi';
import usePersonalData from '../../shared/hooks/usePersonalData';
import Loader from '../../shared/Loader/Loader';

interface RekapCalendarProps {
  onShowDetail: (detail: DinasPegawaiKalenderData) => void;
}

function RekapCalendar(props: RekapCalendarProps) {
  const { onShowDetail } = props;
  const personalPegawai = usePersonalData();
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const year = 2023;
  const dates = React.useMemo(() => getFirstAndLastDaysOfYear(year), [year]);

  const endDateStr = React.useMemo(() => {
    if (selectedDate) {
      const nextMonth = selectedDate.getMonth() + 1;
      const endDate = new Date(selectedDate.getFullYear(), nextMonth, 0);
      return format(endDate, 'yyyy-MM-dd');
    }
    return '';
  }, [selectedDate]);

  const { data: kalendarData } = useCommonApi<GetDinasPegawaiKalenderReq, DinasPegawaiKalenderData>(
    KepegawaianAPI.GET_DINAS_PEGAWAI_KALENDER_V2,
    {
      pegawai_id: Number(personalPegawai?.pegawai_id),
      tgl_mulai: format(selectedDate || new Date(), 'yyyy-MM-dd'),
      tgl_selesai: endDateStr,
    },
    { method: 'get' },
    { skipCall: !selectedDate || !personalPegawai?.pegawai_id }
  );

  React.useEffect(() => {
    if (selectedDate && kalendarData) {
      onShowDetail(kalendarData);
    }
  }, [selectedDate, kalendarData, onShowDetail]);

  if (!personalPegawai?.pegawai_id) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="flex flex-row flex-wrap items-center justify-between border-b-[1px] px-6 py-4">
          <h3 className="text-md font-semibold tracking-wider text-gray-700 lg:text-xl">Rekap Kehadiran</h3>
        </div>
        <DinasCalendar />
      </div>

      <section aria-labelledby="section-1-title">
        <div className="mt-5 overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
          <div className="mb-5 flex flex-row items-center">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Daftar Transaksi</h3>
          </div>
          <div className="my-[24px] overflow-x-auto sm:mx-0">
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
                        KODE
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        BULAN
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        TANGGAL AWAL BULAN
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        TANGGAL AKHIR BULAN
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        AKSI
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(dates || []).map((data, dataIdx) => {
                      const formatMonth = format(data?.start || new Date(), 'MMMM', { locale: id });
                      const formatMonthCode = format(data?.start || new Date(), 'MMM', { locale: id });
                      const formatDateStart = format(data?.start || new Date(), 'yyyy-MM-dd');
                      const formatDateEnd = format(data?.end || new Date(), 'yyyy-MM-dd');
                      const uniqueCode = 23 + formatMonthCode + personalPegawai?.user_id;
                      return (
                        <tr key={dataIdx} className={'bg-white hover:bg-gray-100'}>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-400">{uniqueCode}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{formatMonth}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{formatDateStart}</td>
                          <td className="px-6 py-4 text-xs font-medium text-blue-900">{formatDateEnd}</td>
                          <td className="cursor-pointer px-6 py-4 text-xs font-medium text-green-700">
                            <button
                              onClick={() => {
                                setSelectedDate(data?.start);
                              }}
                              disabled={false}
                              type="button"
                              className={`inline-flex w-36 items-center justify-center rounded border border-transparent bg-indigo-600 px-2.5 py-2 text-center text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200`}
                            >
                              Rekap
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RekapCalendar;
