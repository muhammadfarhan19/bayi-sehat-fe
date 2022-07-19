import { ChevronLeftIcon } from '@heroicons/react/outline';

import { RiwayatPenghargaan } from '../../../../../constants/APIUrls';
import { GetRiwayatPenghargaanDetailReq, PenghargaanList } from '../../../../../types/api/RiwayatPenghargaanAPI';
import useCommonApi from '../../../../shared/hooks/useCommonApi';

type DetailPenghargaanProps = {
  riwayatPenghargaanId?: number;
  onBack: () => void;
};


export default function DetailPenghargaan(props: DetailPenghargaanProps) {
  const { onBack, riwayatPenghargaanId } = props;
  const { data: riwayatDetail } = useCommonApi<GetRiwayatPenghargaanDetailReq, PenghargaanList>(
    RiwayatPenghargaan.GET_RIWAYAT_PENGHARGAAN_LIST,
    { id: Number(riwayatPenghargaanId) },
    { method: 'GET' },
    { skipCall: !riwayatPenghargaanId, revalidateOnMount: true }
  );

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
              { label: 'Penghargaan', value: riwayatDetail?.nama_penghargaan },
              { label: 'Tingkat Penghargaan', value: riwayatDetail?.tingkat_penghargaan },
              { label: 'Penyelenggara', value: riwayatDetail?.penyelenggara },
              { label: 'Tanggal Penghargaan', value: riwayatDetail?.tgl_penghargaan },
              { label: 'Keterangan Penghargaan', value: riwayatDetail?.keterangan },
              { label: 'No Penghargaan', value: riwayatDetail?.no_penghargaan },
              // data?.files?.[0]?.document_name
              // { label: 'Dokumen', value: data?.bukti_penghargaan },
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
          Download File
        </div>
      </div>
    </>
  );
}
