import { ChevronLeftIcon } from '@heroicons/react/outline';

import { RiwayatSkpListData } from '../../../../../types/api/RiwayatSkpAPI';
import ImgFile from '../../../../shared/FileLoader';

type ListSkpProps = {
  detail?: RiwayatSkpListData;
  onBack: () => void;
};

export default function DetailSkp(props: ListSkpProps) {
  const { detail, onBack } = props;

  return (
    <>
      <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="tracking-wide text-gray-600">Kembali</span>
      </div>
      <div>
        <span className="mb-2 text-[24px] font-[600]">Riwayat SKP</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Tahun', value: detail?.tahun },
              { label: 'Nilai PPK', value: detail?.nilai_ppk },
              { label: 'Nilai SKP', value: detail?.nilai_skp },
              { label: 'Nilai Perilaku', value: detail?.nilai_perilaku },
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
