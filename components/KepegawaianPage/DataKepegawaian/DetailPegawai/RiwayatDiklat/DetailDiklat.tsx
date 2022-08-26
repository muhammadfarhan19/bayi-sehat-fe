import { ChevronLeftIcon } from '@heroicons/react/outline';

import { RiwayatDiklatAPI } from '../../../../../constants/APIUrls';
import { GetRiwayatDiklatDetailReq, RiwayatDiklatDetailData } from '../../../../../types/api/RiwayatDiklatAPI';
import ImgFile from '../../../../shared/FileLoader';
import useCommonApi from '../../../../shared/hooks/useCommonApi';

type ListDigitalProps = {
  riwayatDiklatId?: number;
  onBack: () => void;
};

export default function DetailDiklat(props: ListDigitalProps) {
  const { riwayatDiklatId, onBack } = props;
  const { data } = useCommonApi<GetRiwayatDiklatDetailReq, RiwayatDiklatDetailData>(
    RiwayatDiklatAPI.GET_RIWAYAT_DIKLAT_DETAIL,
    { id: Number(riwayatDiklatId) },
    { method: 'GET' },
    { skipCall: !riwayatDiklatId, revalidateOnMount: true }
  );

  return (
    <>
      <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="tracking-wide text-gray-600">Kembali</span>
      </div>
      <div>
        <span className="mb-2 text-[24px] font-[600]">Riwayat Pelatihan/ Diklat</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Jenis Diklat/Pelatihan', value: data?.jenis_diklat_str },
              { label: 'Nama Diklat/Pelatihan/Seminar', value: data?.nama_diklat },
              { label: 'Penyelenggara', value: data?.penyelenggara },
              { label: 'No Sertifikat', value: data?.no_sertifikat },
              { label: 'Lokasi', value: data?.lokasi },
              { label: 'Keterangan', value: data?.keterangan },
              { label: 'Tanggal Awal Acara', value: data?.tgl_awal_acara },
              { label: 'Tanggal Akhir Acara', value: data?.tgl_akhir_acara },
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
