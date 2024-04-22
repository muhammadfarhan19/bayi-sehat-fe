import { AdjustmentsIcon } from '@heroicons/react/outline';
import format from 'date-fns/format';
import id from 'date-fns/locale/id';
import React from 'react';

import { DaftarTransaksiAPI } from '../../../../constants/APIUrls';
import { DaftarTransaksi } from '../../../../types/api/DaftarTransaksiAPI';
import { ConditionalRendering } from '../../../../utils/Components';
// import { CircleProgress } from '../../../shared/CircleProgress';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import Loader from '../../../shared/Loader/Loader';
import Pagination from '../../../shared/Pagination';
import { PengirimanUlangForm } from '../../DaftarTransaksiPage/FormPage';
import ModalConfirmation from '../../DaftarTransaksiPage/FormPage/ModalConfirmation';
import SummaryMonthlyModal from '../../DaftarTransaksiPage/FormPage/SummaryMonthlyModal';
import { YearPicker } from '../../DaftarTransaksiPage/Shared';
import { useResyncTransaction } from '../../DaftarTransaksiPage/utils';
import { MonthPicker } from '../../RekapPresensiPage/DetailPage/Shared';
import { months } from '../../RekapPresensiPage/DetailPage/Shared/MonthPicker';
import { type TabName } from '../../RekapPresensiPage/Shared/types/_sharedType';
// import ResumeGajiDetail from './ResumeDetailGaji';
//import DetailPage from './ResumeDetailGaji';

interface DaftarGajiListProps {
  onShowDetail: (show: boolean, selectedDate?: Date, code?: string, type?: string) => void;
  selectedTab: string | TabName;
}

