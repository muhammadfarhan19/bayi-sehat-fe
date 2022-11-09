import { ChevronLeftIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { RekapDinasAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import {
  GetRekapDetailReq,
  PostDinasDeleteReq,
  PostDinasDeleteRes,
  RekapDetailData,
} from '../../../types/api/RekapDinasAPI';
import { Status } from '../../../types/Common';
import { classNames } from '../../../utils/Components';
import { callAPI } from '../../../utils/Fetchers';
import { getQueryString } from '../../../utils/URLUtils';
import ConfirmDialog from '../../shared/ConfirmDialog';
import FileLoader from '../../shared/FileLoader';
import useCommonApi from '../../shared/hooks/useCommonApi';
import { PDFIcon } from '../../shared/icons/PDFIcon';

interface DetailProps {
  dinas_id: string;
  viewOnly?: boolean;
}

function DetailRekapPage(props: DetailProps) {
  const dispatch = useDispatch();
  const { dinas_id, viewOnly } = props;

  const qs = getQueryString<{ pegawai_id?: string }>();
  const redirectBackLink = qs.pegawai_id
    ? '/dinas/pegawai/detail?pegawai_id=' + qs.pegawai_id
    : viewOnly
    ? '/'
    : '/kepegawaian/rekap-dinas';

  const [confirmId, setConfirmId] = React.useState(0);
  const { data } = useCommonApi<GetRekapDetailReq, RekapDetailData>(
    RekapDinasAPI.GET_DINAS_DETAIL,
    { dinas_id: Number(dinas_id) },
    { method: 'GET' }
  );

  const handleConfirm = async () => {
    const resDelete = await callAPI<PostDinasDeleteReq, PostDinasDeleteRes>(
      RekapDinasAPI.POST_DINAS_DELETE,
      { dinas_id: confirmId },
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
    setTimeout(() => {
      window.location.href = '/kepegawaian/rekap-dinas';
    }, 2000);
  };

  return (
    <>
      <div className="rounded-lg bg-white shadow">
        <Link href={redirectBackLink}>
          <span className="flex cursor-pointer flex-row items-center gap-x-2 py-6 px-6">
            <ChevronLeftIcon className="h-5 w-5" />
            <div>Kembali</div>
          </span>
        </Link>
        <div className="px-6 pb-6">
          <div className="flex flex-col">
            <p className="text-[24px] font-medium text-gray-900">Data Dinas</p>
          </div>

          <div className="mt-[32px] w-full">
            <div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead></thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {[
                    { label: 'Unit Kerja', value: data?.unit_kerja_str },
                    { label: 'Nomor Surat ', value: data?.no_sp },
                    { label: 'Tanggal Surat', value: data?.tgl_surat },
                    { label: 'Tanggal Dinas', value: data?.tgl_mulai + ' - ' + data?.tgl_selesai },
                    { label: 'Jenis Dinas', value: data?.jenis_dinas },
                    { label: 'PIC Kegiatan', value: data?.pic || '-' },
                    { label: 'Lokasi Dinas', value: data?.lokasi },
                    {
                      label: 'Isi Penugasan',
                      value: data?.isi_penugasan,
                    },
                  ].map((each, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">Berkas</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                      <FileLoader uuid={data?.surat_tugas?.[0]?.document_uuid}>
                        <div className="flex items-center">
                          <PDFIcon />
                          <span className="ml-1 whitespace-nowrap text-blue-500 underline">{'Surat Tugas'} </span>
                        </div>
                      </FileLoader>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">Pegawai</td>
                    <td className="px-4">
                      {data?.pegawai?.map(each => (
                        <div className="my-4 flex flex-col gap-y-[8px]">
                          <p className="px-2 text-[14px]">{each.nama_pegawai}</p>
                          <p className="px-2 text-[12px] text-[#6B7280]">{each.unit_kerja_str}</p>

                          <div className="flex flex-row">
                            <p
                              className={classNames(
                                each?.flag === 0
                                  ? 'text-[#DC2626]'
                                  : each?.flag === 1
                                  ? 'text-yellow-400'
                                  : 'text-[#10B981]',
                                'px-2 text-[14px]'
                              )}
                            >
                              {each?.flag === 0
                                ? 'Not Available'
                                : each?.flag === 1
                                ? 'Partialy Available'
                                : 'Available'}
                              ,
                            </p>
                            <p className="text-[14px]">
                              {each.tgl_mulai} - {each.tgl_selesai}
                            </p>
                          </div>
                        </div>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {!viewOnly && (
            <div className="mt-[3rem] flex w-full">
              <div className="ml-auto flex flex-row gap-x-[12px]">
                <button
                  type="button"
                  className="rounded-[6px] bg-[#9CA3AF] py-[9px] px-[17px] text-[14px] text-gray-50"
                  onClick={() => setConfirmId(Number(data?.dinas_id))}
                >
                  Hapus
                </button>
                <button
                  type="button"
                  className="rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-[14px] text-gray-50"
                  onClick={() =>
                    (window.location.href = `/kepegawaian/rekap-dinas?dinas_id=${data?.dinas_id}&type=edit`)
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
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

export default DetailRekapPage;
