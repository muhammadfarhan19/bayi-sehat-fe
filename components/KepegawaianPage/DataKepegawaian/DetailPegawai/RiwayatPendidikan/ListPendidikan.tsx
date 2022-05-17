import { PlusIcon } from '@heroicons/react/outline';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RiwayatPendidikanAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { GetRiwayatPendidikanListReq, RiwayatPendidikanListData } from '../../../../../types/api/PendidikanAPI';
import { getQueryString } from '../../../../../utils/URLUtils';
import ConfirmDialog from '../../../../shared/ConfirmDialog';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import PendidikanForm from './PendidikanForm';

type ListPendidikanProps = {
  onShowDetail: (id: number) => void;
};

export default function ListArsip(props: ListPendidikanProps) {
  const [confirmId, setConfirmId] = React.useState(0);
  // const { onShowDetail } = props;
  const dispatch = useDispatch();
  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();

  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: string }>({
    open: false,
    selectedId: undefined,
  });

  const handleShowForm = (open: boolean, selectedId?: string) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  const handleConfirm = async () => {
    const snackbarProps = {
      show: true,
      message: 'Data terhapus.',
      type: SnackbarType.INFO,
    };
    dispatch(setSnackbar(snackbarProps));
    setConfirmId(0);
  };

  const { data: riwayatPendidikan } = useCommonApi<GetRiwayatPendidikanListReq, RiwayatPendidikanListData[]>(
    RiwayatPendidikanAPI.GET_RIWAYAT_PENDIDIKAN_LIST,
    pegawai_id ? { pegawai_id: Number(pegawai_id) } : {},
    { method: 'GET' }
  );

  return (
    <>
      <div className="my-3 flex items-center">
        <div className="flex flex-1 pr-2 text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing est pulvinar at diam. Egestas accumsan mi
          lectus tristique pellentesque sit. Nisl nunc eu a vitae convallis sed massa urna.
        </div>
        <button
          type="button"
          className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-200 disabled:text-gray-200"
          onClick={() => handleShowForm(!formModalState.open)}
        >
          <PlusIcon className="mr-1 h-4" />
          Tambah Riwayat Pendidikan
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
                Jejang
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Lembaga
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Prodi
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Tgl Lulus
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                No Ijazah
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
            {(riwayatPendidikan || []).map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.jenjang_name}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.pt_name}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.prodi_name}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.tanggal_lulus}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.no_ijazah}</td>
                <td className="w-[220px] py-4 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <button
                      // onClick={() => onShowDetail(each.pegawai_id)}
                      type="button"
                      className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200"
                    >
                      Lihat
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-indigo-600 px-2.5 py-1.5 text-xs font-medium text-indigo-600 shadow-sm hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-indigo-200 disabled:text-indigo-200"
                      // onClick={() => handleShowForm(!formModalState.open, String(each.id))}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-200 disabled:text-gray-200"
                      // onClick={() => setConfirmId(each.id)}
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
        <PendidikanForm
          onSuccess={() => {
            console.log('');
          }}
          open={formModalState.open}
          setOpen={(open: boolean) => handleShowForm(open)}
          selectedId={formModalState?.selectedId}
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
