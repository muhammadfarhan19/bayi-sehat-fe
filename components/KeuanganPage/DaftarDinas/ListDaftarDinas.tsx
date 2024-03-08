import { AdjustmentsIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

import { RekapDinasAPI, UnitKerjaAPI } from '../../../constants/APIUrls';
import { GetRekapDinasKeuanganRes, GetRekapReq } from '../../../types/api/RekapDinasAPI';
import { GetUnitKerjaData } from '../../../types/api/UnitKerjaAPI';
import { formatDate } from '../../../utils/DateUtil';
import PeformaPegawai from '../../DinasPage/DetailDinas/PeformaPegawai';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';
import Pagination from '../../shared/Pagination';
import { ColourGrading, StatusDinas } from './Shared/_resources';

function ListDaftarDinas() {
  const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(true);
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const [filterState, setFilterState] = React.useState<GetRekapReq>({
    page: 1,
    per_page: 10,
  });

  const toggleAdvancedFilter = () => {
    setshowAdvancedFilter(!showAdvancedFilter);
  };

  const { data: listKeuanganDinas, isValidating: loadingListKeuanganDinas } = useCommonApi<
    GetRekapReq,
    GetRekapDinasKeuanganRes
  >(RekapDinasAPI.GET_DINAS_LIST, filterState, { method: 'GET' }, { revalidateOnMount: true });

  const { data: unitKerjaList } = useCommonApi<null, GetUnitKerjaData[]>(
    UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT,
    null,
    { method: 'GET' }
  );

  const changeFilterState = (inputState: Partial<GetRekapReq>) => {
    const pageAffected = Object.keys(inputState).includes('page');
    const newState = {
      ...filterState,
      ...inputState,
    };

    if (!pageAffected) {
      newState.page = 1;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setFilterState(newState), pageAffected ? 0 : 800);
  };

  return (
    <>
      <PeformaPegawai />

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-6">
          <div className="flex flex-row py-6">
            <p className="text-lg font-medium text-gray-900">Daftar Pembayaran</p>
            <div className="ml-auto flex">
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Cari..."
                onChange={e => {
                  changeFilterState({ isi_penugasan: e.target.value === '' ? undefined : e.target.value });
                }}
              />
              <button
                className="ml-1 rounded-md border border-gray-300 p-2 focus:bg-gray-50 focus:outline-none"
                onClick={toggleAdvancedFilter}
              >
                <AdjustmentsIcon className="h-5  w-5 animate-pulse text-gray-400" />
              </button>
            </div>
          </div>
          {showAdvancedFilter && (
            <div className="flex w-full flex-row gap-x-[16px]">
              <div className="w-[202px] pb-2">
                <p className="mb-[4px] text-[14px] font-normal">Unit Kerja</p>
                <select
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={e => changeFilterState({ unit_kerja_id: Number(e.target.value) })}
                >
                  <option value="">Semua</option>
                  {(unitKerjaList || []).map(item => (
                    <option key={item?.unit_kerja_id} value={item?.unit_kerja_id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-[202px] pb-2">
                <p className="mb-[4px] text-[14px] font-normal">Dari Tanggal</p>
                <input
                  type="date"
                  onChange={e => changeFilterState({ tgl_mulai: e.target.value === '' ? undefined : e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="w-[202px] pb-2">
                <p className="mb-[4px] text-[14px] font-normal">Sampai Tanggal</p>
                <input
                  type="date"
                  onChange={e => changeFilterState({ tgl_selesai: e.target.value === '' ? undefined : e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="w-[202px] pb-2">
                <p className="mb-[4px] text-[14px] font-normal">PUMK</p>
                <input
                  type="text"
                  onChange={e => changeFilterState({ pic_pumk: e.target.value === '' ? undefined : e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="PUMK"
                />
              </div>
            </div>
          )}
        </div>
        {loadingListKeuanganDinas ? (
          <div className="relative h-[150px] w-full divide-y divide-gray-200">
            <Loader />
          </div>
        ) : (
          <div className="flex">
            <div className="my-[24px] w-full overflow-x-auto sm:mx-0">
              <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                <table className="w-full table-auto rounded-lg bg-gray-100">
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
                        nomor surat
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Judul Kegiatan
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Waktu Kegiatan
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(listKeuanganDinas?.list || []).map((data, dataIdx) => {
                      return (
                        <tr
                          key={dataIdx}
                          className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                        >
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                          <td className="px-6 py-4 text-xs font-medium text-indigo-800">
                            <Link
                              href={`/keuangan/daftar-dinas?type=detail&dinas_id=${data?.dinas_id}&status=${data?.status_pembayaran_id}`}
                            >
                              <a className="cursor-pointer font-medium underline">{data?.no_sp}</a>
                            </Link>
                          </td>
                          <td className="px-6 text-xs font-medium text-gray-900">{data?.isi_penugasan}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {formatDate(new Date(data?.tgl_mulai), 'dd MMMM yyyy')} -{' '}
                            {formatDate(new Date(data?.tgl_selesai), 'dd MMMM yyyy')}
                          </td>
                          <td className="w-60 px-6 py-4 text-center text-[10px] font-medium text-gray-900">
                            <div
                              className={`rounded-md ${
                                data?.status_pembayaran_id === StatusDinas.MenungguPUMKDiproses
                                  ? ColourGrading.isMenunggu
                                  : data?.status_pembayaran_id === StatusDinas.DiprosesPUMK
                                  ? ColourGrading.isDiproses
                                  : data?.status_pembayaran_id === StatusDinas.DiajukanKeBPP
                                  ? ColourGrading.isDiajukan
                                  : data?.status_pembayaran_id === StatusDinas.DibayarkanBPP
                                  ? ColourGrading.isDibayarkan
                                  : data?.status_pembayaran_id === StatusDinas.Selesai
                                  ? ColourGrading.isSelesai
                                  : 'bg-white'
                              } px-2 py-2 text-white`}
                            >
                              {data?.status_pembayaran}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Pagination
                  onChange={value => {
                    changeFilterState({ page: value });
                  }}
                  totalData={listKeuanganDinas ? listKeuanganDinas?.pagination?.total_data : 0}
                  perPage={filterState?.per_page}
                  page={filterState?.page}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ListDaftarDinas;
