import { format } from 'date-fns';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { PresensiAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import {
  PostPresensiShiftDateDeleteReq,
  PostPresensiShiftDateDeleteRes,
  PostPresensiShiftDateListReq,
  PresensiShiftDateData,
} from '../../../types/api/PresensiAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';
import ConfirmDialog from '../../shared/ConfirmDialog';
import { withErrorBoundary } from '../../shared/hocs/ErrorBoundary';
import useCommonApi from '../../shared/hooks/useCommonApi';
import DatePickerCustom from '../../shared/Input/DatePicker';
import Loader from '../../shared/Loader/Loader';
import LiburDanRamadhanForm from './LiburDanRamadhanForm';

const fromDate = new Date();
const toDate = new Date();
toDate.setFullYear(fromDate.getFullYear() + 1);

interface Props {
  onShowDetail: (data: PresensiShiftDateData) => void;
}

function LiburDanRamadhanList({ onShowDetail }: Props) {
  const dispatch = useDispatch();
  const [confirmId, setConfirmId] = React.useState(0);

  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedData?: PresensiShiftDateData }>({
    open: false,
    selectedData: undefined,
  });

  const [filterState, setFilterState] = React.useState<PostPresensiShiftDateListReq>({
    from: format(fromDate, 'yyyy-MM-dd'),
    to: format(toDate, 'yyyy-MM-dd'),
    is_libur: 1,
  });

  const {
    data: dataTable,
    isValidating,
    mutate,
  } = useCommonApi<PostPresensiShiftDateListReq, PresensiShiftDateData[]>(
    PresensiAPI.PRESENSI_SHIFT_DATE_LIST,
    filterState,
    { method: 'get' }
  );

  const changeFilterState = (inputState: Partial<typeof filterState>) => {
    setFilterState({
      ...filterState,
      ...inputState,
    });
  };

  const handleShowForm = (open: boolean, selectedId?: PresensiShiftDateData) => {
    setFormModalState({
      open,
      selectedData: selectedId,
    });
  };

  const handleConfirm = async () => {
    const resDelete = await callAPI<PostPresensiShiftDateDeleteReq, PostPresensiShiftDateDeleteRes>(
      PresensiAPI.PRESENSI_SHIFT_DATE_DELETE,
      { id: confirmId },
      { method: 'post' }
    );

    let snackbarProps;
    if (resDelete.status === 200 && resDelete.data?.status === Status.OK) {
      snackbarProps = {
        show: true,
        message: 'Data terhapus.',
        type: SnackbarType.INFO,
      };
    } else {
      snackbarProps = {
        show: true,
        message: 'Gagal menghapus data.',
        type: SnackbarType.ERROR,
      };
    }
    dispatch(setSnackbar(snackbarProps));
    setConfirmId(0);
    mutate();
  };

  return (
    <>
      <div className="rounded-lg bg-white shadow">
        <div className="px-6">
          <div className="flex flex-row py-6">
            <p className="text-lg font-medium text-gray-900">Hari Libur dan Ramadhan</p>

            <div className="ml-auto flex">
              <div className="flex w-full">
                <button
                  className="ml-1 inline-flex items-center rounded-md border border-indigo-600 bg-indigo-600 p-2 px-3 text-sm text-white hover:bg-indigo-700 focus:outline-none"
                  onClick={() => handleShowForm(!formModalState.open)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Tambah Hari Libur
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-row gap-x-[16px]">
            <div className="w-[202px] pb-2">
              <p className="text-sm font-medium text-gray-700">Dari Tanggal</p>
              <DatePickerCustom
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={new Date(filterState.from)}
                dateFormat="dd/MM/yyyy"
                onChange={(date: Date) => changeFilterState({ from: format(date, 'yyyy-MM-dd') })}
                customInput={
                  <input
                    type="text"
                    className={
                      'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    }
                  />
                }
              />
            </div>
            <div className="w-[202px] pb-2">
              <p className="text-sm font-medium text-gray-700">Sampai Tanggal</p>
              <DatePickerCustom
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={new Date(filterState.to)}
                dateFormat="dd/MM/yyyy"
                onChange={(date: Date) => changeFilterState({ to: format(date, 'yyyy-MM-dd') })}
                customInput={
                  <input
                    type="text"
                    className={
                      'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    }
                  />
                }
              />
            </div>
            <div className="w-[202px] pb-2">
              <p className="text-sm font-medium text-gray-700">Libur</p>
              <select
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                onChange={e => {
                  changeFilterState({ is_libur: Number(e.target.value) });
                }}
              >
                <option value={1}>Ya</option>
                <option value={0}>Tidak</option>
              </select>
            </div>
          </div>
        </div>
        {isValidating ? (
          <div className="relative h-[150px] w-full divide-y divide-gray-200">
            <Loader />
          </div>
        ) : (
          <div className="w-full">
            <div className="my-[24px] overflow-x-auto sm:mx-0 ">
              <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                <div className=" sm:rounded-lg">
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
                          Tipe Shift
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Keterangan
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(dataTable || []).map((data, dataIdx) => (
                        <tr
                          key={dataIdx}
                          className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                        >
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.tanggal}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.shift_str}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.remark}</td>
                          <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                            <div className="flex justify-between">
                              <button
                                onClick={() => onShowDetail(data)}
                                type="button"
                                className="mr-2 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200"
                              >
                                Lihat
                              </button>
                              <button
                                type="button"
                                className="mr-2 inline-flex items-center rounded border border-indigo-600 px-2.5 py-1.5 text-xs font-medium text-indigo-600 shadow-sm hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-indigo-200 disabled:text-indigo-200"
                                onClick={() => handleShowForm(!formModalState.open, data)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="mr-2 inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-200 disabled:text-gray-200"
                                onClick={() => setConfirmId(data.id)}
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {formModalState.open ? (
        <LiburDanRamadhanForm
          onSuccess={() => mutate()}
          open={formModalState.open}
          setOpen={(open: boolean) => handleShowForm(open)}
          data={formModalState?.selectedData}
        />
      ) : null}
      <ConfirmDialog
        open={!!confirmId}
        message="Anda yakin ingin menghapus data ini?"
        onClose={() => setConfirmId(0)}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default withErrorBoundary<React.FunctionComponent<Props>, Props>(LiburDanRamadhanList);
