import { ExclamationCircleIcon } from '@heroicons/react/outline';
import React from 'react';

import { LogHarianAPI } from '../../../constants/APIUrls';
import { GetLogHarianData, GetLogHarianReqYear } from '../../../types/api/LogHarianAPI';
import useCommonApi from '../../shared/hooks/useCommonApi';
import usePersonalData from '../../shared/hooks/usePersonalData';
import Loader from '../../shared/Loader/Loader';
import LogHarianPegPPNPNDetail from './LogHarianPegPPNPNDetail';
import { CALENDAR_MOCKING } from './Shared/_calendar';
import DatePicker from './Shared/DatePicker';

function LogHarianPegawai() {
  const [isShownEachDetailPage, setIsShownEachDetailPage] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [detailData, setDetailData] = React.useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const personalPegawaiData = usePersonalData();
  const isPpnpn = Number(personalPegawaiData?.status_cpns || 0) === 2;

  const { data: logHarianData, isValidating } = useCommonApi<GetLogHarianReqYear, GetLogHarianData[]>(
    LogHarianAPI.GET_LOG_HARIAN_MONTH,
    { pegawai_id: Number(personalPegawaiData?.pegawai_id), year: Number(selectedDate?.getFullYear()) },
    { method: 'GET' },
    { revalidateOnMount: true, skipCall: !personalPegawaiData?.pegawai_id }
  );

  const handleShowForm = (month: number, year: number) => {
    setDetailData({
      month,
      year,
    });
  };

  let newData = CALENDAR_MOCKING;
  const checkData = newData?.map(data => data?.year);
  if (Number(selectedDate?.getFullYear()) >= checkData?.[0]) {
    const currentMonth = new Date().getMonth() + 1;
    const wholeMonth = 12;
    const sliceMonth = wholeMonth - currentMonth;
    newData = CALENDAR_MOCKING?.slice(sliceMonth, newData?.length);
  }

  if (isValidating) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  const submittedDataMap = logHarianData?.reduce((res, item) => {
    res[item?.log_month] = item;
    return res;
  }, {} as Record<number, GetLogHarianData>);

  return (
    <>
      {isShownEachDetailPage ? (
        <LogHarianPegPPNPNDetail
          selectedYear={detailData?.year}
          selectedMonth={detailData?.month}
          onBack={() => {
            setIsShownEachDetailPage(false);
            setTimeout(() => window.location.reload(), 500);
          }}
        />
      ) : (
        <section aria-labelledby="section-1-title">
          <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
            <div className="mb-5 flex flex-row items-center">
              <h3 className="text-xl font-medium leading-6 text-gray-900">Log Harian</h3>
            </div>
            {personalPegawaiData?.status_cpns === 1 ? (
              <div className="mb-5 mt-2 inline-flex flex-wrap items-center space-x-2">
                <ExclamationCircleIcon width={20} height={20} color="#FBBF24" />
                <p className="text-[16px] font-normal">Mohon isi log harian di web</p>
                <a
                  href="http:skp.sdm.kemdikbud.go.id/skp/site/login.jsp"
                  className="text-[12px] font-normal text-indigo-600 underline lg:text-[16px]"
                >
                  {` http:skp.sdm.kemdikbud.go.id/skp/site/login.jsp`}
                </a>
              </div>
            ) : null}
            <div className="flex w-full flex-row">
              <DatePicker onChange={date => setSelectedDate(date)} />
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
                          {!isPpnpn && (
                            <th
                              scope="col"
                              className="w-30 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                              NILAI
                            </th>
                          )}
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
                          const submittedData = submittedDataMap?.[data?.id];
                          if (Number(selectedDate?.getFullYear()) > data?.year) {
                            return;
                          }
                          return (
                            <tr key={data?.id} className={'bg-white hover:bg-gray-100'}>
                              <td className="px-6 py-4 text-xs font-normal text-gray-900">{data?.name}</td>
                              <td className="px-6 py-4 text-xs text-[20px] font-bold text-gray-900">{data?.title}</td>
                              {!isPpnpn && <td className="px-6 py-4 text-[14px]">{submittedData?.score || 0}</td>}
                              <td className="cursor-pointer px-6 py-4 text-xs font-medium text-blue-900">
                                {!submittedData?.number_of_day_filled ? (
                                  <div className="flex flex-row items-center space-x-2">
                                    <div className="text-[14px] text-red-600">Belum diisi</div>
                                  </div>
                                ) : +submittedData?.number_of_day_filled < 20 ? (
                                  <div className="flex flex-row items-center space-x-2">
                                    <div className="text-[14px] text-yellow-400">
                                      Sudah diisi {submittedData?.number_of_day_filled}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-row items-center space-x-2">
                                    <div className="text-[14px] text-green-600">
                                      Sudah diisi {submittedData?.number_of_day_filled}
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 text-xs font-medium">
                                <button
                                  onClick={() => {
                                    handleShowForm(data?.id, Number(selectedDate?.getFullYear()));
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
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default LogHarianPegawai;
