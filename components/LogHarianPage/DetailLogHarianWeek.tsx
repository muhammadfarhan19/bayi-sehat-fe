import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

interface DetailLogHarianProps {
  onBack?: () => void;
}

function DetailLogHarianWeek(props: DetailLogHarianProps) {
  const { onBack } = props;

  return (
    <div className="rounded-md bg-white px-6 py-6">
      <div className="my-3 inline-flex cursor-pointer items-center bg-white" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="bg-white tracking-wide text-gray-600">Kembali</span>
      </div>
      <div className="bg-white">
        <div className="mt-5 mb-5">
          <span className="text-xl font-[600]">Log Harian</span>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Kamis,1 Sep', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non id.' },
              { label: 'Jumat, 2 Sep', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non id.' },
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

export default DetailLogHarianWeek;
