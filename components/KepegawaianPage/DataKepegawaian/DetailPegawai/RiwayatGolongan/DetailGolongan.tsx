import { ChevronLeftIcon } from '@heroicons/react/outline';

import { RiwayatGolonganListData } from '../../../../../types/api/GolonganAPI';
import ImgFile from '../../../../shared/FileLoader';

type ListGolonganProps = {
  detail?: RiwayatGolonganListData;
  onBack: () => void;
};

export default function DetailGolongan(props: ListGolonganProps) {
  const { detail, onBack } = props;

  return (
    <>
      <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="tracking-wide text-gray-600">Kembali</span>
      </div>
      <div>
        <span className="mb-2 text-[24px] font-[600]">Riwayat Golongan</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Jenis KP', value: detail?.tipe_kp_str || '-' },
              { label: 'Golongan', value: detail?.golongan },
              { label: 'Masa Kerja', value: detail?.masa_kerja },
              { label: 'TMT', value: detail?.tmt?.split('T')[0] },
              { label: 'Sinkronisasi HR', value: detail?.verified_hr === 0 ? 'Tidak' : 'Ya' },
              { label: 'Berkas', value: detail?.files?.[0]?.document_name },
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
          <ImgFile uuid={detail?.files?.[0]?.document_uuid} />
        </div>
      </div>
    </>
  );
}
