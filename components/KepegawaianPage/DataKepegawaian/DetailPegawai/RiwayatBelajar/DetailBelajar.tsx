import { ChevronLeftIcon } from '@heroicons/react/outline';

import { RiwayatBelajarAPI } from '../../../../../constants/APIUrls';
import { GetRiwayatBelajarDetailReq, RiwayatBelajarDetailData } from '../../../../../types/api/RiwayatBelajarAPI';
import ImgFile from '../../../../shared/FileLoader';
import useCommonApi from '../../../../shared/hooks/useCommonApi';

type ListDigitalProps = {
  riwayatBelajarId?: number;
  onBack: () => void;
};

const jenjang = [
  {
    id: 1,
    name: 'S3',
  },
  {
    id: 2,
    name: 'S2',
  },
  {
    id: 3,
    name: 'S1',
  },
  {
    id: 4,
    name: 'D3',
  },
  {
    id: 5,
    name: 'SMA',
  },
  {
    id: 6,
    name: 'D1',
  },
  {
    id: 7,
    name: 'SD',
  },
  {
    id: 8,
    name: 'SMK',
  },
  {
    id: 9,
    name: 'D2',
  },
  {
    id: 10,
    name: 'D4',
  },
  {
    id: 11,
    name: 'Profesi',
  },
  {
    id: 12,
    name: 'S2-Terapan',
  },
  {
    id: 13,
    name: 'S3-Terapan',
  },
  {
    id: 14,
    name: 'Sp-1',
  },
  {
    id: 15,
    name: 'Sp-2',
  },
  {
    id: 16,
    name: 'SMP',
  },
];

const jenis = [
  { id: 1, name: 'Tugas Belajar' },
  { id: 2, name: 'Izin Belajar' },
];

const lokasi = [
  { id: 1, name: 'Dalam Negeri' },
  { id: 2, name: 'Luar Negeri' },
];

const statusRiwayatBelajar = [
  { id: 1, name: 'Perpanjangan' },
  { id: 2, name: 'Baru' },
];

export default function DetailBelajar(props: ListDigitalProps) {
  const { riwayatBelajarId, onBack } = props;

  const { data } = useCommonApi<GetRiwayatBelajarDetailReq, RiwayatBelajarDetailData>(
    RiwayatBelajarAPI.GET_RIWAYAT_BELAJAR_DETAIl,
    { riwayat_id: Number(riwayatBelajarId) },
    { method: 'GET' },
    { skipCall: !riwayatBelajarId, revalidateOnMount: true }
  );

  return (
    <>
      <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="tracking-wide text-gray-600">Kembali</span>
      </div>
      <div>
        <span className="mb-2 text-[24px] font-[600]">Riwayat Belajar</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Jenis Belajar', value: jenis.filter(each => each.id === data?.jenis_belajar)[0]?.name },
              {
                label: 'Status Riwayat Belajar',
                value: statusRiwayatBelajar.filter(each => each.id === data?.status_riwayat_belajar)[0]?.name,
              },
              { label: 'Jenjang', value: jenjang.filter(each => each.id === data?.jenjang_id)[0]?.name },
              { label: 'Lembaga', value: data?.nama_institusi },
              { label: 'Prodi/Jurusan', value: data?.prodi },
              { label: 'Sumber Biaya', value: data?.sumber_biaya },
              { label: 'Kota', value: data?.kota },
              { label: 'Lokasi', value: lokasi.filter(each => each.id === data?.lokasi)[0]?.name },
              { label: 'Tangal Mulai', value: data?.tahun_mulai },
              { label: 'Tangal Selesai', value: data?.tahun_selesai },
              { label: 'Bukti', value: data?.files?.[0]?.document_name },
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
