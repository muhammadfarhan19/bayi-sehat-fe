import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import { DinasPegawaiKalenderData } from '../../../types/api/KepegawaianAPI';
import { formatStringDate, handleCheckTime, weekendText, weekendTextLocaleId } from '../../../utils/DateUtil';

export interface DateProps {
  start: Date;
  end: Date;
}

type DetailRekapProps = {
  detail?: DinasPegawaiKalenderData;
  dates?: DateProps;
  onBack: () => void;
};

function RekapDetail(props: DetailRekapProps) {
  const { detail, onBack } = props;

  return (
    <>
      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
          <span onClick={onBack} className="mb-5 flex cursor-pointer flex-row items-center gap-x-2">
            <ChevronLeftIcon className="h-5 w-5" />
            <div>Kembali</div>
          </span>

          <div className="mb-5 flex flex-row items-center">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Daftar Transaksi</h3>
          </div>
          {detail?.list_presensi === null ? (
            <p className="text-md font-medium text-gray-500">Rekap Presensi tidak terisi untuk Bulan ini</p>
          ) : (
            <>
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
                            Tanggal
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Jam Masuk
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Jam Pulang
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          {(detail?.list_presensi || []).map((data, dataIdx) => {
                            const { check_in, check_out, date, status_str, status } = data;
                            const isWeekend = status === 7;
                            const isUnpresence = status === 5;
                            const isDinas = status === 6;
                            const formatDate = formatStringDate(date, 'dd MMMM yyyy');
                            const returnTimeIn = check_in ? handleCheckTime(check_in) : '~';
                            const returnTimeOut = check_out ? handleCheckTime(check_out) : '~';
                            return (
                              <tr key={dataIdx} className={'bg-white hover:bg-gray-100'}>
                                <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                                <td className="cursor-pointer px-6 py-4 text-xs font-medium text-gray-900">
                                  {formatDate}
                                </td>
                                <td className="px-6 py-4 text-xs font-medium text-gray-900">{returnTimeIn}</td>
                                <td className="px-6 py-4 text-xs font-medium text-gray-900">{returnTimeOut}</td>
                                <td
                                  className={`px-6 py-4 text-xs font-medium ${isWeekend && 'text-red-500'} ${
                                    isUnpresence && 'text-yellow-400'
                                  } ${isDinas && 'text-green-600'}`}
                                >
                                  {status_str === weekendText ? weekendTextLocaleId : status_str}
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default RekapDetail;
