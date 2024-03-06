import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import { KlaimKehadiranList } from '../../../constants/APIUrls';
import { GetKehadiranDataList, GetKehadiranList } from '../../../types/api/KlaimKehadiranAPI';
import { LinkFile } from '../../KepegawaianPage/DataKepegawaian/DetailPegawai/DataDiriPribadi';
import useCommonApi from '../../shared/hooks/useCommonApi';
import { PDFIcon } from '../../shared/icons/PDFIcon';

type DetailPenghargaanProps = {
  klaimDetailId?: number;
  onBack?: () => void;
};

function KlaimDetail(props: DetailPenghargaanProps) {
  const { onBack, klaimDetailId } = props;

  const { data: getKlaimKehadiran } = useCommonApi<GetKehadiranList, GetKehadiranDataList>(
    KlaimKehadiranList.GET_KLAIM_KEHADIRAN_LIST,
    { page: 1, per_page: 10 },
    { method: 'GET' },
    { revalidateOnMount: true }
  );

  const filterData = getKlaimKehadiran?.list?.find(data => data.id === klaimDetailId);

  return (
    <div className="rounded-md bg-white px-6 py-6">
      <div className="my-3 inline-flex cursor-pointer items-center bg-white" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="bg-white tracking-wide text-gray-600">Kembali</span>
      </div>
      <div className="bg-white">
        <span className="mb-2 text-[24px] font-[600]">Data Klaim Kehadiran</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Nama', value: filterData?.nama },
              { label: 'Tanggal', value: filterData?.tanggal_klaim },
              { label: 'Jenis Pengajuan', value: filterData?.jenis_pengajuan },
              {
                label: 'Dokumen',
                value: (
                  <div className="flex flex-row items-center space-x-2">
                    <PDFIcon />
                    <LinkFile
                      link={filterData?.files?.[0].document_uuid}
                      value={filterData?.files?.[0].document_name}
                    />
                  </div>
                ),
              },
              { label: 'Status', value: filterData?.status_klaim_str },
              { label: 'Alasan', value: filterData?.alasan_klaim },
            ].map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KlaimDetail;
