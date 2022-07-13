import { PlusIcon } from '@heroicons/react/solid';
import * as React from 'react';

import { JabatanAPI } from '../../../../../constants/APIUrls';
import { RiwayatJabatanData } from '../../../../../types/api/JabatanAPI';
import FileLoader from '../../../../shared/FileLoader';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import { PDFIcon } from '../../../../shared/icons/PDFIcon';
import JabatanForm from './JabatanForm';

export default function RiwayatJabatan() {
  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: string }>({
    open: false,
    selectedId: undefined,
  });

  const { data: riwayatJabatan, mutate } = useCommonApi<null, RiwayatJabatanData[]>(
    JabatanAPI.GET_RIWAYAT_JABATAN,
    null,
    { method: 'GET' }
  );

  const handleShowForm = (open: boolean) => {
    setFormModalState({ ...formModalState, open });
  };

  return (
    <>
      <div className="my-3 flex items-center">
        <div className="flex flex-1 pr-2 text-sm text-gray-500">{/* TODO: Wait for wording */}</div>
        <button
          type="button"
          className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-200 disabled:text-gray-200"
          onClick={() => handleShowForm(!formModalState.open)}
        >
          <PlusIcon className="mr-1 h-4" />
          Update Jabatan
        </button>
      </div>
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
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Tipe Jabatan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Jabatan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Kumulatif
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                TMT Jabatan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Masa Kerja
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Berkas
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {(riwayatJabatan || []).map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.jenis_jabatan}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.nama_jabatan}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.kumulatif}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.tmt}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.masa_kerja}</td>
                <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                  <FileLoader uuid={each?.files?.[0]?.document_uuid}>
                    <>
                      <PDFIcon />
                      <span className="flex w-1 items-center text-blue-600 underline hover:text-blue-500" />
                      {'Surat Keputusan'}
                    </>
                  </FileLoader>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <JabatanForm
        onSuccess={() => mutate()}
        open={formModalState.open}
        setOpen={(open: boolean) => handleShowForm(open)}
        selectedId={formModalState?.selectedId}
      />
    </>
  );
}
