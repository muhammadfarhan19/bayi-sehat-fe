import { AdjustmentsIcon, ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { GajiPegawai, UnitKerjaAPI } from '../../../../constants/APIUrls';
// import { GajiPegawai, ResumeAPI, UnitKerjaAPI } from '../../../../constants/APIUrls';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import { ResumeDownloadReq, ResumeDownloadRes } from '../../../../types/api/ResumeAPI';
import { ResumeGaji, ResumeGajiList } from '../../../../types/api/ResumeGajiAPI';
import { GetUnitKerjaData } from '../../../../types/api/UnitKerjaAPI';
// import { type GetUnitKerjaData } from '../../../../types/api/UnitKerjaAPI';
import { callAPI } from '../../../../utils/Fetchers';
import { CircleProgress } from '../../../shared/CircleProgress';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import Loader from '../../../shared/Loader/Loader';
import Pagination from '../../../shared/Pagination';
// import { YearPicker } from '../../DaftarTransaksiPage/Shared';
// import { MonthPicker } from '../../RekapPresensiPage/DetailPage/Shared';
import { type TabName } from '../../RekapPresensiPage/Shared/types/_sharedType';

type DaftarTransaksiDetailProps = {
  onBack: () => void;
  selectedDate?: Date;
  code?: string;
  selectedTab: string | TabName;
};

function ResumeGajiDetail(props: DaftarTransaksiDetailProps) {
  const properties = props;
  const dispatch = useDispatch();
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const isCodeUnavail = properties.code?.trim()?.length === 0;
  const TableHeaderPegawaiNipNik = properties?.selectedTab === 'Master PNS' ? 'NIP' : 'NIK';
  // const [selectedDate, setSelectedDate] = React.useState<Date>();

  const [isLoading, setIsLoading] = React.useState(false);
  const [filterState, setFilterState] = React.useState<ResumeGaji>({
    page: 1,
    per_page: 10,
    kode_transaksi: properties.code ? String(properties.code) : '',
    type: properties?.selectedTab === 'Master PNS' ? 'pns' : 'ppnpn',
  });

  console.log(filterState);

  const { data: daftarGajilist, isValidating } = useCommonApi<ResumeGaji, ResumeGajiList>(
    GajiPegawai.GET_TRANSAKSI_GAJI,
    filterState,
    { method: 'GET' },
    { skipCall: isCodeUnavail, revalidateOnMount: true }
  );

  const changeFilterState = (inputState: Partial<ResumeGaji>) => {
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

  const handleDownloadResume = async () => {
    setIsLoading(true);
    const callApiDownload = await callAPI<ResumeDownloadReq, ResumeDownloadRes>(
      GajiPegawai.GET_EXPORT_GAJI,
      filterState,
      { method: 'GET', isBlob: true, timeout: 120000 }
    );

    if (callApiDownload.status === 200 && callApiDownload.data instanceof Blob) {
      let url = '';
      url = window.URL.createObjectURL(callApiDownload.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Resume Data' + '.xlsx');
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

  const tableHeader = [
    { text: 'NO' },
    { text: TableHeaderPegawaiNipNik },
    { text: 'Nama' },
    { text: 'Badge' },
    { text: 'Gaji Utuh' },
    { text: 'Jumlah Hari Bermasalah' },
    { text: 'Jumlah Pengurangan' },
    { text: 'Total Gaji' },
    { text: 'Unit Kerja' },
  ];

  // const handleDateChange = React.useCallback(
  //   (date: Date) => {
  //     setSelectedDate(date);
  //   },
  //   [selectedDate]
  // );

  // const handleViewAllSelected = () => {
  //   const updatedFilterState = { ...filterState };
  //   delete updatedFilterState.month;
  //   setFilterState(updatedFilterState);
  // };

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
          <div>Data Gaji Pegawai</div>
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

      <div className="my-5 flex flex-row items-center justify-between px-5">
        <div className="flex flex-[0.3]">
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
        <div>
          <button
            className="ml-1 inline-flex items-center gap-x-2 rounded-md border border-indigo-600 bg-indigo-600 p-2 px-3 text-sm text-white hover:bg-indigo-700 focus:outline-none disabled:bg-gray-500 disabled:text-gray-300"
            onClick={handleDownloadResume}
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
            Download Dokumen
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
                      {tableHeader.map(each => (
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
                    {(daftarGajilist?.list || []).map((each, index) => (
                      <tr className={'bg-white hover:bg-gray-100'} key={index}>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                          {filterState.per_page * (filterState.page - 1) + (index + 1)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{each.nip}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{each.nama}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{each.badge}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          Rp.{each.gaji_utuh}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          {each.jumlah_hari_bermasalah}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          Rp.{each.jumlah_pengurangan}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          Rp. {each.total_gaji}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          {each.unit_kerja}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                          {each.kode_transaksi}
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
            totalData={daftarGajilist ? daftarGajilist?.pagination.total_data : 0}
            perPage={filterState?.per_page}
            page={filterState?.page}
          />
        </div>
      )}
    </>
  );
}

export default ResumeGajiDetail;
