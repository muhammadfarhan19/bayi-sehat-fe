import { PlusIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RiwayatKGBAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  GetKGBList,
  GetKGBListReq,
  PostRiwayatKGBDelReq,
  PostRiwayatKGBRes,
} from '../../../../../types/api/RiwayatKGBApi';
import { Status } from '../../../../../types/Common';
import { callAPI } from '../../../../../utils/Fetchers';
import ConfirmDialog from '../../../../shared/ConfirmDialog';
import FileLoader from '../../../../shared/FileLoader';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import { PDFIcon } from '../../../../shared/icons/PDFIcon';
import RiwayatKGBForm from './RiwayatKGBForm';

type ListKGBProps = {
  onShowDetail: (id: number) => void;
};

export default function RiwayatKGBList(props: ListKGBProps) {
  const [confirmId, setConfirmId] = React.useState(0);
  const { onShowDetail } = props;
  const dispatch = useDispatch();
  const personalData = usePersonalData();

  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: number }>({
    open: false,
    selectedId: undefined,
  });

  const { data: riwayatKGBList, mutate } = useCommonApi<GetKGBListReq, GetKGBList[]>(
    RiwayatKGBAPI.GET_RIWAYAT_KGB_LIST,
    { pegawai_id: Number(personalData?.pegawai_id) },
    { method: 'GET' }
  );

  const handleShowForm = (open: boolean, selectedId?: number) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  const handleConfirm = async () => {
    const resDelete = await callAPI<PostRiwayatKGBDelReq, PostRiwayatKGBRes>(
      RiwayatKGBAPI.POST_RIWAYAT_KGB_DELETE,
      { riwayat_id: confirmId },
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
      <div className="my-3 flex items-center">
        <div className="flex flex-1 pr-2 text-sm text-gray-500">{/* TODO: Wait for wording */}</div>
        <button
          type="button"
          className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-200 disabled:text-gray-200"
          onClick={() => handleShowForm(!formModalState.open)}
        >
          <PlusIcon className="mr-1 h-4" />
          Tambah Riwayat KGB
        </button>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
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
                Golongan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Tanggal KGB
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                TMT KGB
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Berkas
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {(riwayatKGBList || []).map((each, index) => (
              <tr key={each?.riwayat_id}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each?.golongan_id_str}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  {format(new Date(each?.tanggal_kgb), 'dd MMM yyyy')}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  {format(new Date(each?.tmt_kgb), 'dd MMM yyyy')}{' '}
                </td>
                <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                  <FileLoader uuid={each?.files?.[0]?.document_uuid}>
                    <div className="flex items-center">
                      <PDFIcon />
                      <span className="ml-1 whitespace-nowrap text-blue-500 underline">
                        {each?.files?.[0].document_name}
                      </span>
                    </div>
                  </FileLoader>
                </td>
                <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <button
                      onClick={() => onShowDetail(each?.riwayat_id)}
                      type="button"
                      className="mr-2 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200"
                    >
                      Lihat
                    </button>
                    <button
                      type="button"
                      className="mr-2 inline-flex items-center rounded border border-indigo-600 px-2.5 py-1.5 text-xs font-medium text-indigo-600 shadow-sm hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-indigo-200 disabled:text-indigo-200"
                      onClick={() => handleShowForm(!formModalState.open, each?.riwayat_id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="mr-2 inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-200 disabled:text-gray-200"
                      onClick={() => setConfirmId(each?.riwayat_id)}
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
      {formModalState.open ? (
        <RiwayatKGBForm
          open={formModalState?.open}
          setOpen={(open: boolean) => handleShowForm(open)}
          selectedId={formModalState?.selectedId}
          onSuccess={() => mutate()}
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
