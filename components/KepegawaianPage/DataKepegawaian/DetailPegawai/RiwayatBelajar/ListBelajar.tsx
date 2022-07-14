import { PlusIcon } from '@heroicons/react/outline';
import React from 'react';

import ConfirmDialog from '../../../../shared/ConfirmDialog';
import BelajarForm from './BelajarForm';

type ListBelajarProps = {
  onShowDetail: (id: number) => void;
};

export default function ListBelajar(props: ListBelajarProps) {
  const [confirmId, setConfirmId] = React.useState(0);
  const { onShowDetail } = props;

  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: string }>({
    open: false,
    selectedId: undefined,
  });

  const handleShowForm = (open: boolean, selectedId?: string) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  const data = [
    {
      belajar_id: 1,
      jenis: 'TUGAS BELAJAR',
      baru: 'BARU',
      jenjang: 'S-2',
      lembaga: 'Universitas Indonesia',
      prodi: 'Ilmu Hukum',
      waktu: '2011-09-01 s.d. 2013-08-31',
      bukti: '1-s2.0-S0272638618310618-mmc1.pdf',
    },
  ];

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
          Tambah Riwayat Belajar
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
                Jenis
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Baru/Perpanjangan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Jenjang
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Lembaga
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Prodi/Jurusan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Waktu
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Bukti
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {(data || []).map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.jenis}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.baru}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.jenjang}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.lembaga}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.prodi}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">{each.waktu}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.bukti}</td>
                <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <button
                      onClick={() => onShowDetail(each.belajar_id)}
                      type="button"
                      className="mr-2 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200"
                    >
                      Lihat
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {formModalState.open ? (
        <BelajarForm
          open={formModalState.open}
          setOpen={(open: boolean) => handleShowForm(open)}
          selectedId={formModalState?.selectedId}
        />
      ) : null}
      <ConfirmDialog
        open={!!confirmId}
        message="Anda yakin ingin menghapus data ini?"
        onClose={() => setConfirmId(0)}
        onConfirm={() => console.log('confirm')}
      />
    </>
  );
}
