import React from 'react';

import { StatusPNSText } from '../../../../../constants/Resource';
import { getQueryString } from '../../../../../utils/URLUtils';
import { withErrorBoundary } from '../../../../shared/hocs/ErrorBoundary';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import Loader from '../../../../shared/Loader/Loader';
import KarpegModal from './KarpegModal';

function DataDiriPegawai() {
  const { pegawai_id, type } = getQueryString();
  const dataPersonal = usePersonalData();

  if (!dataPersonal) {
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
            { label: 'Unit Kerja', value: dataPersonal.unit_kerja },
            { label: 'NIP/NIP Lama', value: dataPersonal.nip },
            { label: 'Tempat, Tanggal Lahir', value: `${dataPersonal.tempat_lahir}, ${dataPersonal.tanggal_lahir}` },
            { label: 'TMT CPNS', value: dataPersonal.tmt_cpns },
            {
              label: 'Status CPNS/PNS',
              value: dataPersonal?.status_cpns ? StatusPNSText[dataPersonal.status_cpns] : '',
            },
            { label: 'Jabatan', value: dataPersonal.jabatan },
            { label: 'Golongan', value: dataPersonal.golongan },
            { label: 'TMT Golongan', value: dataPersonal.tmt_golongan },
            { label: 'Pangkat', value: dataPersonal.pangkat },
            { label: 'Masa Kerja', value: dataPersonal.masa_kerja },
            { label: 'Masa Kerja Kepangkatan', value: dataPersonal.masa_kerja_kepangkatan },
            {
              label: 'Karpeg',
              value: <KarpegModal />,
            },
          ].map((each, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
            </tr>
          ))}

          <tr key="update-profile">
            <td className="px-6 py-4 text-sm font-medium text-[#6B7280]"></td>
            <td className="flex px-6 py-4 text-sm font-medium text-[#6B7280]">
              <button
                onClick={() =>
                  (window.location.href = `/kepegawaian/data-pegawai/update-data?pegawai_id=${pegawai_id}&type=${type}`)
                }
                className="ml-auto rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-gray-50 disabled:bg-gray-400"
              >
                Perbaharui Data
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default withErrorBoundary(DataDiriPegawai);
