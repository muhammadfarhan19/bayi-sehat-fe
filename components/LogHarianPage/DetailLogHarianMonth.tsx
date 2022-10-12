import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import { LogHarianAPI } from '../../constants/APIUrls';
import { GetLogHarianData, GetLogHarianReqYear } from '../../types/api/LogHarianAPI';
import useCommonApi from '../shared/hooks/useCommonApi';
import DetailLogHarianWeek from './DetailLogHarianWeek';
import { CALENDAR_MOCKING } from './isPegawaiLog/Shared/_calendar';
import DatePicker from './isPegawaiLog/Shared/DatePicker';

interface DetailLogHarianProps {
  onBack?: () => void;
  pegawai_id: number;
  yearSelected?: number;
}

function DetailLogHarianMonth(props: DetailLogHarianProps) {
  const { onBack, pegawai_id } = props;

  const [isShownEachDetailPage, setIsShownEachDetailPage] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [detailData, setDetailData] = React.useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    pegawai_id: pegawai_id,
  });

  const { data: logHarianData } = useCommonApi<GetLogHarianReqYear, GetLogHarianData[]>(
    LogHarianAPI.GET_LOG_HARIAN_MONTH,
    { pegawai_id: Number(pegawai_id), year: Number(selectedDate?.getFullYear()) },
    { method: 'GET' },
    { revalidateOnMount: true }
  );

  let newData = CALENDAR_MOCKING;
  const checkData = newData?.map(data => data?.year);
  if (Number(selectedDate?.getFullYear()) >= checkData?.[0]) {
    const currentMonth = new Date().getMonth() + 1;
    const wholeMonth = 12;
    const sliceMonth = wholeMonth - currentMonth;
    newData = CALENDAR_MOCKING?.slice(sliceMonth, newData?.length);
  }

  const handleShowForm = (month: number, year: number, pegawai_id: number) => {
    setDetailData({
      month,
      year,
      pegawai_id,
    });
  };

  const toggleDetailPage = () => {
    setIsShownEachDetailPage(!isShownEachDetailPage);
  };

  return (
    <>
      {isShownEachDetailPage ? (
        <DetailLogHarianWeek
          selectedMonth={detailData?.month}
          selectedYear={detailData?.year}
          pegawai_id={detailData?.pegawai_id}
          onBack={toggleDetailPage}
        />
      ) : (
        <section aria-labelledby="section-1-title">
          <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
            <div className="my-3 inline-flex cursor-pointer items-center bg-white" onClick={onBack}>
              <ChevronLeftIcon className="mr-1 h-5" />
              <span className="bg-white tracking-wide text-gray-600">Kembali</span>
            </div>
            <div className="mb-5 flex flex-row items-center">
              <h3 className="text-xl font-medium leading-6 text-gray-900">Log Harian</h3>
            </div>

            <div className="flex w-full flex-row gap-x-[16px]">
              <div className="w-[202px] pb-2">
                <div className="flex w-full flex-row">
                  <DatePicker onChange={date => setSelectedDate(date)} />
                </div>
                {/* <select
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  //   onChange={e => search('unit_kerja_id', e.target.value)}
                >
                  <option value="">Semua</option>
                
                </select> */}
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
                          className="w-30 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          BULAN-KE
                        </th>

                        <th
                          scope="col"
                          className="w-30 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          BULAN
                        </th>
                        <th
                          scope="col"
                          className="w-30 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          ISIAN LOG HARIAN
                        </th>
                        <th
                          scope="col"
                          className="w-50 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {newData?.map(data => {
                        const submittedData = logHarianData?.filter(item => item?.log_month === data?.id);

                        const returnData = submittedData?.map(list => list?.number_of_day_filled);
                        if (Number(selectedDate?.getFullYear()) > data?.year) {
                          return;
                        }
                        return (
                          <tr key={data?.id} className={'bg-white hover:bg-gray-100'}>
                            <td className="px-6 py-4 text-xs font-normal text-gray-900">{data?.name}</td>
                            <td className="px-6 py-4 text-xs text-[20px] font-bold text-gray-900">{data?.title}</td>
                            <td className="cursor-pointer px-6 py-4 text-xs font-medium text-blue-900">
                              {returnData?.[0] === undefined || returnData?.[0] === 0 ? (
                                <div className="flex flex-row items-center space-x-2">
                                  <div className="text-[14px] text-red-600">Belum diisi</div>
                                </div>
                              ) : returnData?.[0] < 20 ? (
                                <div className="flex flex-row items-center space-x-2">
                                  <div className="text-[14px] text-yellow-400">Sudah diisi {returnData?.[0]}</div>
                                </div>
                              ) : (
                                <div className="flex flex-row items-center space-x-2">
                                  <div className="text-[14px] text-green-600">Sudah diisi {returnData?.[0]}</div>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 text-xs font-medium">
                              <button
                                onClick={() => {
                                  handleShowForm(
                                    data?.id,
                                    Number(selectedDate?.getFullYear()),
                                    Number(logHarianData?.[0]?.peg_id)
                                  );
                                  setTimeout(() => {
                                    setIsShownEachDetailPage(true);
                                  }, 500);
                                }}
                                type="button"
                                className={`inline-flex w-full items-center justify-center rounded border border-indigo-600 bg-white px-2.5 py-2 text-center text-xs font-medium text-indigo-600 shadow-sm hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-200`}
                              >
                                Lihat Detail
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
      )}
    </>
  );
}

export default DetailLogHarianMonth;
