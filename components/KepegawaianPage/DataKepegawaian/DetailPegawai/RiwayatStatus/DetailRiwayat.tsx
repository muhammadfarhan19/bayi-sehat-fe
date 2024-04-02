import React from 'react';

import { HistoryPegawai } from '../../../../../constants/APIUrls';
import { StatusPNSText } from '../../../../../constants/Resource';
import { GetHistoryPegawai, GetIDPegawai } from '../../../../../types/api/RiwayatSatusAPI';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';

export default function ListStatus() {
  const pegawaiInfo = usePersonalData();

  const { data: riwayatPengangkatan } = useCommonApi<GetIDPegawai, GetHistoryPegawai>(
    HistoryPegawai.GET_HISTORY_LIST,
    { pegawai_id: Number(pegawaiInfo?.pegawai_id) },
    { method: 'GET' },
  );

  return (
    <>
      <div className="my-3 flex items-center"></div>
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                No
              </th>
              <th
                scope="col"
                className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Tanggal Perubahan
              </th>
              <th
                scope="col"
                className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Status Sebelum Diubah
              </th>
              <th
                scope="col"
                className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Status Setelah Diubah
              </th>
              <th
                scope="col"
                className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Diubah Oleh
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {!(riwayatPengangkatan || []).length && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm font-medium text-[#6B7280]">
                  -
                </td>
              </tr>
            )}
            {(riwayatPengangkatan || []).map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">
                  {each?.updated_at|| '-'}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">
                  {StatusPNSText[each?.status_lama]|| '-'}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">
                  {StatusPNSText[each?.status_baru ]|| '-'}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">
                  {each.updated_by || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
