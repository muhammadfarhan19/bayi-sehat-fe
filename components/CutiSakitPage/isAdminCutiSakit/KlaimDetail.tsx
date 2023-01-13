import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import { CutiAPI } from '../../../constants/APIUrls';
import { GetCutiListParams, GetCutiListRes } from '../../../types/api/CutiAPI';
import { formatDate } from '../../../utils/DateUtil';
import { LinkFile } from '../../KepegawaianPage/DataKepegawaian/DetailPegawai/DataDiriPribadi';
import useCommonApi from '../../shared/hooks/useCommonApi';
import { PDFIcon } from '../../shared/icons/PDFIcon';
import { StatusPengajuan } from '../Shared/_resource';

type DetailPenghargaanProps = {
  klaimDetailId?: number;
  onBack?: () => void;
};

function KlaimDetail(props: DetailPenghargaanProps) {
  const { onBack, klaimDetailId } = props;

  const { data: getKlaimCuti } = useCommonApi<GetCutiListParams, GetCutiListRes>(
    CutiAPI.GET_CUTI_LIST,
    { page: 1, per_page: 20 },
    { method: 'GET' },
    { revalidateOnMount: true }
  );

  const filterData = getKlaimCuti?.list?.find(data => data.id === klaimDetailId);

  const formattedDate = formatDate(new Date(filterData?.tanggal ?? ''), 'dd MMM yyyy');

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
              { label: 'Nama', value: filterData?.nama_pegawai },
              { label: 'Tanggal', value: formattedDate },
              { label: 'Jenis Pengajuan', value: filterData?.type === 1 ? 'Cuti' : 'Cuti Sakit' },
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
              {
                label: 'Status',
                value:
                  filterData?.status === StatusPengajuan.Diterima
                    ? 'Diterima'
                    : filterData?.status === StatusPengajuan.Ditolak
                    ? 'Ditolak'
                    : 'Diajukan',
              },
              { label: 'Alasan', value: filterData?.note },
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
