import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import usePersonalData from '../../shared/hooks/usePersonalData';
import Loader from '../../shared/Loader/Loader';
import FormLogHarianPPNPN from './FormLogHarianPPNPN';

interface DetailLogHarianProps {
  onBack?: () => void;
}

function LogHarianPegPPNPNDetail(props: DetailLogHarianProps) {
  const { onBack } = props;

  const personalPegawaiData = usePersonalData();

  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: number }>({
    open: false,
    selectedId: undefined,
  });

  const handleShowForm = (open: boolean, selectedId?: number) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  if (!personalPegawaiData) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

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
          {personalPegawaiData?.status_cpns === 2 ? (
            <tbody className="divide-y divide-gray-200 bg-white">
              {[
                {
                  label: 'Kamis,1 Sep',
                  value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non id.',
                  isPPNPN: (
                    <button
                      type="button"
                      className="inline-flex w-40 items-center justify-center rounded border bg-red-600 px-2.5 py-2 text-center text-xs font-medium text-white shadow-sm hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-200"
                    >
                      Hapus
                    </button>
                  ),
                },
                {
                  label: 'Jumat, 2 Sep',
                  value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non id.',
                  isPPNPN: (
                    <button
                      onClick={() => handleShowForm(!formModalState?.open)}
                      type="button"
                      className="inline-flex w-40 items-center justify-center rounded border bg-indigo-600 px-2.5 py-2 text-center text-xs font-medium text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-200"
                    >
                      Isi Log
                    </button>
                  ),
                },
              ].map((each, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{each?.isPPNPN}</td>
                </tr>
              ))}
            </tbody>
          ) : (
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
          )}
        </table>
      </div>
      {formModalState?.open && (
        <FormLogHarianPPNPN open={formModalState?.open} setOpen={(open: boolean) => handleShowForm(open)} />
      )}
    </div>
  );
}

export default LogHarianPegPPNPNDetail;
