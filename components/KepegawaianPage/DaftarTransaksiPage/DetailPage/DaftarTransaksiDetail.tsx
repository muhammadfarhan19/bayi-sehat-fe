import { AdjustmentsIcon, ChevronLeftIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import id from 'date-fns/locale/id';
import React from 'react';

import { DaftarTransaksiAPI, UnitKerjaAPI } from '../../../../constants/APIUrls';
import { HyphenText, UnavailableDataText } from '../../../../constants/Resource';
import { type DaftarTransaksi } from '../../../../types/api/DaftarTransaksiAPI';
import { type GetUnitKerjaData } from '../../../../types/api/UnitKerjaAPI';
import { formatStringDate } from '../../../../utils/DateUtil';
import { checkReturnValueOfString } from '../../../../utils/StringUtil';
import { months } from '../../../DinasPage/DataPegawai/DatePicker';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import { ExpandableTableData } from '../../RekapPresensiPage/DetailPage/Shared';
import { type TabName } from '../../RekapPresensiPage/Shared/types/_sharedType';
import { useResyncTransaction } from '../utils';

type DaftarTransaksiDetailProps = {
  onBack: () => void;
  selectedDate?: Date;
  code?: string;
  selectedTab: string | TabName;
};

function DaftarTransaksiDetail(props: DaftarTransaksiDetailProps) {
  const properties = props;
  const reSync = useResyncTransaction();
  const { data: unitKerjaList } = useCommonApi<null, GetUnitKerjaData[]>(
    UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT,
    null,
    { method: 'GET' }
  );
  const isCodeUnavail = properties.code?.trim?.length === 0;

  const { data: daftarTransaksiList, mutate } = useCommonApi<DaftarTransaksi.Request, DaftarTransaksi.Response>(
    DaftarTransaksiAPI.GET_DAFTAR_TRANSAKSI,
    {
      kode: String(properties.code),
      type: properties?.selectedTab === 'Master PNS' ? [1, 3] : [2],
    },
    { method: 'GET' },
    { skipCall: isCodeUnavail }
  );

  const selectedYear =
    typeof properties.selectedDate !== 'undefined' ? format(properties.selectedDate, 'yyyy', { locale: id }) : '';
  const selectedMonth =
    typeof properties.selectedDate !== 'undefined' ? months[properties?.selectedDate?.getMonth() - 1] : '';

  const renderMonthComponent =
    selectedMonth === undefined ? null : (
      <div>
        <>
          <p className="mb-[4px] text-[14px] font-normal">Bulan</p>
          <div className="mb-10 block block flex appearance-none items-center justify-center rounded-md border border-gray-300 py-2 px-6 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm">
            {selectedMonth}
          </div>
        </>
      </div>
    );

  const renderYearComponent =
    selectedYear === undefined ? null : (
      <div>
        <p className="mb-[4px] text-[14px] font-normal">Tahun</p>
        <div className="mb-10 block block flex appearance-none items-center justify-center rounded-md border border-gray-300 py-2 px-6 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm">
          {selectedYear}
        </div>
      </div>
    );

  const handleResync = React.useCallback(() => {
    if (properties.code) {
      return reSync.syncHandler({
        code: properties.code,
        onSuccess: mutate,
      });
    }
  }, [properties.code]);

  return (
    <>
      <div className="px-5 pt-5 pb-1">
        <span onClick={properties.onBack} className="mb-5 flex cursor-pointer flex-row items-center gap-x-2">
          <ChevronLeftIcon className="h-5 w-5" />
          <div>Daftar Transaksi</div>
        </span>
      </div>
      <div className="mb-1 flex flex-row items-center px-4">
        <h3 className="text-xl font-medium leading-6 text-gray-900">Kode Transaksi : {properties.code || '-'}</h3>
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
        <div className="flex flex-row space-x-5">
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
          {renderMonthComponent}
          {renderYearComponent}
        </div>
        <div>
          <button
            onClick={handleResync}
            type="button"
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
                    Hari dan Tanggal
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
                    Status Hadir
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Status PSW
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
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Pengurang Lupa Absen Datang(%)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Pengurang Lupa Absen Pulang(%)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Last Sync
                  </th>
                </tr>
              </thead>
              <tbody>
                {(daftarTransaksiList?.list ?? [])?.map((data, index) => {
                  const dataPsw = data?.summary?.psw;
                  const dataTelat = data?.summary?.telat;
                  const dataStatusPsw = data?.summary?.status_psw;
                  const isBelowZeroPSW = dataPsw < 0 ? HyphenText : dataPsw;
                  const isBelowZeroDataTelat = dataTelat < 0 ? HyphenText : dataTelat;
                  const isBelowZeroDataStatusPsw = dataStatusPsw < 0 ? HyphenText : dataStatusPsw;
                  return (
                    <tr className={'bg-white hover:bg-gray-100'} key={index}>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.nip}</td>
                      <td className="truncate px-6 py-4 text-xs font-medium text-blue-900">{data?.name}</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        <ExpandableTableData data={data?.unit_kerja} expandClass={'w-40 cursor-pointer'} />
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.date}</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        {checkReturnValueOfString(data?.shift_check_in)}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        {checkReturnValueOfString(data?.shift_check_out)}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium">{checkReturnValueOfString(data?.check_in)}</td>
                      <td className="px-6 py-4 text-xs font-medium">{checkReturnValueOfString(data?.check_out)}</td>
                      <td className="px-6 py-4 text-xs font-medium">{isBelowZeroDataTelat}</td>
                      <td className="px-6 py-4 text-xs font-medium">{isBelowZeroPSW}</td>
                      <td className="py-2 text-xs font-medium">
                        {checkReturnValueOfString(data?.status, UnavailableDataText)}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium">{isBelowZeroDataStatusPsw}</td>
                      <td className="px-6 py-4 text-xs font-medium">{data?.summary?.status_telat}</td>
                      <td className="px-6 py-4 text-xs font-medium">{data?.summary?.status_tk}</td>
                      <td className="px-6 py-4 text-xs font-medium">
                        {checkReturnValueOfString(data?.summary?.pengurangan_tk)}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium">
                        {checkReturnValueOfString(data?.summary?.pengurangan_terlambat)}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium">
                        {checkReturnValueOfString(data?.summary?.pengurangan_psw)}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium">
                        {checkReturnValueOfString(data?.summary?.pengurangan_lupa_absen_datang)}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium">
                        {checkReturnValueOfString(data?.summary?.pengurangan_lupa_absen_pulang)}
                      </td>
                      <td className="truncate px-6 py-4 text-xs font-medium">
                        {checkReturnValueOfString(
                          formatStringDate(data?.summary?.updated_at, 'EEEE, dd MMM yyyy, HH:mm:ss'),
                          formatStringDate(data?.summary?.created_at, 'EEEE, dd MMM yyyy, HH:mm:ss')
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DaftarTransaksiDetail;
