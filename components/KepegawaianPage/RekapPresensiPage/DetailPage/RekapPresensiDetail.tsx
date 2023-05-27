import { AdjustmentsIcon, ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import { type PegawaiData } from '../../../../types/api/KepegawaianAPI';
import Pagination from '../../../shared/Pagination';
import { ModalResend, MonthPicker } from './Shared';

interface RekapPresensiDetailProps {
  detailPegawai: PegawaiData;
  onBack: () => void;
}

function RekapPresensiDetail(props: RekapPresensiDetailProps) {
  const { detailPegawai, onBack } = props;

  const [selectedDate, setSelectedDate] = React.useState<Date>();
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

  return (
    <>
      <div className="pl-5 pt-5">
        <span onClick={onBack} className="flex cursor-pointer flex-row items-center gap-x-2">
          <ChevronLeftIcon className="h-5 w-5" />
          <div>Kembali</div>
        </span>
      </div>

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
            disabled
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
                </tr>
              </thead>
              <tbody>
                <tr className={'bg-white hover:bg-gray-100'}>
                  <td className="px-6 py-4 text-xs font-medium text-gray-900">{1}</td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-900">{detailPegawai?.nip}</td>
                  <td className="px-6 py-4 text-xs font-medium text-blue-900">{detailPegawai?.name}</td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-900">{detailPegawai?.unit_kerja}</td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-900">{'01-Jan-2023'}</td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-900">{'-'}</td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-900">{'07.30'}</td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-900">{'16.30'}</td>
                  <td className="px-6 py-4 text-xs font-medium">{'08.45'}</td>
                  <td className="px-6 py-4 text-xs font-medium">{'15.45'}</td>
                </tr>
              </tbody>
            </table>
            <Pagination onChange={() => null} totalData={1} perPage={1} page={1} />
          </div>
        </div>
      </div>
      {formModalState?.open && (
        <ModalResend open={formModalState?.open} setOpen={(open: boolean) => handleShowForm(open, 0)} />
      )}
    </>
  );
}

export default RekapPresensiDetail;
