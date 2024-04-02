import { ChevronLeftIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { StrukturOrganisasiAPI } from '../../../constants/APIUrls';
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
import UpdateModal from '../ModalStrukturOrganisasi';

function DetailPetaOrganisasiPage() {
  const { id } = getQueryString<{ id: number }>();
  const [confirmId, setConfirmId] = React.useState(0);
  const dispatch = useDispatch();

  const handleShowForm = (open: boolean, selectedId?: number) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  const [formModalState, setFormModalState] = React.useState<{
    open: boolean;
    selectedId?: number;
  }>({
    open: false,
    selectedId: undefined,
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
      StrukturOrganisasiAPI.DELETE_STRUKTUR_ORGANISASI,
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
          <div className="flex flex-row py-6">
            <p className="text-lg font-medium text-gray-900">{dataTable?.divisi}</p>
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
                                handleShowForm(!formModalState?.open, data?.peg_id);
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
                    <UpdateModal
                      open={formModalState?.open}
                      setOpen={(open: boolean) => handleShowForm(open, 0)}
                      selectedId={formModalState?.selectedId}
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
