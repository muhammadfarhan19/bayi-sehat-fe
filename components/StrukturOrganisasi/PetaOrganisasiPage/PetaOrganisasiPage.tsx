import { AdjustmentsIcon, InformationCircleIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { StrukturOrganisasiAPI, UnitKerjaAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { GetRekapReq } from '../../../types/api/RekapDinasAPI';
import {
  DeleteStrukturDataReq,
  DeleteStrukturDataRes,
  GetStrukturReq,
  StrukturData,
} from '../../../types/api/StrukturOrganisasiAPI';
import { GetUnitKerjaData } from '../../../types/api/UnitKerjaAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';
import ConfirmDialog from '../../shared/ConfirmDialog';
import useAllowSuperAdmin from '../../shared/hooks/useAllowSuperAdmin';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';
import Pagination from '../../shared/Pagination';
import ModalStrukturOrganisasi from '../ModalStrukturOrganisasi';

interface UnitKerja {
  unit_kerja_id: number;
}

function PetaOrganisasiPage(props: UnitKerja) {
  const { unit_kerja_id } = props;
  const [confirmId, setConfirmId] = React.useState(0);
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const [loaded, setLoaded] = React.useState(false);
  const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(true);
  const dispatch = useDispatch();

  const handleShowForm = (open: boolean, selectedId?: number, name?: string) => {
    setFormModalState({
      open,
      selectedId,
      name,
    });
  };

  const [formModalState, setFormModalState] = React.useState<{
    open: boolean;
    selectedId?: number;
    name?: string;
  }>({
    open: false,
    selectedId: undefined,
    name: undefined,
  });

  const [filterState, setFilterState] = React.useState<GetRekapReq>({
    page: 1,
    per_page: 10,
    unit_kerja_id: unit_kerja_id,
    keyword: '',
    status_kepegawaian: 'aktif',
  });

  const { isAllowSuperAdminAccessFilter } = useAllowSuperAdmin();

  const {
    data: dataTable,
    isValidating,
    mutate,
  } = useCommonApi<GetStrukturReq, StrukturData>(StrukturOrganisasiAPI.GET_STRUKTUR_ORGANISASI_LIST, filterState, {
    method: 'GET',
  });

  const { data: unitKerjaList } = useCommonApi<null, GetUnitKerjaData[]>(
    UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT,
    null,
    { method: 'GET' }
  );

  React.useEffect(() => {
    if (loaded) {
      mutate();
    }
    setLoaded(true);
  }, [filterState]);

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

  const toggleAdvancedFilter = () => {
    setshowAdvancedFilter(!showAdvancedFilter);
  };

  const handleDelete = async () => {
    const resDelete = await callAPI<DeleteStrukturDataReq, DeleteStrukturDataRes>(
      StrukturOrganisasiAPI.DELETE_STRUKTUR_ORGANISASI,
      {
        jabatan_struktural_id: confirmId,
      },
      { method: 'PUT' }
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
            <p className="text-lg font-medium text-gray-900">Peta Organisasi</p>

            <div className="ml-auto flex">
              <input
                autoComplete="off"
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Cari"
                onChange={e => {
                  changeFilterState({ keyword: e.target.value === '' ? undefined : e.target.value });
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
              <div className="w-full pb-2">
                <p className="mb-[4px] text-[14px] font-normal">Unit Kerja</p>
                <div className="flex items-center justify-between">
                  <select
                    className="block w-[202px] appearance-none truncate rounded-md border border-gray-300 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                    onChange={e => {
                      changeFilterState({ unit_kerja_id: e.target.value === '' ? undefined : Number(e.target.value) });
                    }}
                    disabled={!!unit_kerja_id && !isAllowSuperAdminAccessFilter}
                  >
                    <option value="">Semua</option>
                    {(unitKerjaList || []).map((item, index) => (
                      <option
                        key={`options-${index}`}
                        value={item?.unit_kerja_id}
                        selected={unit_kerja_id === Number(item?.unit_kerja_id) ? true : false}
                      >
                        {item?.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      handleShowForm(!formModalState?.open);
                    }}
                    className="rounded-md bg-indigo-600 py-2 px-4 text-sm text-white"
                  >
                    Tambah KaTU/KTK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {isValidating ? (
          <div className="relative h-[150px] w-full divide-y divide-gray-200">
            <Loader />
          </div>
        ) : (
          <div className="flex">
            <div className="my-[24px] w-full overflow-x-auto  sm:mx-0">
              <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                <div className=" sm:rounded-lg">
                  <table className="w-full table-auto  rounded-lg bg-gray-100">
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
                          Koordinator
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
                          Jabatan
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
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.divisi}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.nama}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.jabatan_str}</td>
                          <td className="flex gap-2 px-6 py-4 text-xs font-medium text-gray-900">
                            <button
                              data-twe-toggle="tooltip"
                              data-twe-html="true"
                              data-twe-ripple-init
                              data-twe-ripple-color="light"
                              title="Edit Data"
                              onClick={() => {
                                handleShowForm(!formModalState?.open, data?.id, data?.nama);
                              }}
                              type="button"
                              className={`rounded-[6px] bg-[#4F46E5] py-2 px-3 text-[14px] font-normal text-gray-50`}
                            >
                              <PencilAltIcon className="h-5 w-5" />
                            </button>

                            <button
                              data-twe-toggle="tooltip"
                              data-twe-html="true"
                              data-twe-ripple-init
                              data-twe-ripple-color="light"
                              title="Lihat Detail"
                              type="button"
                              className="rounded-[6px] bg-[#378b22] py-2 px-3 text-[14px] font-normal text-gray-50"
                              onClick={() =>
                                (window.location.href = `/struktur-organisasi/peta-organisasi?id=${data.id}`)
                              }
                            >
                              <InformationCircleIcon className="h-5 w-5" />
                            </button>
                            <button
                              data-twe-toggle="tooltip"
                              data-twe-html="true"
                              data-twe-ripple-init
                              data-twe-ripple-color="light"
                              title="Hapus Data"
                              type="button"
                              className="rounded-[6px] bg-red-500 py-2 px-3 text-[14px] font-normal text-gray-50"
                              onClick={() => setConfirmId(data.id)}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {formModalState?.open && (
                    <ModalStrukturOrganisasi
                      open={formModalState?.open}
                      setOpen={(open: boolean) => handleShowForm(open, 0)}
                      selectedId={formModalState?.selectedId}
                      onSuccess={() => mutate()}
                      namaPegawai={formModalState?.name}
                    />
                  )}
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
        )}
      </div>
      <ConfirmDialog
        open={!!confirmId}
        message="Anda yakin ingin menghapus data ini?"
        onClose={() => setConfirmId(0)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default PetaOrganisasiPage;
