import { AdjustmentsIcon } from '@heroicons/react/outline';
import React from 'react';

import { MonthPicker } from '../../RekapPresensiPage/DetailPage/Shared';

const DaftarTransaksiMonthOptions = [
  'Semua',
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

interface DaftarTransaksiListProps {
  onShowDetail: (show: boolean, selectedDate?: Date) => void;
}

function DaftarTransaksiList(props: DaftarTransaksiListProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const handleDateChange = React.useCallback(
    (date: Date) => {
      setSelectedDate(date);
    },
    [selectedDate]
  );

  const onShowDetail = props.onShowDetail;

  return (
    <>
      <div className="mb-5 flex flex-row items-center px-4 pt-3">
        <h3 className="text-xl font-medium leading-6 text-gray-900">Daftar Transaksi</h3>
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
          <MonthPicker dataSet={DaftarTransaksiMonthOptions} onChange={handleDateChange} disableYear />
        </div>
        <div className="flex flex-row space-x-2">
          <button
            disabled
            className="w-36 rounded-[6px] bg-[#4F46E5] py-[9px] px-[2px] text-gray-50 disabled:bg-indigo-400"
          >
            Buat Transaksi
          </button>
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
                    className="py-3 text-center text-[10px] font-medium uppercase tracking-wider text-gray-500"
                  >
                    Kode
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-center text-[10px] font-medium uppercase tracking-wider text-gray-500"
                  >
                    Bulan/Tahun
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-center text-[10px] font-medium uppercase tracking-wider text-gray-500"
                  >
                    Tanggal
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-center text-[10px] font-medium uppercase tracking-wider text-gray-500"
                  >
                    Created by
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-center text-[10px] font-medium uppercase tracking-wider text-gray-500"
                  >
                    Last Sync
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-center text-[10px] font-medium uppercase tracking-wider text-gray-500"
                  >
                    Sync by
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-center text-[10px] font-medium uppercase tracking-wider text-gray-500"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={'bg-white hover:bg-gray-100'}>
                  <td className="px-4 py-4 text-justify text-[10px] font-medium text-gray-900">OGUHSBVF</td>
                  <td className="px-4 py-4 text-justify text-[10px] font-medium text-gray-900">Juli 2023</td>
                  <td className="px-4 py-4 text-justify text-[10px] font-medium text-gray-900">
                    01 Juli 2023-31 Juli 2023
                  </td>
                  <td className="px-4 py-4 text-justify text-[10px] font-medium text-gray-900">Abdul Hakim</td>
                  <td className="px-4 py-4 text-justify text-[10px] font-medium text-sky-500">
                    31 Juli 2023, 09:11:23
                  </td>
                  <td className="px-4 py-4 text-justify text-[10px] font-medium text-gray-900">Abdul Hakim</td>
                  <td className="px-4 py-4 text-justify text-[10px] font-medium text-gray-900">
                    <div className="flex flex-row items-center justify-between space-x-2">
                      <button
                        onClick={() => onShowDetail(true, selectedDate)}
                        type="button"
                        className="inline-flex items-center justify-center rounded border border-transparent bg-indigo-600 px-6 py-1 text-center text-[10px] font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-500 disabled:text-gray-200"
                      >
                        Detail
                      </button>
                      <button
                        disabled
                        type="button"
                        className={`inline-flex items-center justify-center rounded border border-transparent bg-green-500 px-6 py-1 text-center text-[10px] font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-300 disabled:text-white`}
                      >
                        Sync
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DaftarTransaksiList;
