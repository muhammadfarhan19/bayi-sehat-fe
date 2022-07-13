import { PlusIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RbacAPI, RiwayatPendidikanAPI } from '../../../../../constants/APIUrls';
import { Permissions } from '../../../../../constants/Permission';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  GetRiwayatPendidikanListReq,
  PostRiwayatPendidikanDeleteReq,
  PostRiwayatPendidikanDeleteRes,
  RiwayatPendidikanListData,
} from '../../../../../types/api/PendidikanAPI';
import { AuthorizeData, PostRbacBulkAuthorizeReq } from '../../../../../types/api/RbacAPI';
import { Status } from '../../../../../types/Common';
import { callAPI } from '../../../../../utils/Fetchers';
import { getQueryString } from '../../../../../utils/URLUtils';
import ConfirmDialog from '../../../../shared/ConfirmDialog';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import PendidikanForm from './PendidikanForm';

type ListPendidikanProps = {
  onShowDetail: (id: number) => void;
  userId?: number;
};

export default function ListArsip(props: ListPendidikanProps) {
  const dispatch = useDispatch();

  const { onShowDetail, userId = 0 } = props;
  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();
  const [confirmId, setConfirmId] = React.useState(0);
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
    const resDelete = await callAPI<PostRiwayatPendidikanDeleteReq, PostRiwayatPendidikanDeleteRes>(
      RiwayatPendidikanAPI.POST_RIWAYAT_PENDIDIKAN_DELETE,
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

  const { data: riwayatPendidikan, mutate } = useCommonApi<GetRiwayatPendidikanListReq, RiwayatPendidikanListData[]>(
    RiwayatPendidikanAPI.GET_RIWAYAT_PENDIDIKAN_LIST,
    pegawai_id ? { pegawai_id: Number(pegawai_id) } : {},
    { method: 'GET' }
  );

  const { data: rbac } = useCommonApi<PostRbacBulkAuthorizeReq, AuthorizeData[]>(
    RbacAPI.POST_RBAC_BULK_AUTHORIZE,
    {
      bulk_request: [
        { action: 'read', resource_id: Permissions.ViewPendidikan, user_id: userId },
        { action: 'read', resource_id: Permissions.EditPendidikan, user_id: userId },
        { action: 'read', resource_id: Permissions.AddPendidikan, user_id: userId },
        { action: 'read', resource_id: Permissions.DeletePendidikan, user_id: userId },
      ],
    },
    { method: 'POST' }
  );
  const allowViewPendidikan = !!rbac?.[0]?.is_authorized;
  const allowEditPendidikan = !!rbac?.[1]?.is_authorized;
  const allowAddPendidikan = !!rbac?.[2]?.is_authorized;
  const allowDeletePendidikan = !!rbac?.[3]?.is_authorized;

  return (
    <>
      <div className="my-3 flex items-center">
        <div className="flex flex-1 pr-2 text-sm text-gray-500">{/* TODO: Wait for wording */}</div>
        {allowAddPendidikan && (
          <button
            type="button"
            className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-200 disabled:text-gray-200"
            onClick={() => handleShowForm(!formModalState.open)}
          >
            <PlusIcon className="mr-1 h-4" />
            Tambah Riwayat Pendidikan
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
                Jenjang
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
                Ijazah Terakhir
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Ijazah CPNS
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
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.jenjang_str}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.pt}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.prodi}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  {format(new Date(each.tanggal_lulus), 'dd MMM yyyy')}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  {each.is_ijazah_terakhir ? 'Ya' : 'Tidak'}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.is_ijazah_cpns ? 'Ya' : 'Tidak'}</td>
                <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                  <div className="flex justify-between">
                    {allowViewPendidikan && (
                      <button
                        onClick={() => onShowDetail(each.riwayat_id)}
                        type="button"
                        className="mr-2 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200"
                      >
                        Lihat
                      </button>
                    )}
                    {allowEditPendidikan && (
                      <button
                        type="button"
                        className="mr-2 inline-flex items-center rounded border border-indigo-600 px-2.5 py-1.5 text-xs font-medium text-indigo-600 shadow-sm hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-indigo-200 disabled:text-indigo-200"
                        onClick={() => handleShowForm(!formModalState.open, String(each.riwayat_id))}
                      >
                        Edit
                      </button>
                    )}
                    {allowDeletePendidikan && (
                      <button
                        type="button"
                        className="inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-200 disabled:text-gray-200"
                        onClick={() => setConfirmId(each.riwayat_id)}
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {formModalState.open ? (
        <PendidikanForm
          onSuccess={() => mutate()}
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
