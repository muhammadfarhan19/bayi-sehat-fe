import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import { JabatanAPI } from '../../../../../constants/APIUrls';
import { GetRiwayatJabatanReq, RiwayatJabatanData } from '../../../../../types/api/JabatanAPI';
import { getQueryString } from '../../../../../utils/URLUtils';
import ImgFile from '../../../../shared/FileLoader';
import useCommonApi from '../../../../shared/hooks/useCommonApi';

type ListJabatanProps = {
  riwayatJabatanId?: number;
  onBack: () => void;
};

export default function DetailJabatan(props: ListJabatanProps) {
  const { riwayatJabatanId, onBack } = props;
  const { pegawai_id: pegawai_id_qs } = getQueryString<{ pegawai_id?: string }>();
  const { data: riwayatJabatan } = useCommonApi<GetRiwayatJabatanReq, RiwayatJabatanData[]>(
    JabatanAPI.GET_RIWAYAT_JABATAN,
    pegawai_id_qs ? { pegawai_id: Number(pegawai_id_qs) } : {},
    { method: 'GET' }
  );

  const detailForm = riwayatJabatan?.find(each => each.jabatan_pegawai_id === Number(riwayatJabatanId));
  const isFungsional = detailForm?.jenis_jabatan === 'Jabatan Fungsional';

  return (
    <>
      <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="tracking-wide text-gray-600">Kembali</span>
      </div>
      <div>
        <span className="mb-2 text-[24px] font-[600]">Riwayat Jabatan</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          {!isFungsional ? (
            <tbody className="divide-y divide-gray-200 bg-white">
              {[
                { label: 'Tipe Jabatan', value: detailForm?.jenis_jabatan },
                { label: 'Unit Kerja', value: detailForm?.nama_unit_kerja },
                { label: 'Jabatan', value: detailForm?.nama_jabatan },
                { label: 'TMT Jabatan', value: detailForm?.tmt.split('T')[0] },
                { label: 'Masa Jabatan', value: detailForm?.masa_kerja },
                { label: 'Bukti SK', value: detailForm?.files?.[0]?.document_name },
              ].map((each, index) => {
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each?.label}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{each?.value}</td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody className="divide-y divide-gray-200 bg-white">
              {[
                { label: 'Tipe Jabatan', value: detailForm?.jenis_jabatan },
                { label: 'Unit Kerja', value: detailForm?.nama_unit_kerja },
                { label: 'Jabatan', value: detailForm?.nama_jabatan },
                { label: 'Kumulatif', value: detailForm?.kumulatif },
                { label: 'TMT Jabatan', value: detailForm?.tmt.split('T')[0] },
                { label: 'Masa Jabatan', value: detailForm?.masa_kerja },
                { label: 'Bukti SK', value: detailForm?.files?.[0]?.document_name },
              ].map((each, index) => {
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each?.label}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{each?.value}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      <div>
        <div className="relative mt-4 flex w-full flex-col items-center rounded-lg border-2 border-solid border-gray-300 p-4">
          <ImgFile uuid={detailForm?.files?.[0]?.document_uuid} />
        </div>
      </div>
    </>
  );
}