function DaftarGajiList(props: DaftarGajiListProps) {
  //
  const { onShowDetail } = props;

  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [formModalState, setFormModalState] = React.useState(false);
  const [formModalSync, setFormModalSync] = React.useState({
    show: false,
    kode: '',
    month: 0,
    year: 0,
    index: 0,
  });
  const [summaryMonthlyModalState, setSummaryMonthlyModalState] = React.useState(false);
  const reSync = useResyncTransaction();

  const handleDateChange = React.useCallback(
    (date: Date) => {
      setSelectedDate(date);
    },
    [selectedDate]
  );

  const defaultFilterState: DaftarTransaksi.GetListReq = {
    page: 1,
    per_page: 10,
    year: new Date().getFullYear(),
  };

  const handleViewAllSelected = () => {
    const updatedFilterState = { ...filterState };
    delete updatedFilterState.month;
    setFilterState(updatedFilterState);
  };

  const [filterState, setFilterState] = React.useState<DaftarTransaksi.GetListReq>(defaultFilterState);

  const {
    data: daftarTransaksiList,
    mutate,
    isValidating,
  } = useCommonApi<DaftarTransaksi.GetListReq, DaftarTransaksi.GetListRes>(
    DaftarTransaksiAPI.GET_DAFTAR_TRANSAKSI_LIST,
    filterState,
    { method: 'GET' }
  );

  const formattedSelectedDate = selectedDate
    ? format(selectedDate, 'MMMM - yyyy', { locale: id })
    : format(new Date(), 'MMMM - yyyy', { locale: id });

  const handleResync = React.useCallback((code: string, year: number, month: number, selectedIndex: number) => {
    reSync.syncHandler({
      code,
      listSelected: true,
      year,
      month,
      selectedIndex,
      onSuccess: mutate,
    });
    setFormModalSync(prevState => ({ ...prevState, show: false }));
  }, []);

  const changeFilterState = (inputState: Partial<DaftarTransaksi.GetListReq>) => {
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
    if (Object.keys(inputState).includes('month')) {
      setFilterState(newState);
    }
    timeoutRef.current = setTimeout(() => setFilterState(newState), pageAffected ? 0 : 800);
  };

  return (
    <>
      <div className="mb-5 flex flex-row items-center px-4 pt-3">
        <h3 className="text-xl font-medium leading-6 text-gray-900">Resume Gaji</h3>
        <div className="ml-auto flex">
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Cari..."
            onChange={e => changeFilterState({ kode: e.target.value })}
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
        <div className="flex flex-[0.1]">
          <MonthPicker
            onChange={date => {
              handleDateChange(date);
              changeFilterState({ month: date.getMonth() + 1 });
            }}
            onViewAllSelected={handleViewAllSelected}
            disableYear
            viewAllText
          />
        </div>
        <div className="flex flex-[0.5]">
          <YearPicker
            onChange={date => {
              handleDateChange(date);
              changeFilterState({ year: date?.getFullYear() });
            }}
            selectedMonth={selectedDate?.getMonth()}
          />
        </div>
        <div className="flex-2 flex"></div>
      </div>
      {isValidating ? (
        <div className="relative h-[150px] w-full divide-y divide-gray-200">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="my-[24px] overflow-x-auto sm:mx-0 ">
            <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
              <div className="sm:rounded-lg">
                <table className="w-full table-auto overflow-auto rounded-lg bg-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-3 text-center text-[10px] font-medium uppercase tracking-wider text-gray-500"
                      >
                        Kode
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-center text-[10px] font-medium uppercase tracking-wider text-gray-500"
                      >
                        Bulan/Tahun
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-center text-[10px] font-medium uppercase tracking-wider text-gray-500"
                      >
                        Tanggal
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-center text-[10px] font-medium uppercase tracking-wider text-gray-500"
                      >
                        Created by
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-center text-[10px] font-medium uppercase tracking-wider text-gray-500"
                      >
                        Last Sync
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-center text-[10px] font-medium uppercase tracking-wider text-gray-500"
                      >
                        Sync by
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(daftarTransaksiList?.list || []).map((item, index) => {
                      return (
                        <>
                          <tr
                            key={item.kode}
                            className={index % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                          >
                            <td className="px-6 py-4 text-left text-[10px] font-medium text-gray-900">{item?.kode}</td>
                            <td
                              className="truncate px-6 py-4 text-left text-[10px] font-medium text-cyan-300"
                              onClick={() => {
                                if (item?.year && item?.month) {
                                  const selectedDate = new Date(item.year, item?.month - 1);
                                  onShowDetail(true, selectedDate, item?.kode, 'resume_detail');
                                }
                              }}
                            >
                              {months[item?.month - 1]} {item?.year}
                            </td>
                            <td className="truncate px-6 py-4 text-left text-[10px] font-medium text-gray-900">
                              {item?.tanggal_awal_akhir}
                            </td>
                            <td className="truncate px-6 py-4 text-center text-[10px] font-medium text-gray-900">
                              {item?.created_by}
                            </td>
                            <td className="truncate px-6 py-4 text-left text-[10px] font-medium text-sky-500">
                              {item?.last_sync}
                            </td>
                            <td className="truncate px-6 py-4 text-left text-[10px] font-medium text-gray-900">
                              {item?.sync_by}
                            </td>
                            <td className="px-6 py-4 text-left text-[10px] font-medium text-gray-900">
                              <div className="flex flex-row items-center justify-between space-x-2"></div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
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
      {ConditionalRendering(
        formModalState,
        <PengirimanUlangForm
          onSuccess={mutate}
          selectedMonth={selectedDate && selectedDate?.getMonth() + 1}
          selectedYear={selectedDate && selectedDate?.getFullYear()}
          formMonthAndYearValue={formattedSelectedDate}
          open={formModalState}
          setOpen={(open: boolean) => setFormModalState(open)}
        />
      )}
      {ConditionalRendering(
        formModalSync.show,
        <ModalConfirmation
          disabled={reSync.loading.show}
          open={formModalSync.show}
          onSubmit={() => {
            handleResync(formModalSync.kode, formModalSync.year, formModalSync.month, formModalSync.index);
          }}
          setOpen={(open: boolean) => setFormModalSync(prevState => ({ ...prevState, show: open }))}
        />
      )}
      {ConditionalRendering(
        summaryMonthlyModalState,
        <SummaryMonthlyModal
          onSuccess={mutate}
          selectedMonth={selectedDate && selectedDate?.getMonth() + 1}
          selectedYear={selectedDate && selectedDate?.getFullYear()}
          formMonthAndYearValue={formattedSelectedDate}
          open={summaryMonthlyModalState}
          setOpen={(open: boolean) => setSummaryMonthlyModalState(open)}
        />
      )}
    </>
  );
}

export default DaftarGajiList;
