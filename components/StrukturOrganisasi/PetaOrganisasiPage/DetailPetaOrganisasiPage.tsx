import { ChevronLeftIcon, InformationCircleIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { StrukturOrganisasiAPI } from '../../../constants/APIUrls';
import { modalOption } from '../../../constants/Resource';
import { SnackbarType } from '../../../reducer/CommonReducer';
import {
  DeleteStrukturDataReq,
  DeleteStrukturDataRes,
  DetailStrukturData,
  GetDetailStrukturReq,
} from '../../../types/api/StrukturOrganisasiAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';
import { getQueryString } from '../../../utils/URLUtils';
import ConfirmDialog from '../../shared/ConfirmDialog';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';
import ModalStrukturOrganisasiForm from './ModalStrukturOrganisasiDetail';

function DetailPetaOrganisasiPage() {
  const { id } = getQueryString<{ id: number }>();
  const [confirmId, setConfirmId] = React.useState(0);
  const dispatch = useDispatch();

  const handleShowForm = (
    open: boolean,
    type?: modalOption,
    parentId?: number,
    selectedId?: number,
    namaPegawai?: string,
    role?: number
  ) => {
    setFormModalState({
      open,
      type,
      parentId,
      selectedId,
      namaPegawai,
      role,
    });
  };

  const [formModalState, setFormModalState] = React.useState<{
    open: boolean;
    type?: string;
    parentId?: number;
    selectedId?: number;
    namaPegawai?: string;
    role?: number;
  }>({
    open: false,
    type: undefined,
    parentId: undefined,
    selectedId: undefined,
    namaPegawai: undefined,
    role: undefined,
  });

  const {
    data: dataTable,
    isValidating,
    mutate,
  } = useCommonApi<GetDetailStrukturReq, DetailStrukturData>(
    StrukturOrganisasiAPI.GET_STRUKTUR_ORGANISASI_VIEW,
    { id },
    { method: 'GET' }
  );

  const handleDelete = async () => {
    const resDelete = await callAPI<DeleteStrukturDataReq, DeleteStrukturDataRes>(
      StrukturOrganisasiAPI.DELETE_PJ_STRUKTUR_ORGANISASI,
      {
        pegawai_id: confirmId,
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
        <Link href={'/struktur-organisasi/peta-organisasi'}>
          <span className=" flex w-fit cursor-pointer flex-row items-center gap-x-2 py-6 px-6">
            <ChevronLeftIcon className="h-5 w-5" />
            <div className="w-fit">Kembali</div>
          </span>
        </Link>
        <div className="px-6">
          <div className="flex flex-row items-end justify-between py-6">
            <div className="grid w-1/2 gap-y-1">
              <p className="text-md font-medium text-[#696969]">{dataTable?.divisi}</p>
              <p className="text-lg font-medium text-gray-900">{dataTable?.name}</p>
            </div>
            <button
              onClick={() => {
                handleShowForm(!formModalState?.open, modalOption.add, dataTable?.id);
              }}
              className="rounded-md bg-indigo-600 py-2 px-4 text-sm text-white"
            >
              Tambah Staff
            </button>
          </div>
        </div>
        {isValidating ? (
          <div className="relative h-[150px] w-full divide-y divide-gray-200">
            <Loader />
          </div>
        ) : (
          <div className="flex">
            <div className="my-[24px] w-full overflow-x-auto  sm:mx-0">
              <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                <div className="sm:rounded-lg">
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
                          Unit Kerja
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
                      {(dataTable?.list_anggota || []).map((data, dataIdx) => (
                        <tr
                          key={dataIdx}
                          className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                        >
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.divisi}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.nama}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.unit_kerja_str}</td>
                          <td className="flex gap-2 px-6 py-4 text-xs font-medium text-gray-900">
                            <button
                              data-twe-toggle="tooltip"
                              data-twe-html="true"
                              data-twe-ripple-init
                              data-twe-ripple-color="light"
                              title="Edit Data"
                              onClick={() => {
                                handleShowForm(
                                  !formModalState?.open,
                                  modalOption.edit,
                                  undefined,
                                  data.divisi_id,
                                  data.nama,
                                  data.roles
                                );
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
                              className={`rounded-[6px] bg-[#378b22] py-2 px-3 text-[14px] font-normal text-gray-50 ${
                                data.divisi_id === 0 && 'hidden'
                              }`}
                              onClick={() =>
                                (window.location.href = `/struktur-organisasi/peta-organisasi?id=${data?.divisi_id}`)
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
                              onClick={() => setConfirmId(data.peg_id)}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {formModalState?.open && (
                    <ModalStrukturOrganisasiForm
                      open={formModalState?.open}
                      setOpen={(open: boolean) => handleShowForm(open)}
                      selectedId={formModalState?.selectedId}
                      type={formModalState?.type}
                      parentId={formModalState?.parentId}
                      role={formModalState?.role}
                      onSuccess={() => mutate()}
                    />
                  )}
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

export default DetailPetaOrganisasiPage;
