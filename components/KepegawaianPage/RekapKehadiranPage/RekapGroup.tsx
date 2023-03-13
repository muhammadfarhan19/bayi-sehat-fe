import format from 'date-fns/format';
import id from 'date-fns/locale/id';
import React from 'react';

import { getFirstAndLastDaysOfYear } from '../../../utils/DateUtil';
import DatePicker from '../../LogHarianPage/isPegawaiLog/Shared/DatePicker';

export interface SelectedData {
  dateStarted: string;
  dateEnded: string;
}

interface RekapGroupProps {
  onSelectedDateDetail: (detail: SelectedData) => void;
}

function RekapGroup(props: RekapGroupProps) {
  const { onSelectedDateDetail } = props;
  const year = new Date().getFullYear();
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const dates = getFirstAndLastDaysOfYear(selectedDate?.getFullYear() ?? year);
  const handleDateChange = React.useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const formattedDates = React.useMemo(() => {
    return dates.map(data => {
      const formatMonth = format(data.start, 'MMMM', { locale: id });
      const formatMonthCode = format(data.start, 'MMM', { locale: id });
      const formatDateStart = format(data.start, 'yyyy-MM-dd');
      const formatDateEnd = format(data.end, 'yyyy-MM-dd');
      const uniqueCode = 23 + formatMonthCode;
      return { formatMonth, formatDateStart, formatDateEnd, uniqueCode };
    });
  }, [dates]);

  return (
    <>
      <section aria-labelledby="section-1-title">
        <div className="mt-2 overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
          <div className="mb-5 flex flex-row items-center">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Daftar Transaksi</h3>
          </div>
          <DatePicker onChange={handleDateChange} />
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
                        DETAIL
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        SYNC
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(formattedDates || []).map((data, index) => {
                      return (
                        <tr key={index} className={'bg-white hover:bg-gray-100'}>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{index + 1}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-400">{data.uniqueCode}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.formatMonth}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.formatDateStart}</td>
                          <td className="px-6 py-4 text-xs font-medium text-blue-900">{data.formatDateEnd}</td>
                          <td className="cursor-pointer px-6 py-4 text-xs font-medium text-green-700">
                            <button
                              onClick={() => {
                                onSelectedDateDetail({
                                  dateStarted: data?.formatDateStart,
                                  dateEnded: data?.formatDateEnd,
                                });
                              }}
                              disabled={false}
                              type="button"
                              className={`inline-flex w-16 items-center justify-center rounded border border-transparent bg-indigo-600 px-2.5 py-1 text-center text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200`}
                            >
                              Detail
                            </button>
                          </td>
                          <td className="cursor-pointer px-6 py-4 text-xs font-medium text-green-700">
                            <button
                              onClick={() => {
                                setSelectedDate(dates[index]?.start);
                              }}
                              disabled={false}
                              type="button"
                              className={`inline-flex w-16 items-center justify-center rounded border border-transparent bg-green-500 px-2.5 py-1 text-center text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-200 disabled:text-gray-200`}
                            >
                              Sync
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

export default RekapGroup;
