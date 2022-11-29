import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import { RiwayatKGBAPI } from '../../../../../constants/APIUrls';
import { GetKGBList, PostDetailRiwayatKGBReq } from '../../../../../types/api/RiwayatKGBApi';
import ImgFile from '../../../../shared/FileLoader';
import useCommonApi from '../../../../shared/hooks/useCommonApi';

type DetailKGBProps = {
  riwayatKGBId?: number;
  onBack: () => void;
};

function RiwayatKGBDetail(props: DetailKGBProps) {
  const { riwayatKGBId, onBack } = props;

  const { data } = useCommonApi<PostDetailRiwayatKGBReq, GetKGBList>(
    RiwayatKGBAPI.GET_RIWAYAT_KGB_DETAIL,
    { riwayat_id: Number(riwayatKGBId) },
    { method: 'GET' },
    { revalidateOnMount: true }
  );

  return (
    <>
      <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="tracking-wide text-gray-600">Kembali</span>
      </div>
      <div>
        <span className="mb-2 text-[24px] font-[600]">Riwayat KGB</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Golongan', value: data?.golongan_id_str },
              { label: 'Tanggal KGB', value: data?.tanggal_kgb },
              { label: 'TMT KGB', value: data?.tmt_kgb },
              { label: 'Pejabat Penandatangan KGB', value: data?.penandatangan },
              // { label: 'Jabatan Penandatangan', value: data?.jabatan_id_str },
              // { label: 'TMT KGB Selanjutnya', value: data?.tmt_kgb_selanjutnya },
              { label: 'Bukti SK', value: data?.files?.[0]?.document_name },
            ].map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="relative mt-4 flex w-full flex-col items-center rounded-lg border-2 border-solid border-gray-300 p-4">
          <ImgFile uuid={data?.files?.[0]?.document_uuid} />
        </div>
      </div>
    </>
  );
}

export default RiwayatKGBDetail;
