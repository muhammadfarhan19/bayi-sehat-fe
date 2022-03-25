import React from 'react';

import { GenderText, StatusMenikahText } from '../../../../constants/Resource';
import { withErrorBoundary } from '../../../shared/hocs/ErrorBoundary';
import usePersonalData from '../../../shared/hooks/usePersonalData';
import Loader from '../../../shared/Loader/Loader';

function DataDiriPribadi() {
  const dataApiRes = usePersonalData();

  if (!dataApiRes) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead></thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {[
            { label: 'Jenis Kelamin', value: dataApiRes?.jenis_kelamin ? GenderText[dataApiRes.jenis_kelamin] : '' },
            {
              label: 'Status Nikah',
              value: dataApiRes?.status_menikah ? StatusMenikahText[dataApiRes.status_menikah] : '',
            },
            { label: 'Jumlah Anak', value: dataApiRes.jumlah_anak },
            { label: 'KTP', value: dataApiRes.ktp },
            { label: 'Email', value: dataApiRes.email },
            { label: 'Alamat', value: dataApiRes.alamat },
            { label: 'NPWP', value: dataApiRes.npwp },
            { label: 'BPJS', value: dataApiRes.bpjs },
          ].map((each, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{each.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default withErrorBoundary<typeof DataDiriPribadi, unknown>(DataDiriPribadi);
