import { AdjustmentsIcon, ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import { UnitKerjaAPI } from '../../../../constants/APIUrls';
import { GetUnitKerjaData } from '../../../../types/api/UnitKerjaAPI';
import useCommonApi from '../../../shared/hooks/useCommonApi';

type DaftarTransaksiDetailProps = {
  onBack: () => void;
};

function DaftarTransaksiDetail(props: DaftarTransaksiDetailProps) {
  const properties = props;

  const { data: unitKerjaList } = useCommonApi<null, GetUnitKerjaData[]>(
    UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT,
    null,
    { method: 'GET' }
  );

  return (
    <>
      <div className="px-5 pt-5 pb-1">
        <span onClick={properties.onBack} className="mb-5 flex cursor-pointer flex-row items-center gap-x-2">
          <ChevronLeftIcon className="h-5 w-5" />
          <div>Daftar Transaksi</div>
        </span>
      </div>
      <div className="mb-1 flex flex-row items-center px-4">
        <h3 className="text-xl font-medium leading-6 text-gray-900">Kode Transaksi : OGUHSBVF</h3>
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

      <div className="flex flex-row items-center justify-between border-b-2 px-5">
        <div className="w-[202px]">
          <p className="mb-[4px] text-[14px] font-normal">Unit Kerja</p>
          <select
            className="mb-10 block w-full appearance-none truncate rounded-md border border-gray-300 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
            disabled
          >
            <option value="">Semua</option>
            {(unitKerjaList || []).map((item, index) => (
              <option key={`options-${index}`} value={item?.unit_kerja_id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            disabled
            className="w-36 rounded-[6px] bg-amber-500 py-[9px] px-[2px] text-gray-50 disabled:bg-amber-500"
          >
            Sync Ulang
          </button>
        </div>
      </div>
      <div className="my-5 flex flex-row items-center justify-between px-5">
        <div className="w-[202px]">
          <h3 className="text-xl font-medium leading-6 text-gray-900">Data Rekap</h3>
        </div>
        <div>
          <button
            disabled
            className="w-36 rounded-[6px] bg-indigo-600 py-[9px] px-[2px] text-gray-50 disabled:bg-indigo-600"
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
}

export default DaftarTransaksiDetail;
