import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RiwayatAnakAPI, RiwayatKeluargaAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  DelAnakList,
  GetAnakList,
  GetAnakListRes,
  GetDetailKeluargaReq,
  PostListKeluargaReq,
  PostListKeluargaRes,
} from '../../../../../types/api/RiwayatKeluargaAPI';
import { Status } from '../../../../../types/Common';
import { callAPI } from '../../../../../utils/Fetchers';
import ConfirmDialog from '../../../../shared/ConfirmDialog';
import FileLoader from '../../../../shared/FileLoader';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import { PDFIcon } from '../../../../shared/icons/PDFIcon';
import AnakForm from './AnakForm';
import DetailAnak from './DetailAnak';

type DetailAnakProps = {
  riwayatKeluargaId?: number;
  onBack: () => void;
  onShowDetail: (id: number) => void;
};

export default function DetailPenghargaan(props: DetailAnakProps) {
  const { onBack, riwayatKeluargaId } = props;
  const personalPegawaiData = usePersonalData();
  const [confirmId, setConfirmId] = React.useState(0);
  const dispatch = useDispatch();
  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: number }>({
    open: false,
    selectedId: undefined,
  });
  const [showDetailsAnak, setShowDetailsAnak] = React.useState<{ open: boolean; selectedId?: number }>({
    open: false,
    selectedId: undefined,
  });
  const [religionState, setRegiligionState] = React.useState<React.SetStateAction<string>>();
  const [marriageState, setMarriageState] = React.useState<React.SetStateAction<string>>();

  const { data: detailKeluarga } = useCommonApi<GetDetailKeluargaReq, PostListKeluargaReq>(
    RiwayatKeluargaAPI.POST_RIWAYAT_KELUARGA_DETAIL,
    { pasangan_id: Number(riwayatKeluargaId) },
    { method: 'GET' }
  );

  const { data: detailAnak, mutate } = useCommonApi<GetAnakList, GetAnakListRes[]>(
    RiwayatAnakAPI.GET_RIWAYAT_ANAK_LIST,
    { pegawai_id: Number(personalPegawaiData?.pegawai_id), pasangan_id: Number(riwayatKeluargaId) },
    { method: 'GET' }
  );

  const handleConfirm = async () => {
    const resDelete = await callAPI<DelAnakList, PostListKeluargaRes>(
      RiwayatAnakAPI.POST_RIWAYAT_ANAK_DELETE,
      { anak_id: confirmId },
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

  const handleShowDetails = (open: boolean, selectedId?: number) => {
    setShowDetailsAnak({
      open,
      selectedId,
    });
  };

  const LinkFile = ({ link, value }: { link?: string; value?: string }) => {
    if (!link) {
      return <>{value}</>;
    }
    return (
      <FileLoader uuid={link} asLink>
        <a className="ml-2 whitespace-nowrap text-blue-500 underline">{value}</a>
      </FileLoader>
    );
  };

  React.useEffect(() => {
    if (detailKeluarga?.status_pernikahan === 1) {
      setMarriageState('Menikah');
    } else if (detailKeluarga?.status_pernikahan === 2) {
      setMarriageState('Cerai Meninggal');
    } else if (detailKeluarga?.status_pernikahan === 3) {
      setMarriageState('Cerai Hidup');
    } else if (detailKeluarga?.status_pernikahan === 4) {
      setMarriageState('Cerai Meninggal');
    }
  }, [detailKeluarga?.status_pernikahan]);

  React.useEffect(() => {
    if (detailKeluarga?.agama === 1) {
      setRegiligionState('Buddha');
    } else if (detailKeluarga?.agama === 2) {
      setRegiligionState('Hindu');
    } else if (detailKeluarga?.agama === 3) {
      setRegiligionState('Islam');
    } else if (detailKeluarga?.agama === 4) {
      setRegiligionState('Katolik');
    } else if (detailKeluarga?.agama === 5) {
      setRegiligionState('Protestan');
    } else if (detailKeluarga?.agama === 6) {
      setRegiligionState('Tidak dapat disebutkan');
    }
  }, [detailKeluarga?.agama]);

  return showDetailsAnak.open ? (
    <DetailAnak
      riwayatAnakId={Number(riwayatKeluargaId)}
      onBack={() => {
        handleShowDetails(!showDetailsAnak.open);
      }}
    />
  ) : formModalState.open ? (
    <AnakForm
      onSuccess={() => mutate()}
      riwayatKeluargaId={Number(riwayatKeluargaId)}
      open={formModalState.open}
      setOpen={(open: boolean) => handleShowForm(open)}
      selectedId={formModalState?.selectedId}
    />
  ) : (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
          <ChevronLeftIcon className="mr-1 h-5" />
          <span className="tracking-wide text-gray-600">Kembali</span>
        </div>
        <button
          onClick={() => handleShowForm(!formModalState.open)}
          type="button"
          className="mt-5 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-200 disabled:text-gray-200"
        >
          <PlusIcon className="mr-1 h-4" />
          Tambah Anak
        </button>
      </div>
      <div>
        <span className="mb-2 text-[24px] font-[600]">Data Pasangan</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Nama', value: detailKeluarga?.nama },
              { label: 'Tempat Lahir', value: detailKeluarga?.tempat_lahir },
              { label: 'Tanggal Lahir', value: detailKeluarga?.tanggal_lahir },
              { label: 'Jenis Kelamin', value: detailKeluarga?.jenis_kelamin === 1 ? 'Laki-Laki' : 'Perempuan' },

              { label: 'Agama', value: religionState },
              { label: 'No Hp', value: detailKeluarga?.hp.length === 0 ? '-' : detailKeluarga?.hp },
              {
                label: 'Kartu Identitas',
                value: (
                  <div className="flex flex-row items-center space-x-2">
                    <PDFIcon />
                    <LinkFile
                      link={detailKeluarga?.files?.[0].document_uuid}
                      value={detailKeluarga?.files?.[0].document_name}
                    />
                  </div>
                ),
              },
              { label: 'Alamat', value: detailKeluarga?.alamat },
              {
                label: 'Nomor Akta Kelahiran',
                value: detailKeluarga?.nomor_akta_kelahiran?.length === 0 ? '-' : detailKeluarga?.nomor_akta_kelahiran,
              },
              {
                label: 'Akta Kelahiran',
                value: (
                  <div className="flex flex-row items-center space-x-2">
                    {detailKeluarga?.files?.[2].document_name.length === 0 ? (
                      '-'
                    ) : (
                      <>
                        <PDFIcon />
                        <h6>detailKeluarga?.files?.[2].document_name</h6>
                      </>
                    )}
                  </div>
                ),
              },
              { label: 'Status Hidup', value: detailKeluarga?.status_hidup === 1 ? 'Hidup' : 'Wafat' },
              {
                label: 'Nomer NPWP',
                value: detailKeluarga?.nomor_npwp?.length === 0 ? '-' : detailKeluarga?.nomor_npwp,
              },
              { label: 'Status Pasangan', value: detailKeluarga?.status_pasangan === 1 ? 'Suami' : 'Istri' },
              { label: 'Status PNS', value: detailKeluarga?.status_pns === 1 ? 'PNS' : 'Non-PNS' },
              { label: 'Tanggal Menikah', value: format(new Date(detailKeluarga?.tanggal_menikah), 'yyyy-MM-dd') },
              { label: 'Nomer Akta Nikah', value: detailKeluarga?.nomor_akta_menikah },
              {
                label: 'Akta Nikah',
                value: (
                  <div className="flex flex-row items-center space-x-2">
                    <PDFIcon />
                    <LinkFile
                      link={detailKeluarga?.files?.[1].document_uuid}
                      value={detailKeluarga?.files?.[1].document_name}
                    />
                  </div>
                ),
              },
              {
                label: 'Tanggal Meninggal',
                value:
                  detailKeluarga?.tanggal_meninggal === null
                    ? '-'
                    : format(new Date(detailKeluarga?.tanggal_meninggal), 'yyyy-MM-dd'),
              },
              {
                label: 'Nomer Akta Meninggal',
                value: detailKeluarga?.nomor_akta_meninggal?.length === 0 ? '-' : detailKeluarga?.nomor_akta_meninggal,
              },
              { label: 'Akta Meninggal', value: '-' },
              {
                label: 'Tanggal Cerai',
                value:
                  detailKeluarga?.tanggal_cerai === null
                    ? '-'
                    : format(new Date(detailKeluarga?.tanggal_cerai), 'yyyy-MM-dd'),
              },
              {
                label: 'No Akta Cerai',
                value: detailKeluarga?.nomor_akta_cerai?.length === 0 ? '-' : detailKeluarga?.nomor_akta_cerai,
              },
              {
                label: 'Akta Cerai',
                value: (
                  <div className="flex flex-row items-center space-x-2">
                    {detailKeluarga?.nomor_akta_cerai?.length === 0 ? (
                      '-'
                    ) : (
                      <>
                        <PDFIcon />
                        <LinkFile
                          link={detailKeluarga?.files?.[3].document_uuid}
                          value={detailKeluarga?.files?.[3].document_name}
                        />
                      </>
                    )}
                  </div>
                ),
              },
              {
                label: 'No Kartu Suami/Istri',
                value:
                  detailKeluarga?.nomor_kartu_suami_istri?.length === 0 ? '-' : detailKeluarga?.nomor_kartu_suami_istri,
              },
              {
                label: 'Kartu Suami/Istri',
                value: (
                  <div className="flex flex-row items-center space-x-2">
                    {detailKeluarga?.nomor_kartu_suami_istri?.length === 0 ? (
                      '-'
                    ) : (
                      <>
                        <PDFIcon />
                        <LinkFile
                          link={detailKeluarga?.files?.[4].document_uuid}
                          value={detailKeluarga?.files?.[4].document_name}
                        />
                      </>
                    )}
                  </div>
                ),
              },
              { label: 'Status Pernikahan', value: marriageState },
              { label: 'Jumlah Anak', value: detailAnak?.length === 0 ? '-' : detailAnak?.length + ' Anak' },
            ].map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 overflow-auto">
        <span className="text-[24px] font-[600]">Data Anak</span>
        {(detailAnak || []).map((each, index) => (
          <table className="mt-2 min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Nama
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Status Hubungan Anak
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Tanggal Lahir
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Status Hidup
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="px-2 py-4 text-sm font-medium text-[#6B7280]">{index + 1}</td>
                <td className="px-2 py-4 text-sm font-medium text-[#111827]">{each?.nama}</td>
                <td className="px-2 py-4 text-sm font-medium text-[#6B7280]">
                  {each?.status_anak === 2 ? 'Kandung' : 'Angkat'}
                </td>
                <td className="px-2 py-4 text-sm font-medium text-[#111827]">
                  {format(new Date(each.tanggal_lahir), 'yyyy-MM-dd')}
                </td>
                <td className="px-2 py-4 text-sm font-medium text-[#6B7280]">
                  <div className="whitespace-nowrap">{each?.status_hidup === 1 ? 'Hidup' : 'Wafat'}</div>
                </td>
                <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                  <div className="flex justify-start">
                    <button
                      onClick={() => {
                        handleShowDetails(!showDetailsAnak.open, riwayatKeluargaId);
                      }}
                      type="button"
                      className="mr-2 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200"
                    >
                      Lihat
                    </button>
                    <button
                      onClick={() => setConfirmId(each.anak_id)}
                      type="button"
                      className="inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-200 disabled:text-gray-200"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
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
