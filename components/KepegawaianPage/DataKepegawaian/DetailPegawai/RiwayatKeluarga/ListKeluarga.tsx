import { PlusIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RiwayatKeluargaAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  DelListKeluargaReq,
  GetListKeluargaReq,
  ListKeluargaData,
  PostListKeluargaRes,
} from '../../../../../types/api/RiwayatKeluargaAPI';
import { Status } from '../../../../../types/Common';
import { callAPI } from '../../../../../utils/Fetchers';
import ConfirmDialog from '../../../../shared/ConfirmDialog';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import KeluargaForm from './KeluargaForm';

type ListKeluargaProps = {
  onShowDetail: (id: number) => void;
};

export default function ListKeluarga(props: ListKeluargaProps) {
  const { onShowDetail } = props;
  const [confirmId, setConfirmId] = React.useState(0);
  const personalPegawaiData = usePersonalData();
  const dispatch = useDispatch();

  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: number }>({
    open: false,
    selectedId: undefined,
  });

  const { data: riwayatKeluargaList, mutate } = useCommonApi<GetListKeluargaReq, ListKeluargaData[]>(
    RiwayatKeluargaAPI.GET_RIWAYAT_KELUARGA_LIST,
    { pegawai_id: personalPegawaiData?.pegawai_id },
    { method: 'GET' }
  );

  console.log(riwayatKeluargaList);

  const handleConfirm = async () => {
    const resDelete = await callAPI<DelListKeluargaReq, PostListKeluargaRes>(
      RiwayatKeluargaAPI.POST_RIWAYAT_KELUARGA_DELETE,
      { pasangan_id: confirmId },
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

  const handleShowForm = (open: boolean, selectedId?: number) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  return formModalState.open ? (
    <KeluargaForm
      onSuccess={() => mutate()}
      open={formModalState.open}
      setOpen={(open: boolean) => handleShowForm(open)}
      selectedId={formModalState?.selectedId}
    />
  ) : (
    <>
      <div className="my-3 flex items-center">
        <div className="flex flex-1 pr-2 text-sm text-gray-500"></div>
        <button
          type="button"
          className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-200 disabled:text-gray-200"
          onClick={() => handleShowForm(!formModalState.open)}
        >
          <PlusIcon className="mr-1 h-4" />
          Tambah Anggota Keluarga
        </button>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
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
                Status Pasangan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Tanggal Menikah
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Status Pernikahan
              </th>
              {/* {each.jumlah_anak === 0 ? null : ( */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Jumlah Anak
              </th>
              {/* )} */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {(riwayatKeluargaList || []).map((each, index) => (
              <tr key={each.pasangan_id}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.nama}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  {each.status_pasangan === 1 ? 'Suami' : 'Istri'}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  {format(new Date(each.tanggal_menikah), 'yyyy-MM-dd')}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  {each.status_pernikahan === 1 ? 'Menikah' : 'Cerai Hidup'}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  <div className="whitespace-nowrap">{each.jumlah_anak + ' Anak'}</div>
                </td>

                <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                  <div className="flex justify-start">
                    <button
                      onClick={() => onShowDetail(each.pasangan_id)}
                      type="button"
                      className="mr-2 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200"
                    >
                      Lihat
                    </button>
                    <button
                      onClick={() => setConfirmId(each.pasangan_id)}
                      type="button"
                      className="inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-200 disabled:text-gray-200"
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
      <ConfirmDialog
        open={!!confirmId}
        message="Anda yakin ingin menghapus data ini?"
        onClose={() => setConfirmId(0)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
