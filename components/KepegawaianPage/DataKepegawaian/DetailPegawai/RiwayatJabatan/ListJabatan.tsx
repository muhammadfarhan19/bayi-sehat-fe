import { PlusIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { JabatanAPI, RbacAPI, UserAPI } from '../../../../../constants/APIUrls';
import { Permissions } from '../../../../../constants/Permission';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  GetRiwayatJabatanReq,
  PostRiwayatJabatanDeleteReq,
  PostRiwayatJabatanDeleteRes,
  RiwayatJabatanData,
} from '../../../../../types/api/JabatanAPI';
import { AuthorizeData, PostRbacBulkAuthorizeReq } from '../../../../../types/api/RbacAPI';
import { GetUserProfileData, GetUserProfileReq } from '../../../../../types/api/UserAPI';
import { Status } from '../../../../../types/Common';
import { formatDate } from '../../../../../utils/DateUtil';
import { callAPI } from '../../../../../utils/Fetchers';
import { getQueryString } from '../../../../../utils/URLUtils';
import ConfirmDialog from '../../../../shared/ConfirmDialog';
import FileLoader from '../../../../shared/FileLoader';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import { PDFIcon } from '../../../../shared/icons/PDFIcon';
import JabatanForm from './JabatanForm';

type ListJabatanProps = {
  onShowDetail: (id: number) => void;
};

export default function ListJabatan(props: ListJabatanProps) {
  const { onShowDetail } = props;
  const [confirmId, setConfirmId] = React.useState(0);
  const dispatch = useDispatch();
  const { pegawai_id: pegawai_id_qs } = getQueryString<{ pegawai_id?: string }>();

  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: string }>({
    open: false,
    selectedId: undefined,
  });

  const { data: riwayatJabatan, mutate } = useCommonApi<GetRiwayatJabatanReq, RiwayatJabatanData[]>(
    JabatanAPI.GET_RIWAYAT_JABATAN,
    pegawai_id_qs ? { pegawai_id: Number(pegawai_id_qs) } : {},
    { method: 'GET' }
  );

  const handleShowForm = (open: boolean, selectedId?: string) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  const { data: userProfile, isValidating: userProfileLoading } = useCommonApi<GetUserProfileReq, GetUserProfileData>(
    UserAPI.GET_USER_PROFILE,
    {},
    { method: 'GET' }
  );

  const { data: rbac } = useCommonApi<PostRbacBulkAuthorizeReq, AuthorizeData[]>(
    RbacAPI.POST_RBAC_BULK_AUTHORIZE,
    {
      bulk_request: [{ action: 'read', resource_id: Permissions.KepegawaianAdmin, user_id: userProfile?.user_id || 0 }],
    },
    { method: 'POST' },
    { revalidateOnMount: true, skipCall: userProfileLoading }
  );

  const allowKepegawaianAdmin = !!rbac?.[0]?.is_authorized;

  const handleConfirm = async () => {
    const resDelete = await callAPI<PostRiwayatJabatanDeleteReq, PostRiwayatJabatanDeleteRes>(
      JabatanAPI.POST_RIWAYAT_JABATAN_DELETE,
      { jabatan_pegawai_id: confirmId },
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
      {allowKepegawaianAdmin && (
        <div className="my-3 flex items-center">
          <div className="flex flex-1 pr-2 text-sm text-gray-500">{/* TODO: Wait for wording */}</div>
          <button
            type="button"
            className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-200 disabled:text-gray-200"
            onClick={() => handleShowForm(!formModalState.open)}
          >
            <PlusIcon className="mr-1 h-4" />
            Tambah Riwayat Jabatan
          </button>
        </div>
      )}
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
                Tipe Jabatan
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
                Kumulatif
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                TMT Jabatan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Masa Jabatan
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
            {(riwayatJabatan || []).map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  <div className="whitespace-nowrap">{index + 1}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  <div className="whitespace-nowrap">{each.jenis_jabatan}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.nama_jabatan}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  <div className="whitespace-nowrap">{each.kumulatif}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  <div className="whitespace-nowrap">{formatDate(new Date(each.tmt), 'yyyy-MM-dd')}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  <div className="whitespace-nowrap">{each.masa_kerja}</div>
                </td>
                <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                  <FileLoader uuid={each?.files?.[0]?.document_uuid}>
                    <div className="flex items-center">
                      <PDFIcon />
                      <span className="ml-1 whitespace-nowrap text-blue-500 underline">{'Surat Keputusan'} </span>
                    </div>
                  </FileLoader>
                </td>
                <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <button
                      onClick={() => onShowDetail(each.jabatan_pegawai_id)}
                      type="button"
                      className="mr-2 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200"
                    >
                      Lihat
                    </button>
                    {allowKepegawaianAdmin && (
                      <>
                        <button
                          type="button"
                          className="mr-2 inline-flex items-center rounded border border-indigo-600 px-2.5 py-1.5 text-xs font-medium text-indigo-600 shadow-sm hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-indigo-200 disabled:text-indigo-200"
                          onClick={() => handleShowForm(!formModalState.open, String(each.jabatan_pegawai_id))}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="mr-2 inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-200 disabled:text-gray-200"
                          onClick={() => setConfirmId(each.jabatan_pegawai_id)}
                        >
                          Hapus
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {allowKepegawaianAdmin && (
        <JabatanForm
          onSuccess={() => mutate()}
          open={formModalState.open}
          setOpen={(open: boolean) => handleShowForm(open)}
          selectedId={formModalState?.selectedId}
        />
      )}
      <ConfirmDialog
        open={!!confirmId}
        message="Anda yakin ingin menghapus data ini?"
        onClose={() => setConfirmId(0)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
