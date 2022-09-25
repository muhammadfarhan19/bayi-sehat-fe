import { ChevronLeftIcon } from '@heroicons/react/solid';

import { PresensiShiftDateData } from '../../../types/api/PresensiAPI';

type Props = {
  data: PresensiShiftDateData;
  onBack: () => void;
};

export default function LiburDanRamadhanDetail(props: Props) {
  const { data, onBack } = props;

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="ml-[-8px] inline-flex cursor-pointer items-center font-semibold" onClick={onBack}>
        <ChevronLeftIcon className="mr-0.5 h-8" />
        <span className="tracking-wide text-gray-600">Kembali</span>
      </div>
      <div>
        <span className="mb-2 text-[24px] font-[600]">Hari Libur dan Ramadhan</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Tanggal', value: data.tanggal },
              { label: 'Type Shift', value: data.shift_id === 1 ? 'Libur' : 'Ramadhan' },
              { label: 'Keterangan', value: data.remark },
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
