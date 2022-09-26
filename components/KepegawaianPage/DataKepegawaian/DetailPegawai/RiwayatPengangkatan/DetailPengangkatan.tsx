import { ChevronLeftIcon } from '@heroicons/react/outline';

import { RiwayatPengangkatanPekerjaan } from '../../../../../constants/APIUrls';
import {
  GetRiwayatPengangkatanDetailReq,
  RiwayatPengangkatanDetailData,
} from '../../../../../types/api/RiwayatPengangkatanAPI';
import { yearMonthDuration } from '../../../../../utils/DateUtil';
import FileLoader from '../../../../shared/FileLoader';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import Loader from '../../../../shared/Loader/Loader';

type Props = {
  riwayatId?: number;
  onBack: () => void;
};

export default function DetailPengangkatan(props: Props) {
  const { riwayatId, onBack } = props;
  const { data, isValidating } = useCommonApi<GetRiwayatPengangkatanDetailReq, RiwayatPengangkatanDetailData>(
    RiwayatPengangkatanPekerjaan.GET_RIWAYAT_PENGANGKATAN_DETAIL,
    { riwayat_id: Number(riwayatId) },
    { method: 'GET' },
    { skipCall: !riwayatId, revalidateOnMount: true }
  );

  if (isValidating) {
    return <Loader />;
  }

  return (
    <>
      <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="tracking-wide text-gray-600">Kembali</span>
      </div>
      <div>
        <div className="mb-2 text-[24px] font-[600]">Riwayat Pengangkatan Pekerjaan</div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'No. SK Pengangkatan', value: data?.no_sk },
              { label: 'Tanggal SK Pengangkatan', value: data?.tanggal_sk },
              { label: 'TMT awal', value: data?.tmt_awal },
              { label: 'TMT akhir', value: data?.tmt_akhir },
              {
                label: 'Masa Kerja',
                value: yearMonthDuration(data!.tmt_awal, data!.tmt_akhir).join(' tahun, ') + ' bulan',
              },
              { label: 'Nama Jabatan', value: data?.jabatan },
              { label: 'Unit Kerja ', value: data?.unit_kerja },
              { label: 'Unit Kerja Pemerintahan', value: data?.is_unit_kerja_pemerintah ? 'Iya' : 'Tidak' },
              { label: 'Jabatan Penandatangan SK Pengangkatan', value: data?.jabatan_penandatangan },
              { label: 'Bukti Pengangkatan', value: <FileLoader uuid={data?.files?.[0]?.document_uuid} /> },
            ].map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
