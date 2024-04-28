import { AdjustmentsIcon, ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { SummaryAPI, UnitKerjaAPI } from '../../../../constants/APIUrls';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import { type DaftarTransaksi } from '../../../../types/api/DaftarTransaksiAPI';
import { SummaryDownloadReq, SummaryDownloadRes, SummaryListData, SummaryReq } from '../../../../types/api/SummaryAPI';
import { type GetUnitKerjaData } from '../../../../types/api/UnitKerjaAPI';
import { callAPI } from '../../../../utils/Fetchers';
import { CircleProgress } from '../../../shared/CircleProgress';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import Loader from '../../../shared/Loader/Loader';
import Pagination from '../../../shared/Pagination';
import { type TabName } from '../../RekapPresensiPage/Shared/types/_sharedType';

type DaftarTransaksiDetailProps = {
  onBack: () => void;
  selectedDate?: Date;
  code?: string;
  selectedTab: string | TabName;
};

function SummaryGajiDetail(props: DaftarTransaksiDetailProps) {
  const properties = props;
  const dispatch = useDispatch();
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const isCodeUnavail = properties.code?.trim()?.length === 0;

  const [isLoading, setIsLoading] = React.useState(false);
  const [filterState, setFilterState] = React.useState<DaftarTransaksi.Request>({
    page: 1,
    per_page: 10,
    kode_transaksi: String(properties.code),
    type:
      properties?.selectedTab === 'Master PNS' ? 'pns' : properties?.selectedTab === 'Master PPNPN' ? 'ppnpn' : 'pppk',
  });

  const { data: unitKerjaList } = useCommonApi<null, GetUnitKerjaData[]>(
    UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT,
    null,
    { method: 'GET' }
  );

  const { data: daftarTransaksiList, isValidating } = useCommonApi<SummaryReq, SummaryListData>(
    SummaryAPI.GET_SUMMARY_LIST,
    filterState,
    { method: 'GET' },
    { skipCall: isCodeUnavail, revalidateOnMount: true }
  );

  const changeFilterState = (inputState: Partial<DaftarTransaksi.Request>) => {
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

  const handleDownloadSummary = async () => {
    setIsLoading(true);
    const callApiDownload = await callAPI<SummaryDownloadReq, SummaryDownloadRes>(
      SummaryAPI.GET_SUMMARY_EXPORT,
      filterState,
      { method: 'GET', isBlob: true, timeout: 120000 }
    );

    if (callApiDownload.status === 200 && callApiDownload.data instanceof Blob) {
      let url = '';
      url = window.URL.createObjectURL(callApiDownload.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Summary Data' + '.xlsx');
      document.body.appendChild(link);
      link.click();
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil di Download.',
          type: SnackbarType.INFO,
        })
      );
      setIsLoading(false);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: `[${callApiDownload.status}] - Gagal Download data. Mohon coba beberapa saat lagi.`,
          type: SnackbarType.ERROR,
        })
      );
      setIsLoading(false);
    }
  };

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
            onChange={e => changeFilterState({ search: e.target.value })}
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
              onChange={e => changeFilterState({ unit_kerja: e.target.value })}
            >
              <option value="">Semua</option>
              {(unitKerjaList || []).map((item, index) => (
                <option key={`options-${index}`} value={item?.name}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="my-5 flex flex-row items-center justify-between px-5">
        <div className="w-[202px]">
          <h3 className="text-xl font-medium leading-6 text-gray-900">Data Summary Transaksi</h3>
        </div>
        <div>
          <button
            className="ml-1 inline-flex items-center gap-x-2 rounded-md border border-indigo-600 bg-indigo-600 p-2 px-3 text-sm text-white hover:bg-indigo-700 focus:outline-none disabled:bg-gray-500 disabled:text-gray-300"
            onClick={handleDownloadSummary}
            disabled={isLoading}
          >
            {!isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            ) : (
              <div className="flex items-center justify-center">
                <CircleProgress containerStyle="h-4 w-4 animate-spin text-white" />
              </div>
            )}
            Download
          </button>
        </div>
      </div>

      {isValidating ? (
        <div className="relative h-[150px] w-full divide-y divide-gray-200">
          <Loader />
        </div>
      ) : (
        <div className="my-[24px]  sm:mx-0 ">
          <div className="overflow-x-auto">
            <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
              <div className="sm:rounded-lg">
                <table className="w-full table-auto overflow-auto rounded-lg bg-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        { text: 'NO' },
                        { text: 'Nama' },
                        { text: 'Badge' },
                        { text: 'Lingkup Koordinasi' },
                        { text: 'Jumlah TK / Alpa' },
                        { text: 'Detail Tanggal TK' },
                        { text: 'Total Presentase Telat' },
                        { text: 'Total Presentase PSW' },
                        { text: 'Total Presentase TK / Alpa' },
                        { text: 'Kumulatif Jam Telat' },
                        { text: 'Kumulatif Jam Psw' },
                      ].map(each => (
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          {each.text}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(daftarTransaksiList?.list || []).map((each, index) => (
                      <tr className={'bg-white hover:bg-gray-100'} key={index}>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                          {filterState.per_page * (filterState.page - 1) + (index + 1)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{each.name}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          {each.badge_number}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          {each.lingkup_koordinasi}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          {each.jumlah_tk}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          {each.detail_tanggal_tk}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          {(parseFloat(each.percent_telat) * 100).toFixed(2)} %
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          {(parseFloat(each.percent_psw) * 100).toFixed(2)} %
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          {(parseFloat(each.percent_tk) * 100).toFixed(2)} %
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          {each.kumulatif_jam_telat}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          {each.kumulatif_jam_psw}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Pagination
            onChange={value => {
              changeFilterState({ page: value });
            }}
            totalData={daftarTransaksiList ? daftarTransaksiList?.pagination.total_data : 0}
            perPage={filterState?.per_page}
            page={filterState?.page}
          />
        </div>
      )}
    </>
  );
}

export default SummaryGajiDetail;
