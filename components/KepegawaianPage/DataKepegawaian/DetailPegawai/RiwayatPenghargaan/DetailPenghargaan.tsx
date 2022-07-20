import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import { RiwayatPenghargaan } from '../../../../../constants/APIUrls';
import { GetRiwayatPenghargaanListReq, PenghargaanList } from '../../../../../types/api/RiwayatPenghargaanAPI';
import ImgFile from '../../../../shared/FileLoader';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';

type DetailPenghargaanProps = {
  riwayatPenghargaanId?: number;
  onBack: () => void;
};

export default function DetailPenghargaan(props: DetailPenghargaanProps) {
  const { onBack, riwayatPenghargaanId } = props;
  const personalData = usePersonalData();
  const { data: riwayatDetail } = useCommonApi<GetRiwayatPenghargaanListReq, PenghargaanList[]>(
    RiwayatPenghargaan.GET_RIWAYAT_PENGHARGAAN_LIST,
    { pegawai_id: personalData?.pegawai_id },
    { method: 'GET' },
    { skipCall: !riwayatPenghargaanId, revalidateOnMount: true }
  );
  const filterData = riwayatDetail?.find(data => data.riwayat_id === riwayatPenghargaanId);

  return (
    <>
      <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="tracking-wide text-gray-600">Kembali</span>
      </div>
      <div>
        <span className="mb-2 text-[24px] font-[600]">Riwayat Pendidikan</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Penghargaan', value: filterData?.nama_penghargaan },
              { label: 'Tingkat Penghargaan', value: filterData?.tingkat_penghargaan },
              { label: 'Penyelenggara', value: filterData?.penyelenggara },
              { label: 'Tanggal Penghargaan', value: filterData?.tgl_penghargaan },
              { label: 'Keterangan Penghargaan', value: filterData?.keterangan },
              { label: 'No Penghargaan', value: filterData?.no_penghargaan },
              { label: 'Dokumen', value: filterData?.bukti_penghargaan.map(data => data.document_name) },
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
          <ImgFile uuid={filterData?.bukti_penghargaan[0].document_uuid} />
        </div>
      </div>
    </>
  );
}
