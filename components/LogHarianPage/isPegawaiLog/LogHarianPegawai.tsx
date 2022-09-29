import { AdjustmentsIcon, ExclamationCircleIcon } from '@heroicons/react/outline';
import React from 'react';

import { LogHarianAPI } from '../../../constants/APIUrls';
import { GetLogHarianData, GetLogHarianReqYear } from '../../../types/api/LogHarianAPI';
import DatePicker from '../../DinasPage/DataPegawai/DatePicker';
import useCommonApi from '../../shared/hooks/useCommonApi';
import usePersonalData from '../../shared/hooks/usePersonalData';
import Loader from '../../shared/Loader/Loader';
import LogHarianPegPPNPNDetail from './LogHarianPegPPNPNDetail';
import { CALENDAR_MOCK } from './Shared/_calendar';

function LogHarianPegawai() {
  const [isShownEachDetailPage, setIsShownEachDetailPage] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [detailData, setDetailData] = React.useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const personalPegawaiData = usePersonalData();

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

  let newData = CALENDAR_MOCK;
  const checkData = newData?.map(data => data?.year);
  if (Number(selectedDate?.getFullYear()) >= checkData?.[0]) {
    const currentMonth = new Date().getMonth() + 1;
    const wholeMonth = 12;
    const sliceMonth = wholeMonth - currentMonth;
    newData = CALENDAR_MOCK?.slice(0, newData?.length - sliceMonth);
  }

  if (isValidating) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

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
            {personalPegawaiData?.status_cpns === 1 ? (
              <div className="mb-5 mt-2 flex flex-row items-center space-x-2">
                <ExclamationCircleIcon width={20} height={20} color="#FBBF24" />
                <div className="flex flex-row items-center space-x-1">
                  <p className="text-[16px] font-normal">Mohon isi log harian di web</p>
                  <a
                    href="http://skp.sdm.kemdikbud.go.id/skp/site/login.jsp"
                    className="text-[16px] font-normal text-indigo-600 underline"
                  >
                    {` http://skp.sdm.kemdikbud.go.id/skp/site/login.jsp`}
                  </a>
                </div>
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
                          <th
                            scope="col"
                            className="w-30 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            ISIAN LOG HARIAN
                          </th>
                          {/* <th
                            scope="col"
                            className="w-30 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            NILAI
                          </th> */}
                          <th
                            scope="col"
                            className="w-50 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {newData.map(data => {
                          const submittedData = logHarianData?.filter(item => item?.log_month === data?.id);
                          const returnData = submittedData?.map(list => list?.submited_log);
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
                                    {/* <XCircleIcon width={14.67} height={14.67} fill={'#F24E1E'} /> */}
                                    <div className="text-[14px] text-red-600">Belum diisi</div>
                                  </div>
                                ) : returnData?.[0] < 20 ? (
                                  <div className="flex flex-row items-center space-x-2">
                                    {/* <ArchiveIcon width={14.67} height={14.67} fill={'#FBBF24'} /> */}
                                    <div className="text-[14px] text-yellow-400">Sudah diisi {returnData?.[0]}</div>
                                  </div>
                                ) : (
                                  <div className="flex flex-row items-center space-x-2">
                                    {/* <CheckCircleIcon width={14.67} height={14.67} fill={'#29CC6A'} /> */}
                                    <div className="text-[14px] text-green-600">Sudah diisi {returnData?.[0]}</div>
                                  </div>
                                )}
                              </td>
                              {/* <td
                                className="cursor-pointer px-6 py-4 text-xs font-medium text-blue-900"
                                onClick={() => null}
                              >
                         
                              </td> */}
                              <td className="px-6 py-4 text-xs font-medium">
                                <button
                                  onClick={() => {
                                    // handleShowForm(Number(detailMonth?.[0]),Number(detailYear?.[0]));
                                    handleShowForm(data?.id, Number(selectedDate?.getFullYear()));
                                    setTimeout(() => {
                                      setIsShownEachDetailPage(true);
                                    }, 500);
                                  }}
                                  type="button"
                                  className={`inline-flex w-full items-center justify-center rounded border border-indigo-600 bg-white px-2.5 py-2 text-center text-xs font-medium text-indigo-600 shadow-sm hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-200`}
                                >
                                  {/* {returnData?.[0] === undefined || returnData?.[0] < 20 ? 'Tulis Log' : 'Lihat Detail'} */}
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
