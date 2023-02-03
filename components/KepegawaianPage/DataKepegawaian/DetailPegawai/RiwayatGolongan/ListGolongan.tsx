import { PlusIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { GolonganAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  DeleteRiwayatGolonganReq,
  DeleteRiwayatGolonganRes,
  GetRiwayatGolonganListReq,
  RiwayatGolonganListData,
} from '../../../../../types/api/GolonganAPI';
import { Status } from '../../../../../types/Common';
import { formatDate } from '../../../../../utils/DateUtil';
import { callAPI } from '../../../../../utils/Fetchers';
import { getQueryString } from '../../../../../utils/URLUtils';
import ConfirmDialog from '../../../../shared/ConfirmDialog';
import FileLoader from '../../../../shared/FileLoader';
import useAllowAdmin from '../../../../shared/hooks/useAllowAdmin';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import { PDFIcon } from '../../../../shared/icons/PDFIcon';
import GolonganForm from './GolonganForm';

type ListGolonganProps = {
  onShowDetail: (detail: RiwayatGolonganListData) => void;
};

export default function ListGolongan(props: ListGolonganProps) {
  const dispatch = useDispatch();
  const isAllowAdmin = useAllowAdmin();
  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();
  const [confirmId, setConfirmId] = React.useState(0);
  const { onShowDetail } = props;
  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selected?: RiwayatGolonganListData }>({
    open: false,
    selected: undefined,
  });

  const { data: riwayatGolongan, mutate } = useCommonApi<GetRiwayatGolonganListReq, RiwayatGolonganListData[]>(
    GolonganAPI.GET_RIWAYAT_GOLONGAN_LIST,
    pegawai_id ? { pegawai_id: Number(pegawai_id) } : {},
    { method: 'GET' }
  );

  const handleShowForm = (open: boolean, selected?: RiwayatGolonganListData) => {
    setFormModalState({ open, selected });
  };

  const handleConfirm = async () => {
    const resDelete = await callAPI<DeleteRiwayatGolonganReq, DeleteRiwayatGolonganRes>(
      GolonganAPI.DELETE_RIWAYAT_GOLONGAN,
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
        {isAllowAdmin && (
          <>
            <div className="flex flex-1 pr-2 text-sm text-gray-500">{/* TODO: Wait for wording */}</div>
            <button
              type="button"
              className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-200 disabled:text-gray-200"
              onClick={() => handleShowForm(!formModalState.open)}
            >
              <PlusIcon className="mr-1 h-4" />
              Tambah Riwayat Golongan
            </button>
          </>
        )}
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
                Jenis KP
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
                TMT
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Sinkronisasi HR
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Berkas
              </th>
              {isAllowAdmin && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Aksi
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {(riwayatGolongan || []).map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.tipe_kp_str || '-'}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.golongan}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  <div className="whitespace-nowrap">{formatDate(new Date(each.tmt), 'yyyy-MM-dd')}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  <div className="whitespace-nowrap">{each.verified_hr === 0 ? 'Tidak' : 'Ya'}</div>
                </td>
                <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                  {each?.files?.[0]?.document_uuid && (
                    <FileLoader uuid={each?.files?.[0]?.document_uuid}>
                      <div className="flex items-center">
                        <PDFIcon />
                        <span className="ml-1 whitespace-nowrap text-blue-500 underline">{'Surat Keputusan'}</span>
                      </div>
                    </FileLoader>
                  )}
                </td>
                {isAllowAdmin && (
                  <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <button
                        onClick={() => onShowDetail(each)}
                        type="button"
                        className="mr-2 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200"
                      >
                        Lihat
                      </button>
                      <button
                        type="button"
                        className="mr-2 inline-flex items-center rounded border border-indigo-600 px-2.5 py-1.5 text-xs font-medium text-indigo-600 shadow-sm hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-indigo-200 disabled:text-indigo-200"
                        onClick={() => handleShowForm(!formModalState.open, each)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="mr-2 inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-200 disabled:text-gray-200"
                        onClick={() => setConfirmId(each.riwayat_id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <GolonganForm
        onSuccess={() => mutate()}
        open={formModalState.open}
        setOpen={(open: boolean) => handleShowForm(open)}
        detail={formModalState.selected}
      />
      <ConfirmDialog
        open={!!confirmId}
        message="Anda yakin ingin menghapus data ini?"
        onClose={() => setConfirmId(0)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
