import * as React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { GolonganAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  GetRiwayatGolonganListReq,
  RiwayatGolonganListData,
  UpdateSuratKeputusanReq,
  UpdateSuratKeputusanRes,
} from '../../../../../types/api/GolonganAPI';
import { Status } from '../../../../../types/Common';
import { formatDate } from '../../../../../utils/DateUtil';
import { callAPI } from '../../../../../utils/Fetchers';
import { getQueryString } from '../../../../../utils/URLUtils';
import { CircleProgress } from '../../../../shared/CircleProgress';
import FileLoader from '../../../../shared/FileLoader';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import { PDFIcon } from '../../../../shared/icons/PDFIcon';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';

export default function RiwayatGolongan() {
  const dispatch = useDispatch();
  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();

  const { data: riwayatGolongan, mutate } = useCommonApi<GetRiwayatGolonganListReq, RiwayatGolonganListData[]>(
    GolonganAPI.GET_RIWAYAT_GOLONGAN_LIST,
    pegawai_id ? { pegawai_id: Number(pegawai_id) } : {},
    { method: 'GET' }
  );

  const handleUploadChange = (riwayat_id: number) => async (files: FileObject[]) => {
    const resSubmit = await callAPI<UpdateSuratKeputusanReq, UpdateSuratKeputusanRes>(
      GolonganAPI.UPDATE_SURAT_KEPUTUSAN,
      {
        riwayat_id,
        files: [{ document_uuid: files[0].id, document_name: files[0].name }],
      },
      { method: 'post' }
    );
    if (resSubmit.status === 200 && resSubmit.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil tersimpan.',
          type: SnackbarType.INFO,
        })
      );
      mutate();
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
    }
  };

  return (
    <>
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
                Masa Kerja
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
            {(riwayatGolongan || []).map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.pangkat}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.golongan}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  <div className="whitespace-nowrap">{formatDate(new Date(each.tmt), 'yyyy-MM-dd')}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                  <div className="whitespace-nowrap">{each.masa_kerja}</div>
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
                <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <UploadWrapper allowedTypes={['pdf']} handleUploadChange={handleUploadChange(each.riwayat_id)}>
                      {({ loading }) => (
                        <button
                          type="button"
                          className="flex w-[150px] justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-200"
                        >
                          {loading ? <CircleProgress /> : null}
                          Unggah berkas
                        </button>
                      )}
                    </UploadWrapper>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
