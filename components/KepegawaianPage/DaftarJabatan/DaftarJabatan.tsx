import { AdjustmentsIcon } from '@heroicons/react/solid';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { JabatanAPI, MasterAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { GetJabatanReq, JabatanData, PostJabatanDeleteReq, PostJabatanDeleteRes } from '../../../types/api/JabatanAPI';
import { JenisJabatanListData } from '../../../types/api/MasterAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';
import ConfirmDialog from '../../shared/ConfirmDialog';
import { withErrorBoundary } from '../../shared/hocs/ErrorBoundary';
import useCommonApi from '../../shared/hooks/useCommonApi';
import AutoComplete from '../../shared/Input/ComboBox';
import Loader from '../../shared/Loader/Loader';
import Pagination from '../../shared/Pagination';
import FormJabatan from './FormJabatan/FormJabatan';

function DaftarJabatan() {
  const dispatch = useDispatch();
  const [confirmId, setConfirmId] = React.useState(0);
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(false);
  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: string }>({
    open: false,
    selectedId: undefined,
  });
  const [filterState, setFilterState] = React.useState<GetJabatanReq>({
    page: 1,
    per_page: 20,
  });

  const {
    data: dataTable,
    isValidating,
    mutate,
  } = useCommonApi<GetJabatanReq, JabatanData>(JabatanAPI.GET_JABATAN, filterState, { method: 'GET' });

  const { data: jenisJabatanList } = useCommonApi<null, JenisJabatanListData[]>(
    MasterAPI.GET_JENIS_JABATAN_LIST,
    null,
    { method: 'GET' }
  );

  const changeFilterState = (inputState: Partial<GetJabatanReq>) => {
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

  const toggleAdvancedFilter = () => {
    const showState = !showAdvancedFilter;
    if (!showState) {
      changeFilterState({ jenis_jabatan: undefined, kelas_jabatan: undefined });
    }
    setshowAdvancedFilter(showState);
  };

  const handleShowForm = (open: boolean, selectedId?: string) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  const handleConfirm = async () => {
    const resDelete = await callAPI<PostJabatanDeleteReq, PostJabatanDeleteRes>(
      JabatanAPI.POST_JABATAN_DELETE,
      { jabatan_id: confirmId },
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

  if (isValidating) {
    <div className="relative h-[150px] w-full divide-y divide-gray-200">
      <Loader />
    </div>;
  }

  return formModalState?.open ? (
    <FormJabatan
      onSuccess={() => mutate()}
      open={formModalState.open}
      setOpen={(open: boolean) => {
        handleShowForm(open);
      }}
      selectedId={formModalState?.selectedId}
    />
  ) : (
    <>
      <div className="px-6">
        <div className="flex flex-row py-6">
          <p className="text-lg font-medium text-gray-900">Daftar Jabatan</p>

          <div className="ml-auto flex">
            <input
              onChange={event => {
                changeFilterState({ jabatan: event.target.value });
              }}
              autoComplete="off"
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Cari..."
            />
            <button
              className="ml-1 rounded-md border border-gray-300 p-2 focus:bg-gray-50 focus:outline-none"
              onClick={toggleAdvancedFilter}
            >
              <AdjustmentsIcon className="h-5  w-5 animate-pulse text-gray-400" />
            </button>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => handleShowForm(!formModalState.open)}
            type="submit"
            className="w-3/12 rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Tambah Jabatan
          </button>
        </div>

        {showAdvancedFilter && (
          <div className="flex w-full flex-row gap-x-[16px]">
            <div className="w-[202px] pb-2">
              <AutoComplete
                onChange={value => {
                  changeFilterState({ jenis_jabatan: value.value === '*' ? undefined : Number(value.value) });
                }}
                label={'Tipe Jabatan'}
                defaultValue={{ text: 'Semua', value: '*' }}
                options={(() => {
                  const returnList = (jenisJabatanList || []).map(each => ({
                    text: each.jenis_jabatan,
                    value: String(each.id),
                  }));
                  returnList.unshift({ text: 'Semua', value: '*' });
                  return returnList;
                })()}
              />
            </div>
            <div className="w-[202px] pb-2">
              <AutoComplete
                label={'Kelas'}
                onChange={value => {
                  changeFilterState({ kelas_jabatan: value.value === '*' ? undefined : Number(value.value) });
                }}
                defaultValue={{ text: 'Semua', value: '*' }}
                options={['*', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(each => ({
                  text: each === '*' ? 'Semua' : String(each),
                  value: String(each),
                }))}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex">
        <div className="my-[24px] overflow-x-auto sm:mx-0 ">
          <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
            <div className="sm:rounded-lg">
              <table className="w-full table-fixed divide-y divide-gray-200">
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
                      Nama
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Kelas
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Tipe Jabatan
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
                  {(dataTable?.list || []).map((data, dataIdx) => (
                    <tr
                      key={dataIdx}
                      className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                    >
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        {filterState.per_page * (filterState.page - 1) + (dataIdx + 1)}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.name}</td>
                      <td className="px-6 text-xs font-medium text-gray-900">{data.kelas_jabatan}</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.jenis_jabatan_str}</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        <div className="flex justify-between">
                          <a
                            href={`/kepegawaian/daftar-jabatan?id=${data.jabatan_id}&name=${encodeURIComponent(
                              data.name
                            )}`}
                            className="mr-2 rounded-[4px] bg-indigo-600 px-[11px] py-[7px] text-xs font-medium text-gray-50 focus:outline-none"
                          >
                            Detail
                          </a>
                          <button
                            type="button"
                            className="mr-2 inline-flex items-center rounded border border-indigo-600 px-2.5 py-1.5 text-xs font-medium text-indigo-600 shadow-sm hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-indigo-200 disabled:text-indigo-200"
                            onClick={() => handleShowForm(!formModalState.open, String(data.jabatan_id))}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="mr-2 inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-200 disabled:text-gray-200"
                            onClick={() => setConfirmId(data.jabatan_id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                onChange={value => {
                  changeFilterState({ page: value });
                }}
                totalData={dataTable ? dataTable?.pagination.total_data : 0}
                perPage={filterState.per_page}
                page={filterState.page}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!confirmId}
        message="Anda yakin ingin menghapus data ini?"
        onClose={() => setConfirmId(0)}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default withErrorBoundary(DaftarJabatan);
