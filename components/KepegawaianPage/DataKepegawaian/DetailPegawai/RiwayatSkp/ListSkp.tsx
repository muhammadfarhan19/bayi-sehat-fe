import { PlusIcon } from '@heroicons/react/outline';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RiwayatSKPAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  GetRiwayatSkpListReq,
  PostDelRiwayatSkpReq,
  PostRiwayatSkpDeleteRes,
  RiwayatSkpData,
} from '../../../../../types/api/RiwayatSkpAPI';
import { Status } from '../../../../../types/Common';
import { callAPI } from '../../../../../utils/Fetchers';
import ConfirmDialog from '../../../../shared/ConfirmDialog';
import FileLoader from '../../../../shared/FileLoader';
import useAllowAdmin from '../../../../shared/hooks/useAllowAdmin';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import { PDFIcon } from '../../../../shared/icons/PDFIcon';
import SkpForm from './SkpForm';

type ListSkpProps = {
  onShowDetail: (detail: RiwayatSkpData) => void;
};

export default function ListSkp(props: ListSkpProps) {
  const [confirmId, setConfirmId] = React.useState(0);
  const { onShowDetail } = props;
  const dispatch = useDispatch();
  const personalPegawaiData = usePersonalData();
  const isAllowAdmin = useAllowAdmin();

  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selected?: RiwayatSkpData }>({
    open: false,
    selected: undefined,
  });

  const handleShowForm = (open: boolean, selected?: RiwayatSkpData) => {
    setFormModalState({ open, selected });
  };

  const handleConfirm = async () => {
    const resDelete = await callAPI<PostDelRiwayatSkpReq, PostRiwayatSkpDeleteRes>(
      RiwayatSKPAPI.POST_RIWAYAT_SKP_DELETE_V2,
      {
        riwayat_id: Number(confirmId),
      },
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

  const { data: riwayatSkp, mutate } = useCommonApi<GetRiwayatSkpListReq, RiwayatSkpData[]>(
    RiwayatSKPAPI.GET_RIWAYAT_SKP_LIST_V2,
    { pegawai_id: personalPegawaiData?.pegawai_id },
    { method: 'GET' }
  );

  return (
    <>
      <div className="my-3 flex items-center">
        <div className="flex flex-1 pr-2 text-sm text-gray-500">{/* TODO: Wait for wording */}</div>
        {isAllowAdmin && (
          <button
            type="button"
            className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-200 disabled:text-gray-200"
            onClick={() => handleShowForm(!formModalState.open)}
          >
            <PlusIcon className="mr-1 h-4" />
            Tambah Riwayat SKP
          </button>
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
                Tahun
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Rating Hasil Kerja
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Rating Perilaku Kerja
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Predikat Kinerja Pegawai
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
            {(riwayatSkp || []).map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each?.tahun}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each?.rating_hasil_kerja}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each?.rating_perilaku_kerja}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each?.predikat_kinerja_pegawai}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  <FileLoader uuid={each?.files?.[0]?.document_uuid}>
                    <div className="flex items-center">
                      <PDFIcon />
                      <span className="ml-1 whitespace-nowrap text-blue-500 underline">{'Berkas SKP'} </span>
                    </div>
                  </FileLoader>
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
      {formModalState.open ? (
        <SkpForm
          onSuccess={() => mutate()}
          open={formModalState.open}
          setOpen={(open: boolean) => handleShowForm(open)}
          detail={formModalState.selected}
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
